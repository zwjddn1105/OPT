import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Animated,
} from 'react-native';

interface AddScheduleModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (schedule: { 
    nickname: string; 
    startTime: Date;
    endTime: Date;
  }) => void;
  selectedDate: Date;
}

interface TimePickerProps {
  selectedHour: string;
  selectedMinute: string;
  selectedPeriod: string;
  onHourChange: (hour: string) => void;
  onMinuteChange: (minute: string) => void;
  onPeriodChange: (period: string) => void;
}

export const AddScheduleModal: React.FC<AddScheduleModalProps> = ({
  visible,
  onClose,
  onSubmit,
  selectedDate,
}) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [isHiding, setIsHiding] = useState(false);

  // 시간 옵션 배열
  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const minutes = Array.from({ length: 6 }, (_, i) => (i * 10).toString().padStart(2, '0'));
  const periods = ['AM', 'PM'];

  // 초기 시간 설정을 위한 함수들
  const getInitialTime = () => {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    now.setMinutes(Math.round(now.getMinutes() / 10) * 10);
    return now;
  };

  const getTimeComponents = (date: Date) => {
    let hours = date.getHours();
    const period = hours >= 12 ? 'PM' : 'AM';
    
    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12;
    
    return {
      hour: hours.toString().padStart(2, '0'),
      minute: date.getMinutes().toString().padStart(2, '0'),
      period
    };
  };

  // 초기 시작/종료 시간 설정
  const initialStartTime = useRef(getInitialTime()).current;
  const initialEndTime = useRef(new Date(initialStartTime.getTime() + 60 * 60 * 1000)).current;
  
  const initialStart = getTimeComponents(initialStartTime);
  const initialEnd = getTimeComponents(initialEndTime);

  // 상태 관리
  const [nickname, setNickname] = useState('');
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  
  const [selectedStartHour, setSelectedStartHour] = useState(initialStart.hour);
  const [selectedStartMinute, setSelectedStartMinute] = useState(initialStart.minute);
  const [selectedStartPeriod, setSelectedStartPeriod] = useState(initialStart.period);
  
  const [selectedEndHour, setSelectedEndHour] = useState(initialEnd.hour);
  const [selectedEndMinute, setSelectedEndMinute] = useState(initialEnd.minute);
  const [selectedEndPeriod, setSelectedEndPeriod] = useState(initialEnd.period);

  // 애니메이션 효과
  useEffect(() => {
    if (visible) {
      setIsHiding(false);
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const hideModal = () => {
    setIsHiding(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsHiding(false);
      onClose();
    });
  };

  const opacity = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5]
  });

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [800, 0]
  });

  // 시간 변환 함수들
  const convertTo24Hour = (hour: string, period: string) => {
    let hour24 = parseInt(hour);
    if (period === 'PM' && hour24 !== 12) hour24 += 12;
    if (period === 'AM' && hour24 === 12) hour24 = 0;
    return hour24;
  };

  const getTimeAsDate = (hour: string, minute: string, period: string, isEndTime: boolean = false) => {
    const hour24 = convertTo24Hour(hour, period);
    const date = new Date(selectedDate);
    date.setHours(hour24);
    date.setMinutes(parseInt(minute));
    date.setSeconds(0);
    date.setMilliseconds(0);

    if (isEndTime) {
      const startTime = getTimeAsDate(selectedStartHour, selectedStartMinute, selectedStartPeriod);
      if (date < startTime) {
        date.setDate(date.getDate() + 1);
      }
    }

    return date;
  };

  const formatDisplayTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    
    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12;
    
    return `${hours.toString().padStart(2, '0')}:${minutes} ${period}`;
  };

  const handleSubmit = () => {
    if (!nickname.trim()) {
      alert('이름을 입력해주세요');
      return;
    }

    const startTime = getTimeAsDate(selectedStartHour, selectedStartMinute, selectedStartPeriod);
    const endTime = getTimeAsDate(selectedEndHour, selectedEndMinute, selectedEndPeriod, true);

    onSubmit({
      nickname,
      startTime,
      endTime,
    });

    setNickname('');
    hideModal();
  };

  // TimePicker 컴포넌트
  const TimePicker: React.FC<TimePickerProps> = ({ 
    selectedHour,
    selectedMinute,
    selectedPeriod,
    onHourChange,
    onMinuteChange,
    onPeriodChange,
  }) => {
    const hourScrollViewRef = useRef<ScrollView>(null);
    const minuteScrollViewRef = useRef<ScrollView>(null);
    const periodScrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
      const scrollToSelected = () => {
        const hourIndex = hours.findIndex(h => h === selectedHour);
        const minuteIndex = minutes.findIndex(m => m === selectedMinute);
        const periodIndex = periods.findIndex(p => p === selectedPeriod);

        if (hourIndex !== -1) {
          hourScrollViewRef.current?.scrollTo({ y: hourIndex * 44, animated: false });
        }
        if (minuteIndex !== -1) {
          minuteScrollViewRef.current?.scrollTo({ y: minuteIndex * 44, animated: false });
        }
        if (periodIndex !== -1) {
          periodScrollViewRef.current?.scrollTo({ y: periodIndex * 44, animated: false });
        }
      };

      setTimeout(scrollToSelected, 50);
    }, []);

    return (
      <View style={styles.pickerRow}>
        <ScrollView 
          ref={hourScrollViewRef}
          style={styles.pickerColumn} 
          showsVerticalScrollIndicator={false}
        >
          {hours.map((hour) => (
            <TouchableOpacity
              key={hour}
              style={[
                styles.pickerItem,
                selectedHour === hour && styles.selectedPickerItem
              ]}
              onPress={() => onHourChange(hour)}
            >
              <Text style={[
                styles.pickerItemText,
                selectedHour === hour && styles.selectedPickerItemText
              ]}>{hour}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.pickerSeparator}>:</Text>

        <ScrollView 
          ref={minuteScrollViewRef}
          style={styles.pickerColumn}
          showsVerticalScrollIndicator={false}
        >
          {minutes.map((minute) => (
            <TouchableOpacity
              key={minute}
              style={[
                styles.pickerItem,
                selectedMinute === minute && styles.selectedPickerItem
              ]}
              onPress={() => onMinuteChange(minute)}
            >
              <Text style={[
                styles.pickerItemText,
                selectedMinute === minute && styles.selectedPickerItemText
              ]}>{minute}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView 
          ref={periodScrollViewRef}
          style={styles.pickerColumn}
          showsVerticalScrollIndicator={false}
        >
          {periods.map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.pickerItem,
                selectedPeriod === period && styles.selectedPickerItem
              ]}
              onPress={() => onPeriodChange(period)}
            >
              <Text style={[
                styles.pickerItemText,
                selectedPeriod === period && styles.selectedPickerItemText
              ]}>{period}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  if (!visible && !isHiding) return null;

  return (
    <Modal
      transparent={true}
      visible={visible || isHiding}
      onRequestClose={hideModal}
      animationType="none"
    >
      <View style={StyleSheet.absoluteFill}>
        <Animated.View 
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'black',
              opacity: opacity
            }
          ]} 
        />
        <TouchableOpacity 
          style={styles.touchableOverlay}
          activeOpacity={1} 
          onPress={hideModal}
        >
          <Animated.View 
            style={[
              styles.modalView,
              {
                transform: [{ translateY }]
              }
            ]}
          >
            <TouchableOpacity 
              activeOpacity={1} 
              onPress={(e) => e.stopPropagation()}
              style={styles.modalContainer}
            >
              <View style={styles.modalContent}>
                {/* 헤더 */}
                <View style={styles.header}>
                  <Text style={styles.modalTitle}>일정 추가</Text>
                  <TouchableOpacity onPress={hideModal} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>

                {/* 날짜 */}
                <View style={styles.formGroup}>
                  <Text style={styles.label}>날짜</Text>
                  <View style={styles.inputContainer}>
                    <Text style={styles.dateText}>
                      {selectedDate.toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Text>
                  </View>
                </View>

                {/* 이름 입력 */}
                <View style={styles.formGroup}>
                  <Text style={styles.label}>이름</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      value={nickname}
                      onChangeText={setNickname}
                      placeholder="이름을 입력하세요"
                      placeholderTextColor="#999"
                    />
                  </View>
                </View>

                {/* 시작 시간 */}
                <View style={styles.formGroup}>
                  <Text style={styles.label}>시작 시간</Text>
                  <TouchableOpacity
                    style={styles.timeInputContainer}
                    onPress={() => {
                      setShowStartTimePicker(true);
                      setShowEndTimePicker(false);
                    }}
                  >
                    <Text style={styles.timeInputText}>
                      {formatDisplayTime(getTimeAsDate(selectedStartHour, selectedStartMinute, selectedStartPeriod))}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* 종료 시간 */}
                <View style={styles.formGroup}>
                  <Text style={styles.label}>종료 시간</Text>
                  <TouchableOpacity
                    style={styles.timeInputContainer}
                    onPress={() => {
                      setShowEndTimePicker(true);
                      setShowStartTimePicker(false);
                    }}
                  >
                    <Text style={styles.timeInputText}>
                      {formatDisplayTime(getTimeAsDate(selectedEndHour, selectedEndMinute, selectedEndPeriod, true))}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* 시작 시간 선택 UI */}
                {showStartTimePicker && (
                  <View style={styles.timePickerContainer}>
                    <View style={styles.timePickerHeader}>
                      <TouchableOpacity onPress={() => setShowStartTimePicker(false)}>
                        <Text style={styles.doneButtonText}>완료</Text>
                      </TouchableOpacity>
                    </View>
                    <TimePicker
                      selectedHour={selectedStartHour}
                      selectedMinute={selectedStartMinute}
                      selectedPeriod={selectedStartPeriod}
                      onHourChange={setSelectedStartHour}
                      onMinuteChange={setSelectedStartMinute}
                      onPeriodChange={setSelectedStartPeriod}
                    />
                  </View>
                )}

                {/* 종료 시간 선택 UI */}
                {showEndTimePicker && (
                  <View style={styles.timePickerContainer}>
                    <View style={styles.timePickerHeader}>
                      <TouchableOpacity onPress={() => setShowEndTimePicker(false)}>
                        <Text style={styles.doneButtonText}>완료</Text>
                      </TouchableOpacity>
                    </View>
                    <TimePicker
                      selectedHour={selectedEndHour}
                      selectedMinute={selectedEndMinute}
                      selectedPeriod={selectedEndPeriod}
                      onHourChange={setSelectedEndHour}
                      onMinuteChange={setSelectedEndMinute}
                      onPeriodChange={setSelectedEndPeriod}
                    />
                  </View>
                )}

                {/* 추가 버튼 */}
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.submitButtonText}>추가</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  touchableOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    width: '100%',
    overflow: 'hidden',
  },
  modalContainer: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 34,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 5,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#666',
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  inputContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  timeInputContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  timeInputText: {
    fontSize: 16,
    color: '#1a1a1a',
  },
  dateText: {
    fontSize: 16,
    color: '#1a1a1a',
  },
  input: {
    fontSize: 16,
    color: '#1a1a1a',
    padding: 0,
  },
  timePickerContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    marginBottom: 20,
  },
  timePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  doneButtonText: {
    color: '#0047FF',
    fontSize: 16,
    fontWeight: '500',
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  pickerColumn: {
    height: 180,
    width: 60,
  },
  pickerItem: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedPickerItem: {
    backgroundColor: 'rgba(0, 71, 255, 0.1)',
    borderRadius: 8,
  },
  pickerItemText: {
    fontSize: 18,
    color: '#666',
  },
  selectedPickerItemText: {
    color: '#0047FF',
    fontWeight: '600',
  },
  pickerSeparator: {
    fontSize: 24,
    color: '#666',
    paddingHorizontal: 10,
  },
  submitButton: {
    backgroundColor: '#0047FF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});