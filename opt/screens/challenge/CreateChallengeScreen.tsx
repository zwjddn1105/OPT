// CreateChallengeScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { TopHeader } from "../../components/TopHeader";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePickerModal from "react-native-modal-datetime-picker";

type RootStackParamList = {};

const placeholderTextColor = "#999";

const CreateChallengeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedType, setSelectedType] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [customPeriod, setCustomPeriod] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isStartPickerVisible, setStartPickerVisible] = useState(false);
  const [isEndPickerVisible, setEndPickerVisible] = useState(false);

  const [isRewardChecked, setIsRewardChecked] = useState(false);
  const [rewardText, setRewardText] = useState("");

  const types = [
    { label: "운동 챌린지", value: "1" },
    { label: "식단 챌린지", value: "2" },
    { label: "생활 습관 챌린지", value: "3" },
    { label: "학습 챌린지", value: "4" },
  ];

  const periods = [
    { label: "매일", value: "1" },
    { label: "1주", value: "2" },
    { label: "2주", value: "3" },
    { label: "3주", value: "4" },
    { label: "30일", value: "5" },
    { label: "직접입력", value: "custom" },
  ];

  const handleConfirmStartDate = (date: Date) => {
    setStartDate(formatDate(date));
    setStartPickerVisible(false);
  };

  const handleConfirmEndDate = (date: Date) => {
    setEndDate(formatDate(date));
    setEndPickerVisible(false);
  };

  const formatDate = (date: Date): string => {
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopHeader />
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>챌린지 생성</Text>
            </View>
            <Text style={styles.label}>종류</Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={[
                styles.placeholderStyle,
                { color: placeholderTextColor },
              ]}
              selectedTextStyle={styles.selectedTextStyle}
              data={types}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="챌린지 종류를 선택해주세요."
              value={selectedType}
              onChange={(item) => {
                setSelectedType(item.value);
              }}
            />
          </View>

          <View style={styles.rowContainer}>
            <View style={styles.halfInputGroup}>
              <Text style={styles.label}>주제</Text>
              <TextInput
                style={styles.input}
                placeholder="주제를 입력해주세요."
                placeholderTextColor={placeholderTextColor}
              />
            </View>
            <View style={styles.halfInputGroup}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>주기</Text>
                {selectedPeriod === "custom" && (
                  <TouchableOpacity onPress={() => setSelectedPeriod(null)}>
                    <Text style={styles.resetText}>다시 선택하기</Text>
                  </TouchableOpacity>
                )}
              </View>
              {selectedPeriod === "custom" ? (
                <TextInput
                  style={styles.input}
                  placeholder="직접 입력"
                  value={customPeriod}
                  onChangeText={setCustomPeriod}
                  keyboardType="numeric"
                  placeholderTextColor={placeholderTextColor}
                />
              ) : (
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={[
                    styles.placeholderStyle,
                    { color: placeholderTextColor },
                  ]}
                  selectedTextStyle={styles.selectedTextStyle}
                  data={periods}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="주기를 선택해주세요."
                  value={selectedPeriod}
                  onChange={(item) => {
                    setSelectedPeriod(item.value);
                  }}
                />
              )}
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.halfInputGroup}>
              <Text style={styles.label}>횟수</Text>
              <TextInput
                style={styles.input}
                placeholder="횟수를 입력해주세요."
                keyboardType="numeric"
                placeholderTextColor={placeholderTextColor}
              />
            </View>
            <View style={styles.halfInputGroup}>
              <Text style={styles.label}>상한인원</Text>
              <TextInput
                style={styles.input}
                placeholder="상한인원을 입력해주세요."
                keyboardType="numeric"
                placeholderTextColor={placeholderTextColor}
              />
            </View>
          </View>

          <View style={styles.dateContainer}>
            {/* 시작 날짜 */}
            <View style={styles.dateInputWrapper}>
              <View style={styles.labelIconContainer}>
                <Text style={styles.label}>시작날짜</Text>
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color="#0C508B"
                  style={styles.calendarIcon}
                />
              </View>
              <TouchableOpacity
                onPress={() => setStartPickerVisible(true)}
                style={styles.input}
              >
                <Text
                  style={{ color: startDate ? "#000" : placeholderTextColor }}
                >
                  {startDate || "시작 날짜를 선택하세요."}
                </Text>
              </TouchableOpacity>
            </View>

            {/* 종료 날짜 */}
            <View style={styles.dateInputWrapper}>
              <View style={styles.labelIconContainer}>
                <Text style={styles.label}>종료날짜</Text>
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color="#0C508B"
                  style={styles.calendarIcon}
                />
              </View>
              <TouchableOpacity
                onPress={() => setEndPickerVisible(true)}
                style={styles.input}
              >
                <Text
                  style={{ color: endDate ? "#000" : placeholderTextColor }}
                >
                  {endDate || "종료 날짜를 선택하세요."}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Date Picker Modals */}
          <DateTimePickerModal
            isVisible={isStartPickerVisible}
            mode="date"
            onConfirm={handleConfirmStartDate}
            onCancel={() => setStartPickerVisible(false)}
          />
          <DateTimePickerModal
            isVisible={isEndPickerVisible}
            mode="date"
            onConfirm={handleConfirmEndDate}
            onCancel={() => setEndPickerVisible(false)}
          />
          <View style={styles.rewardContainer}>
            <TouchableOpacity
              onPress={() => setIsRewardChecked(!isRewardChecked)}
              style={styles.checkboxContainer}
            >
              <Text style={styles.label}>보상유무</Text>
              <Text></Text>
              <Ionicons
                name={isRewardChecked ? "checkbox-outline" : "square-outline"}
                size={20}
                color="#0C508B"
              />
            </TouchableOpacity>
            <TextInput
              style={[
                styles.input,
                !isRewardChecked && styles.disabledInput, // 비활성화 스타일 추가
              ]}
              placeholder="ex) 무료 PT횟수 1회 + 1Day Class 이용권 1회"
              placeholderTextColor={placeholderTextColor}
              editable={isRewardChecked} // 체크박스 상태에 따라 입력 가능 여부 설정
              value={rewardText}
              onChangeText={setRewardText}
            />
          </View>
          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>개설하기</Text>
          </TouchableOpacity>
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
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 20,
  },
  backButton: {
    padding: 8,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  formContainer: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  halfInputGroup: {
    width: "48%",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#0C508B",
    borderRadius: 8,
    padding: 12,
    color: "#000",
  },
  dropdown: {
    height: 45,
    borderColor: "#0C508B",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  placeholderStyle: {
    fontSize: 14,
    color: placeholderTextColor,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "#000",
  },
  dateContainer: {
    flexDirection: "column",
    marginBottom: 20,
  },
  dateInput: {
    width: "48%",
  },
  dateInputWrapper: {
    marginBottom: 20,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: "#0C508B",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 30,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  resetText: {
    fontSize: 14,
    color: "#0C508B",
    fontWeight: "500",
    marginBottom: 8,
  },
  calendarIcon: {
    marginLeft: 10,
  },
  labelIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  disabledInput: {
    backgroundColor: "#f5f5f5", // 비활성화된 상태의 배경색
    borderColor: "#ccc", // 비활성화된 상태의 테두리 색
    color: "#999", // 비활성화된 상태의 텍스트 색상
  },
  rewardContainer: {
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default CreateChallengeScreen;
