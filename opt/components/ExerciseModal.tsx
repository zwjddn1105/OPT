import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, Animated, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Exercise {
  id: string;
  name: string;
  isFavorite: boolean;
  imageSource: any;  // 이미지는 나중에 추가될 예정
}

interface ExerciseModalProps {
  visible: boolean;
  onClose: () => void;
}

const ExerciseModal = ({ visible, onClose }: ExerciseModalProps) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'favorites'>('all');
  const [exercises, setExercises] = useState<Exercise[]>([
    { id: '1', name: '바벨 백스쿼트', isFavorite: false, imageSource: null },
    { id: '2', name: '프론트 스쿼트', isFavorite: false, imageSource: null },
    { id: '3', name: '저처 스쿼트', isFavorite: false, imageSource: null },
    { id: '4', name: '바벨 불가리안 스플릿 스쿼트', isFavorite: false, imageSource: null },
    { id: '5', name: '덤벨 불가리안 스플릿 스쿼트', isFavorite: false, imageSource: null },
  ]);

  useEffect(() => {
    loadFavorites();
  }, []);

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const loadFavorites = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      if (favorites) {
        const favoriteIds = JSON.parse(favorites);
        setExercises(prev => prev.map(exercise => ({
          ...exercise,
          isFavorite: favoriteIds.includes(exercise.id)
        })));
      }
    } catch (error) {
      console.error('Failed to load favorites:', error);
    }
  };

  const toggleFavorite = async (exerciseId: string) => {
    try {
      // UI 즉시 업데이트
      setExercises(prev => prev.map(exercise =>
        exercise.id === exerciseId
          ? { ...exercise, isFavorite: !exercise.isFavorite }
          : exercise
      ));

      // AsyncStorage 업데이트
      const updatedExercises = exercises.map(exercise =>
        exercise.id === exerciseId
          ? { ...exercise, isFavorite: !exercise.isFavorite }
          : exercise
      );
      const favoriteIds = updatedExercises
        .filter(ex => ex.isFavorite)
        .map(ex => ex.id);
      await AsyncStorage.setItem('favorites', JSON.stringify(favoriteIds));
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  const getFilteredExercises = () => {
    return exercises.filter(exercise => {
      if (activeTab === 'favorites' && !exercise.isFavorite) {
        return false;
      }
      return exercise.name.toLowerCase().includes(searchText.toLowerCase());
    });
  };

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [800, 0]
  });

  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      animationType="fade"
    >
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <Animated.View style={[styles.modalView, { transform: [{ translateY }] }]}>
          <TouchableOpacity 
            activeOpacity={1} 
            onPress={(e) => e.stopPropagation()}
            style={styles.modalContainer}
          >
            <View style={styles.modalContent}>
              <TouchableOpacity 
                onPress={onClose} 
                style={styles.backButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="chevron-back" size={24} color="black" />
              </TouchableOpacity>

              <View style={styles.searchContainer}>
                <TextInput 
                  style={styles.searchInput}
                  placeholder="찾으시는 운동을 검색해보세요."
                  placeholderTextColor="#999"
                  value={searchText}
                  onChangeText={setSearchText}
                />
              </View>

              <View style={styles.tabContainer}>
                <TouchableOpacity 
                  style={[styles.tab, activeTab === 'favorites' && styles.activeTab]}
                  onPress={() => setActiveTab('favorites')}
                >
                  <Ionicons 
                    name="star" 
                    size={20} 
                    color={activeTab === 'favorites' ? '#000' : '#666'} 
                  />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.tab, activeTab === 'all' && styles.activeTab]}
                  onPress={() => setActiveTab('all')}
                >
                  <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
                    전체
                  </Text>
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.exerciseList}>
                {getFilteredExercises().map(exercise => (
                  <View key={exercise.id} style={styles.exerciseItem}>
                    <View style={styles.exerciseInfo}>
                      {exercise.imageSource && (
                        <Image source={exercise.imageSource} style={styles.exerciseImage} />
                      )}
                      <Text style={styles.exerciseName}>{exercise.name}</Text>
                    </View>
                    <TouchableOpacity 
                      onPress={() => toggleFavorite(exercise.id)}
                      style={styles.favoriteButton}
                    >
                      <Ionicons 
                        name={exercise.isFavorite ? "bookmark" : "bookmark-outline"} 
                        size={24} 
                        color={exercise.isFavorite ? "#000" : "#999"} 
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
    width: '100%',
  },
  modalContainer: {
    flex: 1,
    width: '100%',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    marginBottom: 15,
    alignSelf: 'flex-start',
    padding: 5,
  },
  searchContainer: {
    marginBottom: 15,
  },
  searchInput: {
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    gap: 10,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  activeTab: {
    backgroundColor: '#e0e0e0',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#000',
    fontWeight: '500',
  },
  exerciseList: {
    flex: 1,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  exerciseInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  exerciseImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  exerciseName: {
    fontSize: 16,
  },
  favoriteButton: {
    padding: 5,
  },
});

export default ExerciseModal;