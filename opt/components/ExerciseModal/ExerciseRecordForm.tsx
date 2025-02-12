import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';
import { ExerciseRecordFormProps } from '../../types/exercise';

export const ExerciseRecordForm = ({ 
  exercise, 
  onBack, 
  onClose, 
  onSave, 
  selectedDate 
}: ExerciseRecordFormProps) => {
  const [minutes, setMinutes] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');
  const [weight, setWeight] = useState('');

  const minutesRef = useRef<TextInput>(null);
  const setsRef = useRef<TextInput>(null);
  const weightRef = useRef<TextInput>(null);
  const repsRef = useRef<TextInput>(null);

  const handleNumberInput = (value: string, setter: (value: string) => void) => {
    const numbersOnly = value.replace(/[^0-9]/g, '');
    setter(numbersOnly);
  };

  const handleSave = async () => {
    if (!minutes.trim()) {
      minutesRef.current?.focus();
      return;
    }

    try {
      const record = {
        id: Date.now().toString(),
        exerciseId: exercise.id,
        date: selectedDate,
        minutes: parseInt(minutes) || 0,
        reps: parseInt(reps) || 0,
        sets: parseInt(sets) || 0,
        weight: parseInt(weight) || 0,
      };

      const existingRecords = await AsyncStorage.getItem('exerciseRecords');
      const records = existingRecords ? JSON.parse(existingRecords) : [];
      records.push(record);

      await AsyncStorage.setItem('exerciseRecords', JSON.stringify(records));
      onSave?.();
      onClose();
    } catch (error) {
      console.error('Failed to save exercise record:', error);
    }
  };

  return (
    <View style={styles.modalContent}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={onBack}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{exercise.name}</Text>
        <Text style={styles.headerDate}>{selectedDate}</Text>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScrollView 
          style={styles.formScrollView}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.videoPlaceholder} />
          <Text style={styles.guideTitle}>운동 가이드</Text>

          <View style={styles.inputsContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                ref={minutesRef}
                style={styles.input}
                placeholder="운동 시간을 입력하세요"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={minutes}
                onChangeText={(value) => handleNumberInput(value, setMinutes)}
                returnKeyType="next"
                onSubmitEditing={() => setsRef.current?.focus()}
                blurOnSubmit={false}
              />
              <View style={styles.unitContainer}>
                <Text style={styles.inputUnit}>분</Text>
                <Text style={styles.requiredMark}>*</Text>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                ref={setsRef}
                style={styles.input}
                placeholder="세트 수를 입력하세요"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={sets}
                onChangeText={(value) => handleNumberInput(value, setSets)}
                returnKeyType="next"
                onSubmitEditing={() => weightRef.current?.focus()}
                blurOnSubmit={false}
              />
              <Text style={styles.inputUnit}>세트</Text>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                ref={weightRef}
                style={styles.input}
                placeholder="무게를 입력하세요"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={weight}
                onChangeText={(value) => handleNumberInput(value, setWeight)}
                returnKeyType="next"
                onSubmitEditing={() => repsRef.current?.focus()}
                blurOnSubmit={false}
              />
              <Text style={styles.inputUnit}>kg</Text>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                ref={repsRef}
                style={styles.input}
                placeholder="운동 횟수를 입력하세요"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={reps}
                onChangeText={(value) => handleNumberInput(value, setReps)}
                returnKeyType="done"
                onSubmitEditing={handleSave}
              />
              <Text style={styles.inputUnit}>횟수</Text>
            </View>
          </View>
          
          <View style={styles.bottomSpacing} />
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>저장</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};