import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Button from "./components/Button";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from "./navigation/StackNavigator";
export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "blue",
  },
});
