import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Button from './components/Button';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>안녕 리액트 네이티브! 🚀</Text>
      <Button 
        title="클릭하세요!" 
        onPress={() => alert('동작 확인!')} 
      />
      <StatusBar style="auto" />
    </View>
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