import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { TopHeader } from "../components/TopHeader";

type RootStackParamList = {
  Home: undefined;
  KakaoLogin: undefined;
  DMScreen: undefined;
  Profile: undefined;
  LoginNeedScreen: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

const ChallengeCard = () => (
  <View style={styles.card}>
    <Image
      source={require("../assets/challenge-placeholder.png")}
      style={styles.cardImage}
      defaultSource={require("../assets/challenge-placeholder.png")}
    />

    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>X-CHALLENGE SEOUL</Text>
      <Text style={styles.cardDescription}>서울시 청년 도전 지원사업</Text>
      <Text style={styles.cardPeriod}>2024.01.01 ~ 2024.12.31</Text>
    </View>
  </View>
);

const TrainerCard = () => (
  <View style={styles.trainerCard}>
    <Image
      source={require("../assets/trainer-placeholder.png")}
      style={styles.trainerImage}
      defaultSource={require("../assets/trainer-placeholder.png")}
    />
    <View style={styles.trainerContent}>
      <Text style={styles.trainerName}>임성진 트레이너</Text>
      <Text style={styles.trainerDescription}>0.4km · 경력 4년</Text>
      <Text style={styles.trainerPrice}>1회당 60,000원</Text>
    </View>
  </View>
);

interface SpecialtyButtonProps {
  title: string;
  isSelected: boolean;
  onPress: () => void;
}

const SpecialtyButton: React.FC<SpecialtyButtonProps> = ({
  title,
  isSelected,
  onPress,
}) => (
  <TouchableOpacity
    style={[
      styles.specialtyButton,
      isSelected && styles.specialtyButtonSelected,
    ]}
    onPress={onPress}
  >
    <Text
      style={[
        styles.specialtyButtonText,
        isSelected && styles.specialtyButtonTextSelected,
      ]}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

interface TabButtonProps {
  title: string;
  isSelected: boolean;
  onPress: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({
  title,
  isSelected,
  onPress,
}) => (
  <TouchableOpacity
    style={[styles.tabButton, isSelected && styles.tabButtonSelected]}
    onPress={onPress}
  >
    <Text
      style={[styles.tabButtonText, isSelected && styles.tabButtonTextSelected]}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

interface Schedule {
  id: number;
  nickname: string;
  startTime: Date;
  endTime: Date;
}

const TodaySchedule: React.FC<{ schedule: Schedule }> = ({ schedule }) => {
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('ko-KR', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).replace(/\s+/g, ' ');
  };

  return (
    <View style={styles.todayScheduleContainer}>
      <View style={styles.scheduleIconContainer}>
        <View style={styles.scheduleIcon} />
      </View>
      <View style={styles.scheduleTextContainer}>
        <Text style={styles.scheduleTitle}>{schedule.nickname}</Text>
        <Text style={styles.scheduleTime}>
          {formatTime(schedule.startTime)} - {formatTime(schedule.endTime)}
        </Text>
      </View>
    </View>
  );
};

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [selectedSpecialty, setSelectedSpecialty] = useState("다이어트");
  const [selectedTab, setSelectedTab] = useState("nearby");
  const [streak, setStreak] = useState(0);
  const [weeklyWorkouts, setWeeklyWorkouts] = useState<string[]>([]);
  const [todaySchedules, setTodaySchedules] = useState<Schedule[]>([]);

  const specialties = ["다이어트", "빌크업", "필라테스", "체형교정"];

  const calculateWorkoutStats = async () => {
    try {
      const records = await AsyncStorage.getItem("exerciseRecords");
      if (!records) return;

      const exerciseRecords = JSON.parse(records);
      const workoutDates = [
        ...new Set(exerciseRecords.map((record: any) => record.date)),
      ].sort();

      // 연속 운동일수 계산
      let currentStreak = 0;
      const today = new Date().toISOString().split("T")[0];
      const yesterday = new Date(Date.now() - 86400000)
        .toISOString()
        .split("T")[0];

      const startCheckingDate = workoutDates.includes(today)
        ? today
        : yesterday;

      for (let i = new Date(startCheckingDate); ; i.setDate(i.getDate() - 1)) {
        const dateString = i.toISOString().split("T")[0];
        if (!workoutDates.includes(dateString)) break;
        currentStreak++;
      }

      // 주간 운동 현황
      const weeklyDates = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date(Date.now() - i * 86400000)
          .toISOString()
          .split("T")[0];
        weeklyDates.push(date);
      }

      setStreak(currentStreak);
      setWeeklyWorkouts(
        weeklyDates.filter((date) => workoutDates.includes(date))
      );
    } catch (error) {
      console.error("Failed to calculate workout stats:", error);
    }
  };

  const loadTodaySchedules = async () => {
    try {
        const schedulesStr = await AsyncStorage.getItem('schedules');
        if (schedulesStr) {
            const allSchedules: Schedule[] = JSON.parse(schedulesStr);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const todaySchedules = allSchedules
                .filter((schedule: Schedule) => {
                    const scheduleDate = new Date(schedule.startTime);
                    scheduleDate.setHours(0, 0, 0, 0);
                    return scheduleDate.getTime() === today.getTime();
                })
                .sort((a: Schedule, b: Schedule) => {
                    const timeA = new Date(a.startTime).getTime();
                    const timeB = new Date(b.startTime).getTime();
                    return timeA - timeB;
                });

            setTodaySchedules(todaySchedules);
        }
    } catch (error) {
        console.error('Failed to load today schedules:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      calculateWorkoutStats();
      loadTodaySchedules();
    }, [])
  );

  const renderTrainerSection = () => (
    <>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.specialtyButtonsContainer}
      >
        {specialties.map((specialty) => (
          <SpecialtyButton
            key={specialty}
            title={specialty}
            isSelected={selectedSpecialty === specialty}
            onPress={() => setSelectedSpecialty(specialty)}
          />
        ))}
      </ScrollView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TrainerCard />
        <TrainerCard />
        <TrainerCard />
        <TrainerCard />
        <TrainerCard />
      </ScrollView>
    </>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TopHeader />
        <ScrollView style={styles.mainContent}>
          {/* 오늘의 일정 섹션 */}
          {todaySchedules.length > 0 && (
            <View style={styles.todaySchedulesSection}>
              <Text style={styles.todaySchedulesTitle}>
                <Text style={styles.userName}>임시님</Text>, 오늘 일정이{' '}
                <Text style={styles.scheduleCount}>{todaySchedules.length}건</Text> 있어요.
              </Text>
              {todaySchedules.map((schedule) => (
                <TodaySchedule key={schedule.id} schedule={schedule} />
              ))}
            </View>
          )}

          <View style={styles.workoutStatsSection}>
            <View style={styles.streakContainer}>
              <Text style={styles.streakNumber}>{streak}</Text>
              <Text style={styles.streakText}>일 연속 운동 중</Text>
            </View>
            <View style={styles.weeklyContainer}>
              {Array.from({ length: 7 }).map((_, index) => {
                const date = new Date();
                date.setDate(date.getDate() - (6 - index));
                const dateString = date.toISOString().split("T")[0];
                const isWorkoutDay = weeklyWorkouts.includes(dateString);
                const isToday = index === 6;

                return (
                  <View key={dateString} style={styles.dayContainer}>
                    <Text style={styles.dayText}>
                      {
                        ["일", "월", "화", "수", "목", "금", "토"][
                          date.getDay()
                        ]
                      }
                    </Text>
                    <View
                      style={[
                        styles.dayDot,
                        isWorkoutDay && styles.workoutDot,
                        isToday && styles.todayDot,
                      ]}
                    />
                  </View>
                );
              })}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>진행중인 챌린지</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              <ChallengeCard />
              <ChallengeCard />
              <ChallengeCard />
              <ChallengeCard />
              <ChallengeCard />
            </ScrollView>
          </View>

          <View style={styles.section}>
            <View style={styles.trainerHeader}>
              <View style={styles.tabContainer}>
                <TabButton
                  title="내 주변 트레이너"
                  isSelected={selectedTab === "nearby"}
                  onPress={() => setSelectedTab("nearby")}
                />
                <TabButton
                  title="1Day Class 트레이너"
                  isSelected={selectedTab === "oneday"}
                  onPress={() => setSelectedTab("oneday")}
                />
              </View>
            </View>
            {renderTrainerSection()}
          </View>
        </ScrollView>
      </View>
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
  mainContent: {
    flex: 1,
  },
  section: {
    marginTop: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingHorizontal: 15,
  },
  specialtyButtonsContainer: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  specialtyButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    marginRight: 8,
  },
  specialtyButtonSelected: {
    backgroundColor: "#000",
  },
  specialtyButtonText: {
    fontSize: 14,
    color: "#666",
  },
  specialtyButtonTextSelected: {
    color: "#fff",
  },
  card: {
    width: 300,
    marginHorizontal: 5,
    backgroundColor: "#fff",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.84,
    elevation: 3,
  },
  cardImage: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: "#f0f0f0",
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  cardPeriod: {
    fontSize: 12,
    color: "#888",
  },
  trainerCard: {
    width: 300,
    marginHorizontal: 5,
    backgroundColor: "#fff",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.84,
    elevation: 3,
  },
  trainerImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: "#f0f0f0",
  },
  trainerContent: {
    padding: 15,
  },
  trainerName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  trainerDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  trainerPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  trainerHeader: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  tabContainer: {
    flexDirection: "row",
    gap: 15,
  },
  tabButton: {
    paddingBottom: 8,
  },
  tabButtonSelected: {
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  tabButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#999",
  },
  tabButtonTextSelected: {
    color: "#000",
  },

  workoutStatsSection: {
    backgroundColor: "#f8f8f8",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  streakContainer: {
    alignItems: "center",
  },
  streakNumber: {
    fontSize: 32,
    fontWeight: "bold",
  },
  streakText: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  weeklyContainer: {
    flexDirection: "row",
    gap: 12,
  },
  dayContainer: {
    alignItems: "center",
    gap: 8,
  },
  dayText: {
    fontSize: 12,
    color: "#666",
  },
  dayDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ddd",
  },
  workoutDot: {
    backgroundColor: "#007AFF",
  },
  todayDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000",
  },
  userName: {
    fontWeight: 'bold',
  },
  scheduleCount: {
    color: '#0047FF',
    fontWeight: 'bold',
  },
  todaySchedulesSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  todaySchedulesTitle: {
    fontSize: 18,
    marginBottom: 15,
    color: '#333',
  },
  todayScheduleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  scheduleIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  scheduleIcon: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0047FF',
  },
  scheduleTextContainer: {
    flex: 1,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  scheduleTime: {
    fontSize: 14,
    color: '#666',
  },
});

export default HomeScreen;