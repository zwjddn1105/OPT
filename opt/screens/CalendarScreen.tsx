import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import PlusButton from '../components/PlusButton';
import ExerciseModal from '../components/ExerciseModal';

type RootStackParamList = {
  Main: undefined;
  Food: { date: string };
};

export const CalendarScreen = () => {
  // 오늘 날짜를 YYYY-MM-DD 형식으로 포맷팅
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleFoodButtonPress = () => {
    navigation.navigate('Food', { date: selectedDate });
  };

  return (
    <ScrollView style={styles.container} bounces={false}>
      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={(day: DateData) => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate]: { selected: true, marked: false, selectedColor: 'blue' },
          }}
          theme={{
            calendarWidth: 360,
            'stylesheet.calendar.main': {
              container: {
                paddingRight: 40,
              },
              week: {
                marginTop: 20,
                marginBottom: 7,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }
            }
          }}
          initialDate={today}
        />
      </View>
      {selectedDate ? (
        <View>
          <View style={styles.divider} />
          <Text style={styles.dateText}>{selectedDate}</Text>
          <View style={styles.spacer}>
            <Text style={styles.spacerText}>현재 기록된 운동 기록이 없습니다.</Text>
          </View>
          <View style={styles.buttonWrapper}>
            <PlusButton onPress={() => setModalVisible(true)} />
          </View>
          <View style={styles.secondDivider} />
          <View style={styles.spacer}>
            <Text style={styles.spacerText}>현재 기록된 식단 기록이 없습니다.</Text>
          </View>
          <View style={styles.buttonWrapper}>
            <PlusButton onPress={handleFoodButtonPress} />
          </View>
        </View>
      ) : null}

      <ExerciseModal 
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  calendarContainer: {
    paddingTop: 50,
  },
  dateText: {
    fontSize: 18,
    textAlign: 'left',
    marginTop: -15,
    marginLeft: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 30,
    marginHorizontal: 20,
  },
  spacer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacerText: {
    fontSize: 14,
    color: '#666',
  },
  secondDivider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 40,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default CalendarScreen;