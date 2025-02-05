// components/ChatActionModal.tsx
import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ChatActionModalProps {
  visible: boolean;
  onClose: () => void;
}
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ChatActionModal = ({ visible, onClose }: ChatActionModalProps) => {
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      animationType="none"
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <Animated.View
          style={[styles.modalView, { transform: [{ translateY }] }]}
        >
          <ScrollView
            showsVerticalScrollIndicator={true}
            contentContainerStyle={styles.scrollContent}
          >
            {/* 모달 내용 */}
            <View style={styles.actionContainer}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="image" size={32} color="#666" />
                <Text style={styles.actionText}>사진</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="videocam" size={32} color="#666" />
                <Text style={styles.actionText}>동영상</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="barbell-outline" size={32} color="#666" />
                <Text style={styles.actionText}>운동기록</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="restaurant-outline" size={32} color="#666" />
                <Text style={styles.actionText}>식단공유</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalView: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: "30%",
    maxHeight: SCREEN_HEIGHT * 0.7, // 3. Dimensions 사용처
  },
  scrollContent: {
    flexGrow: 1,
  },
  actionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 30,
    gap: 25, // 아이템 간격 넓히기
  },
  actionButton: {
    alignItems: "center",
    padding: 15,
    width: "10%", // 3개씩 배치되도록 너비 조정
    minWidth: 80, // 최소 너비 설정으로 텍스트 잘림 방지
  },
  actionText: {
    marginTop: 8,
    fontSize: 11, // 글자 크기 약간 줄여서 한 줄에 표시되도록
    color: "#666",
    textAlign: "center",
  },
});

export default ChatActionModal;
