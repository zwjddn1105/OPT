// navigation/BottomTabNavigator.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { Ionicons } from '@expo/vector-icons'; // 아이콘 사용

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          if (route.name === '홈') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === '기록') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline'; ㅇㄴㅁㅁ
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { height: 80 },
        tabBarLabelStyle: { fontSize: 14, paddingBottom: 10 }, // 라벨을 아래로 정렬
        tabBarIconStyle: { marginTop: 10 }, // 아이콘을 아래로 정렬
      })}
    >
      <Tab.Screen name="홈" component={HomeScreen} />
      <Tab.Screen name="기록" component={SettingsScreen} />
      <Tab.Screen name="ㅇㅇ" component={SettingsScreen} />
    </Tab.Navigator>
  );
};