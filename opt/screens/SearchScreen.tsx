import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TopHeader } from "../components/TopHeader";

export const SearchScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <TopHeader />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>검색 화면 ⚙️</Text>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default SearchScreen;
