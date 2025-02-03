// HomeScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation(); // 별도의 타입 지정 없이 사용

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>홈 화면</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("KakaoLogin")}
      >
        <Text style={styles.buttonText}>카카오 로그인</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerText: { fontSize: 24, marginBottom: 20 },
  button: {
    backgroundColor: '#FEE500',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: { fontSize: 16, color: '#000' },
});
