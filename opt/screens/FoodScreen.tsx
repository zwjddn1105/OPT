import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

type RootStackParamList = {
  Main: undefined;
  KakaoLogin: undefined;
  DMScreen: undefined;
  LoginNeedScreen: undefined;
  Food: { date: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Food'>;

const FoodScreen = ({ route, navigation }: Props) => {
  const { date } = route.params;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const requestPermissions = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (cameraStatus !== 'granted' || libraryStatus !== 'granted') {
      Alert.alert('권한이 필요합니다', '카메라와 갤러리 접근 권한이 필요합니다.');
      return false;
    }
    return true;
  };

  const showImagePickerOptions = () => {
    Alert.alert(
      '사진 선택',
      '사진을 선택해주세요',
      [
        {
          text: '카메라로 촬영',
          onPress: () => pickImage('camera'),
        },
        {
          text: '갤러리에서 선택',
          onPress: () => pickImage('library'),
        },
        {
          text: '취소',
          style: 'cancel',
        },
      ]
    );
  };

  const pickImage = async (source: 'camera' | 'library') => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const options: ImagePicker.ImagePickerOptions = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      };

      const result = source === 'camera'
        ? await ImagePicker.launchCameraAsync(options)
        : await ImagePicker.launchImageLibraryAsync(options);

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('오류', '사진을 선택하는 중 오류가 발생했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{date}</Text>
        </View>
      </View>
      
      <TouchableOpacity
        style={styles.imageBox}
        onPress={showImagePickerOptions}
      >
        {selectedImage ? (
          <Image 
            source={{ uri: selectedImage }} 
            style={styles.selectedImage} 
          />
        ) : (
          <View style={styles.placeholderContainer}>
            <Ionicons name="camera-outline" size={40} color="#666" />
            <Text style={styles.placeholderText}>사진 추가하기</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  dateContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  dateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  imageBox: {
    width: '90%',
    height: 200,
    backgroundColor: '#f5f5f5',
    alignSelf: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    marginTop: 10,
    color: '#666',
    fontSize: 16,
  },
});

export default FoodScreen;