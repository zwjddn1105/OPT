import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabNavigator } from './navigation/BottomTabNavigator';
import KakaoLogin from './screens/LoginScreen';
import DMScreen from './screens/DMScreen';
import LoginNeedScreen from './screens/LoginNeedScreen';
import FoodScreen from './screens/FoodScreen';

// Stack Navigator의 타입 정의
type RootStackParamList = {
  Main: undefined;
  KakaoLogin: undefined;
  DMScreen: undefined;
  LoginNeedScreen: undefined;
  Food: { date: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={BottomTabNavigator} />
        <Stack.Screen name="KakaoLogin" component={KakaoLogin} />
        <Stack.Screen name="DMScreen" component={DMScreen} />
        <Stack.Screen name="LoginNeedScreen" component={LoginNeedScreen} />
        <Stack.Screen name="Food" component={FoodScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
  },
});