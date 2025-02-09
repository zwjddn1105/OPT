import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { TopHeader } from "../../components/TopHeader";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  CreateChallenge: undefined;
};

const ManageChallengesScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  const renderSectionHeader = (title: string) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );

  const openModal = (challenge: any) => {
    setSelectedChallenge(challenge);
    setModalVisible(true);
  };

  const renderChallengeCard = (challenge: any, index: any) => (
    <TouchableOpacity
      key={index}
      style={styles.challengeCard}
      onPress={() => openModal(challenge)}
    >
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
    </TouchableOpacity>
  );

  const renderModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              // 상세화면 보기 로직
              setModalVisible(false);
            }}
          >
            <Text style={styles.modalButtonText}>챌린지 상세화면보기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalButton, styles.deleteButton]}
            onPress={() => {
              // 삭제 로직
              setModalVisible(false);
            }}
          >
            <Text style={styles.modalButtonText}>챌린지 삭제하기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

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
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => navigation.navigate("CreateChallenge")}
            activeOpacity={0.8}
          >
            <Text style={styles.createButtonText}>챌린지 만들기</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          {renderSectionHeader("내가 오픈 예정인 챌린지")}
          <View style={styles.cardContainer}>
            {Array.from({ length: 3 }).map((_, index) =>
              renderChallengeCard(_, index)
            )}
          </View>
        </View>
      </ScrollView>
      {renderModal()}
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
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  challengeCard: {
    width: "48%",
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
    marginBottom: 14,
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
  backButton: {
    padding: 8,
    marginLeft: 12,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 20,
  },
  createButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#0C508B",
    borderRadius: 15,
    marginRight: 20,
  },
  createButtonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButton: {
    backgroundColor: "#0C508B",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginBottom: 15,
    minWidth: 200,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  deleteButton: {
    backgroundColor: "#FF0000",
  },
  closeButton: {
    marginTop: 10,
  },
  closeButtonText: {
    color: "#0C508B",
    fontWeight: "bold",
  },
});

export default ManageChallengesScreen;
