import React, { useState, useEffect } from "react";
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
import { Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TopHeader } from "../../components/TopHeader";

type RootStackParamList = {
  LoginNeedScreen: undefined;
};

const MyChallengeScreen = () => {
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

  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopHeader />
      <ScrollView style={styles.container}>
        {/* 진행중인 챌린지 섹션 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>내가 진행중인 챌린지</Text>
            <TouchableOpacity
              style={styles.toggleContainer}
              onPress={toggleSwitch}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.toggleTrack,
                  isEnabled && styles.toggleTrackActive,
                ]}
              >
                <Text
                  style={[
                    styles.toggleText,
                    isEnabled && styles.toggleTextActive,
                  ]}
                >
                  MY
                </Text>
                <View
                  style={[
                    styles.toggleThumb,
                    isEnabled && styles.toggleThumbActive,
                  ]}
                />
              </View>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {Array.from({ length: 3 }).map((_, index) => (
              <View key={index} style={styles.challengeCard}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>서울시 청년도전 지원사업</Text>
                  <Text style={styles.cardSubtitle}>X-CHALLENGE SEOUL</Text>
                </View>
                <View style={styles.cardContent}>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>모집기간</Text>
                    <Text style={styles.infoValue}>
                      2024.01.01 ~ 2024.12.31
                    </Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>지원대상</Text>
                    <Text style={styles.infoValue}>만 19세 ~ 39세 청년</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>지원내용</Text>
                    <Text style={styles.infoValue}>
                      활동지원금 최대 300만원
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* 신청한 챌린지 섹션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>내가 신청한 챌린지</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {Array.from({ length: 3 }).map((_, index) => (
              <View key={index} style={styles.challengeCard}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>서울시 청년도전 지원사업</Text>
                  <Text style={styles.cardSubtitle}>X-CHALLENGE SEOUL</Text>
                </View>
                <View style={styles.cardContent}>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>모집기간</Text>
                    <Text style={styles.infoValue}>
                      2024.01.01 ~ 2024.12.31
                    </Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>지원대상</Text>
                    <Text style={styles.infoValue}>만 19세 ~ 39세 청년</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>지원내용</Text>
                    <Text style={styles.infoValue}>
                      활동지원금 최대 300만원
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* 참여했던 챌린지 섹션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>내가 참여했던 챌린지</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {Array.from({ length: 3 }).map((_, index) => (
              <View key={index} style={styles.challengeCard}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>서울시 청년도전 지원사업</Text>
                  <Text style={styles.cardSubtitle}>X-CHALLENGE SEOUL</Text>
                </View>
                <View style={styles.cardContent}>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>모집기간</Text>
                    <Text style={styles.infoValue}>
                      2024.01.01 ~ 2024.12.31
                    </Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>지원대상</Text>
                    <Text style={styles.infoValue}>만 19세 ~ 39세 청년</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>지원내용</Text>
                    <Text style={styles.infoValue}>
                      활동지원금 최대 300만원
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 30,
  },
  challengeCard: {
    width: 300,
    marginRight: 15,
    backgroundColor: "#fff",
    borderRadius: 15,
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
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  toggleContainer: {
    width: 75, // 70에서 90으로 늘림
    height: 30, // 35에서 30으로 줄임
    alignSelf: "center",
  },
  toggleTrack: {
    width: "100%",
    height: "100%",
    borderRadius: 15, // height의 절반으로 설정
    backgroundColor: "#767577",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  toggleTrackActive: {
    backgroundColor: "#0C508B",
  },
  toggleTextActive: {
    color: "#fff",
  },
  toggleThumb: {
    width: 24, // 28에서 24로 줄임
    height: 24, // 28에서 24로 줄임
    borderRadius: 12,
    backgroundColor: "#f4f3f4",
    position: "absolute",
    left: 4,
  },
  toggleText: {
    color: "#f4f3f4",
    fontSize: 13, // 텍스트 크기도 약간 줄임
    fontWeight: "bold",
    marginLeft: 8,
  },
  toggleThumbActive: {
    left: "auto",
    right: 4, // 활성화 상태일 때 오른쪽으로
    backgroundColor: "#fff",
  },
  customToggle: {
    width: 70,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#767577",
    justifyContent: "center",
    alignItems: "center",
  },
  customToggleActive: {
    backgroundColor: "#0C508B",
  },
});

export default MyChallengeScreen;
