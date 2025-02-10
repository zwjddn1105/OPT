import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

interface Review {
  id: string;
  user: {
    name: string;
    date: string;
    image?: string;
  };
  rating: number;
  content: string;
}

interface TrainerProfile {
  name: string;
  image: string;
  followers: number;
  following: number;
  certification: string;
  licenses: string[];
  awards: string[];
  prices: {
    single: number;
    bulk: {
      count: number;
      price: number;
    };
  };
  rating: number;
  reviews: Review[];
}

const generateStars = (rating: number) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <Ionicons
        key={i}
        name={i < rating ? 'star' : 'star-outline'}
        size={16}
        color="#FFD700"
      />
    );
  }
  return stars;
};

export const TrainerProfileScreen = () => {
  const navigation = useNavigation();
  const trainer: TrainerProfile = {
    name: '김멸멸 Trainer',
    image: 'trainer_image_url',
    followers: 44,
    following: 32,
    certification: '경력, 학력 자유로운 폼 (자기소개포함)',
    licenses: [
      '(국가공인) 생활스포츠지도사 2급',
      'NASM-CPT (미국스포츠의학회)',
    ],
    awards: ['체육학 학사', '체육학 석사'],
    prices: {
      single: 30000,
      bulk: {
        count: 30,
        price: 55000,
      }
    },
    rating: 4.7,
    reviews: [
      {
        id: '1',
        user: {
          name: '윤동광 김선순',
          date: '2023.03.12',
          image: 'user_image_url'
        },
        rating: 4,
        content: '너무 맞는는 선생님이에요. 컨디션 글러스를 잃은 이후 10년째 이 선생님과 운동중입니다. 다들 추천해요!'
      }
    ]
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.fixedHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{trainer.name}</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="heart-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="share-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={{ uri: '/api/placeholder/120/120' }}
            style={styles.profileImage}
          />
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{trainer.followers}</Text>
              <Text style={styles.statLabel}>팔로워</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{trainer.following}</Text>
              <Text style={styles.statLabel}>팔로잉</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>팔로우</Text>
          </TouchableOpacity>
        </View>

        {/* Certification Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>자격, 학력 자유로운 폼 (자기소개포함)</Text>
          <Text style={styles.certificationText}>{trainer.certification}</Text>
        </View>

        {/* Licenses Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>증명된자격증</Text>
          {trainer.licenses.map((license, index) => (
            <View key={index} style={styles.licenseItem}>
              <MaterialIcons name="verified" size={24} color="#4169E1" />
              <Text style={styles.licenseText}>{license}</Text>
            </View>
          ))}
          {trainer.awards.map((award, index) => (
            <View key={index} style={styles.licenseItem}>
              <MaterialIcons name="emoji-events" size={24} color="#FFD700" />
              <Text style={styles.licenseText}>{award}</Text>
            </View>
          ))}
        </View>

        {/* Location Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>위치</Text>
          <Image
            source={{ uri: '/api/placeholder/400/200' }}
            style={styles.mapImage}
          />
        </View>

        {/* Reviews Section */}
        <View style={styles.section}>
          <View style={styles.reviewHeader}>
            <Text style={styles.sectionTitle}>후기</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingNumber}>{trainer.rating}</Text>
              <View style={styles.starsContainer}>
                {generateStars(trainer.rating)}
              </View>
            </View>
          </View>
          
          {trainer.reviews.map((review) => (
            <View key={review.id} style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <Image
                  source={{ uri: '/api/placeholder/40/40' }}
                  style={styles.reviewerImage}
                />
                <View style={styles.reviewerInfo}>
                  <Text style={styles.reviewerName}>{review.user.name}</Text>
                  <Text style={styles.reviewDate}>{review.user.date}</Text>
                </View>
                <View style={styles.reviewRating}>
                  {generateStars(review.rating)}
                </View>
              </View>
              <Text style={styles.reviewContent}>{review.content}</Text>
            </View>
          ))}
        </View>

        {/* Pricing Section */}
        <View style={styles.pricingContainer}>
          <TouchableOpacity style={styles.pricingButton}>
            <View style={styles.priceItem}>
              <Text style={styles.priceCount}>1회</Text>
              <Text style={styles.priceAmount}>{trainer.prices.single}원</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.pricingButton, styles.pricingButtonGreen]}>
            <View style={styles.priceItem}>
              <Text style={styles.priceCount}>{trainer.prices.bulk.count}회</Text>
              <Text style={styles.priceAmount}>{trainer.prices.bulk.price}원</Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.bottomPadding} />
      </ScrollView>

      <View style={styles.fixedBottomButtons}>
        <TouchableOpacity style={styles.chatButton}>
          <Text style={styles.buttonText}>채팅상담</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.scheduleButton}>
          <Text style={styles.buttonText}>상담예약</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    // 고정 헤더의 높이만큼 상단 패딩 추가
    paddingTop: Platform.OS === 'ios' ? 88 : 56,
  },
  fixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    // iOS 상단 Safe Area 고려
    paddingTop: Platform.OS === 'ios' ? 44 : 12,
  },
  bottomPadding: {
    height: 80, // 하단 버튼 높이만큼 여백 추가
  },
  fixedBottomButtons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    // iOS 하단 Safe Area 고려
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerIcon: {
    marginLeft: 16,
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  followButton: {
    backgroundColor: '#4169E1',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  followButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  certificationText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  licenseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  licenseText: {
    marginLeft: 8,
    fontSize: 14,
  },
  mapImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  ratingNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 8,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  reviewItem: {
    marginBottom: 16,
  },
  reviewerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  reviewerInfo: {
    marginLeft: 12,
    flex: 1,
  },
  reviewerName: {
    fontWeight: 'bold',
  },
  reviewDate: {
    fontSize: 12,
    color: '#666',
  },
  reviewRating: {
    flexDirection: 'row',
  },
  reviewContent: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  pricingContainer: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
  },
  pricingButton: {
    flex: 1,
    backgroundColor: '#FF6B6B',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  pricingButtonGreen: {
    backgroundColor: '#4CD964',
  },
  priceItem: {
    alignItems: 'center',
  },
  priceCount: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  priceAmount: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomButtons: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  chatButton: {
    flex: 1,
    backgroundColor: '#4169E1',
    padding: 16,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  scheduleButton: {
    flex: 1,
    backgroundColor: '#4169E1',
    padding: 16,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TrainerProfileScreen;