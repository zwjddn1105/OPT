import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabNavigator } from "./BottomTabNavigator";
import KakaoLogin from "../screens/LoginScreen";
import DMScreen from "../screens/chat/DMScreen";
import LoginNeedScreen from "../screens/LoginNeedScreen";
import FoodScreen from "../screens/FoodScreen";
import ManagerChatScreen from "../screens/chat/ManagerChatScreen";
import TrainerChatScreen from "../screens/chat/TrainerChatScreen";
import UserChatScreen from "../screens/chat/UserChatScreen";
import TrainerProfileScreen from "../screens/TrainerProfileScreen";

export type RootStackParamList = {
  Main: undefined;
  KakaoLogin: undefined;
  DMScreen: undefined;
  LoginNeedScreen: undefined;
  Food: { date: string };
  ManagerChat: undefined;
  TrainerChat: undefined;
  UserChat: undefined;
  TrainerProfile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={BottomTabNavigator} />
      <Stack.Screen name="KakaoLogin" component={KakaoLogin} />
      <Stack.Screen name="DMScreen" component={DMScreen} />
      <Stack.Screen name="LoginNeedScreen" component={LoginNeedScreen} />
      <Stack.Screen name="Food" component={FoodScreen} />
      <Stack.Screen name="ManagerChat" component={ManagerChatScreen} />
      <Stack.Screen name="TrainerChat" component={TrainerChatScreen} />
      <Stack.Screen name="UserChat" component={UserChatScreen} />
      <Stack.Screen name="TrainerProfile" component={TrainerProfileScreen} />
    </Stack.Navigator>
  );
};
