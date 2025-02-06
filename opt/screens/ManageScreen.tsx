import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useState } from 'react';
import PlusButton from '../components/PlusButton';
import { Ionicons } from "@expo/vector-icons";

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

export const ManageScreen = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  
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

  const getDayName = (date: Date): string => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  };

  const formatMonthYear = (date: Date): string => {
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 
                   'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  interface Schedule {
    id: number;
    date: Date;
    nickname: string;
    time: string;
  }

  // Schedule data
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: 1,
      date: today,
      nickname: 'NICKNAME(김문식)',
      time: '13:00 - 14:00',
    },
    {
      id: 2,
      date: today,
      nickname: 'NICKNAME(김문식)',
      time: '13:00 - 14:00',
    },
    {
      id: 3,
      date: today,
      nickname: 'NICKNAME(김문식)',
      time: '13:00 - 14:00',
    },
  ]);

  // Ticket data
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

  const weekDates = getWeekDates(today);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const filteredSchedules = schedules.filter(schedule => 
    schedule.date.toDateString() === selectedDate.toDateString()
  );

  const handleAddSchedule = () => {
    const newSchedule: Schedule = {
      id: schedules.length + 1,
      date: selectedDate,
      nickname: 'NICKNAME(김문식)',
      time: '13:00 - 14:00',
    };
    setSchedules([...schedules, newSchedule]);
  };

  const toggleExpand = (id: number) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.contentContainer}>
        <Text style={styles.monthTitle}>{formatMonthYear(selectedDate)}</Text>
        
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

        {filteredSchedules.map((schedule) => (
          <View key={schedule.id} style={styles.scheduleItem}>
            <View style={styles.scheduleMarker} />
            <View style={styles.scheduleContent}>
              <Text style={styles.scheduleTitle}>{schedule.nickname}</Text>
              <Text style={styles.scheduleTime}>{schedule.time}</Text>
            </View>
          </View>
        ))}
        <View style={styles.plusButtonWrapper}>
          <PlusButton onPress={handleAddSchedule} />
        </View>

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
              <View style={styles.cardHeader}>
                <Text style={styles.status}>사용중</Text>
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
                  <Text style={styles.sessionCount}>
                    {ticket.completedSessions}/{ticket.totalSessions}
                  </Text>
                  <Text style={styles.date}>계약일: {ticket.contractDate}</Text>
                  <View style={styles.userInfo}>
                    <Text style={styles.trainer}>트레이너: {ticket.trainer}</Text>
                    <Text style={styles.divider}> / </Text>
                    <Text style={styles.member}>회원: {ticket.member}</Text>
                  </View>
                </View>
              </View>

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
                <View style={styles.historyContainer}>
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
                </View>
              )}
            </View>
          ))}
        </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
  ticketContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  ticketContent: {
    paddingRight: 20,
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
    height: 220,
  },
  cardExpanded: {
    minHeight: 220,
  },
  cardHeader: {
    padding: 10,
  },
  status: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  cardContent: {
    flexDirection: 'row',
    padding: 15,
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
  ptName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sessionCount: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  date: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trainer: {
    color: '#fff',
    fontSize: 14,
  },
  divider: {
    color: '#fff',
    marginHorizontal: 5,
  },
  member: {
    color: '#fff',
    fontSize: 14,
  },
  historyButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
  },
  historyButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
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