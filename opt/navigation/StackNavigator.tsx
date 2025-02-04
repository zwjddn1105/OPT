import { createStackNavigator } from "@react-navigation/stack";
import { BottomTabNavigator } from "./BottomTabNavigator";
import { ManagerChatScreen } from "../screens/ManagerChatScreen";
import { TrainerChatScreen } from "../screens/TrainerChatScreen";
const Stack = createStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ManagerChat"
        component={ManagerChatScreen}
        options={{
          headerShown: false, // 이 옵션을 추가하여 기본 헤더를 숨김
        }}
      />
      <Stack.Screen
        name="TrainerChat"
        component={TrainerChatScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
