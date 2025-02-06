import React, { useEffect } from "react";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

type RootStackParamList = {
  LoginNeedScreen: undefined;
  // 다른 필요한 스크린들 추가
};

const ChallengeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        navigation.navigate("LoginNeedScreen");
      }
    };

    checkLoginStatus();
  }, []);

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert("완료", "모든 데이터가 초기화되었습니다.");
    } catch (error) {
      console.error("Failed to clear storage:", error);
      Alert.alert("오류", "초기화 중 문제가 발생했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SEOUL</Text>
        <TouchableOpacity style={styles.locationButton}>
          <Ionicons name="location-outline" size={20} color="#000" />
          <Text style={styles.locationText}>위치 설정</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* 챌린지 카드들 */}
        {Array.from({ length: 6 }).map((_, index) => (
          <View key={index} style={styles.challengeCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>서울시 청년도전 지원사업</Text>
              <Text style={styles.cardSubtitle}>X-CHALLENGE SEOUL</Text>
            </View>
            <View style={styles.cardContent}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>모집기간</Text>
                <Text style={styles.infoValue}>2024.01.01 ~ 2024.12.31</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>지원대상</Text>
                <Text style={styles.infoValue}>만 19세 ~ 39세 청년</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>지원내용</Text>
                <Text style={styles.infoValue}>활동지원금 최대 300만원</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    padding: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
  },
  locationText: {
    fontSize: 14,
    color: "#000",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  challengeCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#eee",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 16,
    color: "#666",
  },
  cardContent: {
    gap: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoLabel: {
    width: 80,
    fontSize: 14,
    color: "#666",
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
  },
});

export default ChallengeScreen;
