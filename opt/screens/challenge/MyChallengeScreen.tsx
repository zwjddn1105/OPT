// MyChallengeScreen.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
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
  OngoingChallenges: undefined;
  AppliedChallenges: undefined;
  PastChallenges: undefined;
};

const MyChallengeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const renderSectionHeader = (
    title: string,
    navigateTo: keyof RootStackParamList
  ) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate(navigateTo)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopHeader />
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={styles.toggleContainer}
          onPress={toggleSwitch}
          activeOpacity={0.8}
        >
          <View
            style={[styles.toggleTrack, isEnabled && styles.toggleTrackActive]}
          >
            <Text
              style={[styles.toggleText, isEnabled && styles.toggleTextActive]}
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

        {/* 진행중인 챌린지 섹션 */}
        <View style={styles.section}>
          {renderSectionHeader("내가 진행중인 챌린지", "OngoingChallenges")}
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
          {renderSectionHeader("내가 신청한 챌린지", "AppliedChallenges")}
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
          {renderSectionHeader("내가 참여했던 챌린지", "PastChallenges")}
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
    marginBottom: 10,
    flex: 1,
  },
  section: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 30,
  },
  addButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  addButtonText: {
    fontSize: 18,
    color: "#666",
    lineHeight: 24,
  },
  challengeCard: {
    width: 180,
    marginRight: 12,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 16,
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
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
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
    width: 70,
    fontSize: 12,
    color: "#666",
  },
  infoValue: {
    flex: 1,
    fontSize: 12,
    fontWeight: "500",
  },
  toggleContainer: {
    width: 75,
    height: 30,
    alignSelf: "flex-end",
    marginRight: 20,
  },
  toggleTrack: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
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
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#f4f3f4",
    position: "absolute",
    left: 4,
  },
  toggleText: {
    color: "#f4f3f4",
    fontSize: 13,
    fontWeight: "bold",
    marginLeft: 8,
  },
  toggleThumbActive: {
    left: "auto",
    right: 4,
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
