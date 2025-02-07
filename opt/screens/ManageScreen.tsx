import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { TopHeader } from "../components/TopHeader";
import PlusButton from '../components/PlusButton';
import { AddScheduleModal } from '../components/AddScheduleModal';

interface Schedule {
  id: number;
  nickname: string;
  startTime: Date;
  endTime: Date;
}

interface SessionHistory {
  id: number;
  completed: boolean;
  date: string;
}

interface TicketCard {
  id: number;
  image: string;
  ptName: string;
  totalSessions: number;
  completedSessions: number;
  contractDate: string;
  trainer: string;
  member: string;
  sessionHistory: SessionHistory[];
}

interface Props {
  navigation: any;
  route: any;
}

export const ManageScreen: React.FC<Props> = ({ navigation, route }) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [animationHeight] = useState(new Animated.Value(0));

  const [tickets] = useState<TicketCard[]>([
    {
      id: 1,
      image: 'workout_image.jpg',
      ptName: 'PT 30회',
      totalSessions: 30,
      completedSessions: 10,
      contractDate: '2024.12.22',
      trainer: '김원장',
      member: '김문식',
      sessionHistory: [
        { id: 1, completed: true, date: '2025.01.02' },
        { id: 2, completed: true, date: '2025.01.04' },
        { id: 3, completed: true, date: '2025.01.08' },
        { id: 4, completed: true, date: '2025.01.10' },
        { id: 5, completed: false, date: '' },
      ]
    },
    {
      id: 2,
      image: 'workout_image.jpg',
      ptName: 'PT 20회',
      totalSessions: 20,
      completedSessions: 5,
      contractDate: '2024.12.15',
      trainer: '이트레이너',
      member: '박회원',
      sessionHistory: [
        { id: 1, completed: true, date: '2025.01.03' },
        { id: 2, completed: true, date: '2025.01.05' },
        { id: 3, completed: true, date: '2025.01.07' },
        { id: 4, completed: false, date: '' },
        { id: 5, completed: false, date: '' },
      ]
    },
    {
      id: 3,
      image: 'workout_image.jpg',
      ptName: 'PT 40회',
      totalSessions: 40,
      completedSessions: 15,
      contractDate: '2024.12.10',
      trainer: '박트레이너',
      member: '이회원',
      sessionHistory: [
        { id: 1, completed: true, date: '2025.01.01' },
        { id: 2, completed: true, date: '2025.01.03' },
        { id: 3, completed: true, date: '2025.01.06' },
        { id: 4, completed: false, date: '' },
        { id: 5, completed: false, date: '' },
      ]
    },
  ]);

  // 시간 표시 형식 포맷팅
  const formatScheduleTime = (startTime: Date, endTime: Date) => {
    const formatTime = (date: Date) => {
      return date.toLocaleTimeString('ko-KR', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }).replace(/\s+/g, ' ');
    };

    // 날짜가 다른 경우
    if (startTime.getDate() !== endTime.getDate() ||
        startTime.getMonth() !== endTime.getMonth()) {
      return `${startTime.getMonth() + 1}월 ${startTime.getDate()}일 ${formatTime(startTime)} - ${endTime.getMonth() + 1}월 ${endTime.getDate()}일 ${formatTime(endTime)}`;
    }

    return `${formatTime(startTime)} - ${formatTime(endTime)}`;
  };

  // 일정 필터링
  const filteredSchedules = schedules.filter(schedule => {
    const startDate = new Date(schedule.startTime);
    const endDate = new Date(schedule.endTime);
    const checkDate = new Date(selectedDate);

    // 시작일, 종료일, 체크일을 날짜만 비교하기 위해 시간 초기화
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    checkDate.setHours(0, 0, 0, 0);

    // 선택한 날짜가 시작일과 종료일 사이에 있는지 확인
    return checkDate >= startDate && checkDate <= endDate;
  });

  // 주간 날짜 계산
  const getWeekDates = (date: Date): Date[] => {
    const week: Date[] = [];
    const start = new Date(date);
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      week.push(day);
    }
    return week;
  };

  // 요일 이름
  const getDayName = (date: Date): string => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return days[date.getDay()];
  };

  // 월/연도 표시
  const formatMonthYear = (date: Date): string => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
    });
  };

  // 일정 추가 모달 표시
  const handleAddSchedule = () => {
    setIsModalVisible(true);
  };

  // 새로운 일정 추가
  const handleScheduleSubmit = (scheduleData: { 
    nickname: string; 
    startTime: Date;
    endTime: Date;
  }) => {
    const newSchedule: Schedule = {
      id: schedules.length + 1,
      nickname: scheduleData.nickname,
      startTime: scheduleData.startTime,
      endTime: scheduleData.endTime,
    };
    setSchedules([...schedules, newSchedule]);
  };

  // 날짜 선택
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const toggleExpand = (id: number) => {
    const isExpanding = expandedCard !== id;
    
    Animated.timing(animationHeight, {
      toValue: isExpanding ? 150 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setExpandedCard(expandedCard === id ? null : id);
  };

  // 항상 오늘 날짜부터 1주일을 보여주는 고정된 날짜 배열
  const weekDates = useMemo(() => {
    const dates: Date[] = [];
    const startDate = new Date(today);  // 오늘 날짜로 시작
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      dates.push(day);
    }
    return dates;
  }, [today]); // today만 의존성으로 추가

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopHeader />
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.contentContainer}>
            {/* 월/연도 표시 */}
            <Text style={styles.monthTitle}>{formatMonthYear(selectedDate)}</Text>

            {/* 주간 달력 */}
            <View style={styles.weekHeader}>
              {weekDates.map((date, index) => {
                const isSelected = date.toDateString() === selectedDate.toDateString();
                const isToday = date.toDateString() === today.toDateString();

                return (
                  <TouchableOpacity 
                    key={index}
                    onPress={() => handleDateSelect(date)}
                    style={[
                      styles.dayCell,
                      isSelected && styles.selectedDay
                    ]}
                  >
                    <Text style={[
                      styles.dayText,
                      isSelected && styles.selectedDayText
                    ]}>{getDayName(date)}</Text>
                    <Text style={[
                      styles.dateText,
                      isSelected && styles.selectedDayText,
                      isToday && !isSelected && styles.todayText,
                      (isSelected && isToday) && styles.selectedTodayText
                    ]}>{date.getDate()}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* 일정 목록 */}
            {filteredSchedules.map((schedule) => (
              <View key={schedule.id} style={styles.scheduleItem}>
                <View style={styles.scheduleMarker} />
                <View style={styles.scheduleContent}>
                  <Text style={styles.scheduleTitle}>{schedule.nickname}</Text>
                  <Text style={styles.scheduleTime}>
                    {formatScheduleTime(schedule.startTime, schedule.endTime)}
                  </Text>
                </View>
              </View>
            ))}

            {/* 일정이 없는 경우 */}
            {filteredSchedules.length === 0 && (
              <View style={styles.emptySchedule}>
                <Text style={styles.emptyScheduleText}>해당 날짜의 일정이 없습니다.</Text>
              </View>
            )}
            
            {/* 일정 추가 버튼 */}
            <View style={styles.plusButtonWrapper}>
              <PlusButton onPress={handleAddSchedule} />
            </View>

            {/* 티켓 카드 목록 */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.ticketContainer}
              contentContainerStyle={styles.ticketContent}
            >
              {tickets.map((ticket) => (
                <View key={ticket.id} style={[
                  styles.card,
                  expandedCard === ticket.id ? styles.cardExpanded : styles.cardCollapsed
                ]}>
                  <View style={styles.mainContent}>
                    <View style={styles.cardHeader}>
                      <View style={styles.statusContainer}>
                        <Text style={styles.status}>사용중</Text>
                      </View>
                    </View>

                    <View style={styles.cardContent}>
                      <View style={styles.imageContainer}>
                        <Image
                          source={{ uri: '/api/placeholder/80/80' }}
                          style={styles.image}
                        />
                      </View>

                      <View style={styles.infoContainer}>
                        <Text style={styles.ptName}>{ticket.ptName}</Text>
                        <View style={styles.infoRow}>
                          <Text style={styles.label}>세션</Text>
                          <Text style={styles.value}>{ticket.completedSessions}/{ticket.totalSessions}</Text>
                        </View>
                        <View style={styles.infoRow}>
                          <Text style={styles.label}>계약일</Text>
                          <Text style={styles.value}>{ticket.contractDate}</Text>
                        </View>
                        <View style={styles.infoRow}>
                          <Text style={styles.label}>트레이너</Text>
                          <Text style={styles.value}>{ticket.trainer}</Text>
                        </View>
                        <View style={styles.infoRow}>
                          <Text style={styles.label}>회원</Text>
                          <Text style={styles.value}>{ticket.member}</Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View style={styles.cardFooter}>
                    <TouchableOpacity
                      style={styles.historyButton}
                      onPress={() => toggleExpand(ticket.id)}
                    >
                      <View style={styles.historyButtonContent}>
                        <Text style={styles.historyButtonText}>세션 진행 현황</Text>
                        <Ionicons 
                          name={expandedCard === ticket.id ? "chevron-up" : "chevron-down"} 
                          size={20} 
                          color="#fff" 
                        />
                      </View>
                    </TouchableOpacity>

                    {expandedCard === ticket.id && (
                      <Animated.View style={[
                        styles.historyContainer,
                        {
                          maxHeight: animationHeight,
                          overflow: 'hidden',
                        }
                      ]}>
                        <ScrollView style={styles.historyScroll}>
                          {ticket.sessionHistory.map((session) => (
                            <View key={session.id} style={styles.historyItem}>
                              <Text style={styles.sessionNumber}>{session.id}회</Text>
                              <View style={styles.sessionStatus}>
                                {session.completed ? (
                                  <>
                                    <Text style={styles.completedText}>완료</Text>
                                    <Text style={styles.sessionDate}>{session.date}</Text>
                                  </>
                                ) : (
                                  <Text style={styles.pendingText}>예정</Text>
                                )}
                              </View>
                            </View>
                          ))}
                        </ScrollView>
                      </Animated.View>
                    )}
                  </View>
                </View>
              ))}
            </ScrollView>

            {/* 일정 추가 모달 */}
            <AddScheduleModal
              visible={isModalVisible}
              onClose={() => setIsModalVisible(false)}
              onSubmit={handleScheduleSubmit}
              selectedDate={selectedDate}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 20,
  },
  weekHeader: {
    flexDirection: 'row',
    paddingBottom: 10,
    justifyContent: 'space-between',
  },
  dayCell: {
    alignItems: 'center',
    padding: 10,
    width: 45,
  },
  selectedDay: {
    backgroundColor: '#0047FF',
    borderRadius: 8,
  },
  dayText: {
    fontSize: 14,
    color: '#333',
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
    color: '#333',
  },
  selectedDayText: {
    color: '#fff',
  },
  todayText: {
    color: '#0047FF',
  },
  selectedTodayText: {
    color: '#fff',
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  scheduleMarker: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0047FF',
    marginRight: 15,
  },
  scheduleContent: {
    flex: 1,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  scheduleTime: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  plusButtonWrapper: {
    alignItems: 'flex-end',
    paddingBottom: 10,
    marginRight: -15,
  },
  emptySchedule: {
    padding: 20,
    alignItems: 'center',
  },
  emptyScheduleText: {
    color: '#666',
    fontSize: 14,
  },
  ticketContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  ticketContent: {
    paddingHorizontal: 20,
    alignItems: 'flex-start',
  },
  card: {
    width: 300,
    backgroundColor: '#FF6B6B',
    borderRadius: 15,
    marginRight: 15,
    overflow: 'hidden',
  },
  cardCollapsed: {
    height: 250,
  },
  cardExpanded: {
    height: 'auto',
  },
  mainContent: {
    height: 200,
  },
  cardHeader: {
    padding: 10,
    paddingTop: 12,
    paddingBottom: 8,
  },
  statusContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  status: {
    color: '#FF6B6B',
    fontSize: 15,
    fontWeight: 'bold',
  },
  cardContent: {
    flexDirection: 'row',
    padding: 15,
    paddingTop: 0,
  },
  imageContainer: {
    marginRight: 15,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  ptName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
  },
  value: {
    color: '#fff',
    fontSize: 14,
  },
  cardFooter: {
    width: '100%',
  },
  historyButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
  },
  historyButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  historyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  historyContainer: {
    backgroundColor: '#fff',
  },
  historyScroll: {
    maxHeight: 150,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sessionNumber: {
    fontSize: 14,
    fontWeight: '500',
  },
  sessionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedText: {
    color: '#0047FF',
    marginRight: 10,
  },
  pendingText: {
    color: '#666',
  },
  sessionDate: {
    color: '#666',
  },
});

export default ManageScreen;