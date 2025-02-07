// components/TopHeader.tsx
import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ProfileButton from "./ProfileButton";
import SendButton from "./SendButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

type RootStackParamList = {
  LoginNeedScreen: undefined;
  DMScreen: undefined;
  // 다른 필요한 스크린들도 여기에 추가
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const TopHeader = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleProfilePress = async () => {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      // 프로필 화면으로 이동하는 로직 (아직 미구현)
    } else {
      navigation.navigate("LoginNeedScreen");
    }
  };

  return (
    <View style={styles.headerContainer}>
      <Image
        source={require("../assets/logo.png")}
        style={styles.logoImage}
        resizeMode="contain"
      />
      <View style={styles.topButtons}>
        <ProfileButton onPress={handleProfilePress} />
        <SendButton onPress={() => navigation.navigate("DMScreen")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: "#fff",
  },
  logoImage: {
    width: 80,
    height: 60,
  },
  topButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingRight: 5,
  },
});
