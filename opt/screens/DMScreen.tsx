import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DMScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>DM 화면</Text>
    </View>
  );
};

export default DMScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24, fontWeight: 'bold' },
});
