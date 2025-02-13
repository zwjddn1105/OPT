import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://70.12.246.176:8080';

// API 응답 타입
export interface Media {
  id: number;
  type: string;
  path: string;
  createdAt: string | null;
}

// 선택된 미디어 타입
export interface SelectedMedia {
  uri: string;
  type: 'image' | 'video';
  fileName?: string;
}

// GET 응답에서 사용되는 타입
export interface ExerciseRecord {
  id: number;
  exerciseId: number;
  exerciseName: string;
  exerciseImage: string | null;
  medias: Media[];
  sets: number;
  rep: number;
  weight: number;
  duration: number | null;
  distance: number | null;
}

// POST 요청에서 사용되는 타입
export interface CreateExerciseRecordRequest {
  data: {
    exerciseId: number;
    set: number;
    rep: number;
    weight: number;
  };
  medias?: SelectedMedia[];
}

// PATCH 요청에서 사용되는 타입
export interface UpdateExerciseRecordRequest {
  data: {
    exerciseRecordId: number;
    set: number;
    rep: number;
    weight: number;
    mediaIdsToDelete?: number[];
  };
  medias?: SelectedMedia[];
}

// 운동 기록 조회
export const fetchExerciseRecords = async (date: string): Promise<ExerciseRecord[]> => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const formattedDate = date.replace(/-/g, ''); // YYYY-MM-DD를 YYYYMMDD로 변환

    const response = await fetch(`${API_URL}/exercise-records?date=${formattedDate}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error('Failed to fetch exercise records');

    return await response.json();
  } catch (error) {
    console.error('Error fetching exercise records:', error);
    throw error;
  }
};

// 운동 기록 생성
export const createExerciseRecord = async (formData: FormData): Promise<ExerciseRecord> => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(`${API_URL}/exercise-records`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`, // ❌ Content-Type 자동 설정됨
      },
      body: formData,
    });

    console.log('🚀 서버 응답 상태:', response.status);

    const responseText = await response.text();
    if (!response.ok) {
      console.error('🚨 서버 응답 오류:', responseText);
      throw new Error(`Failed to create exercise record: ${response.status} ${responseText}`);
    }

    return responseText ? JSON.parse(responseText) : null;
  } catch (error) {
    console.error('🚨 Detailed error:', error);
    throw error;
  }
};

// 운동 기록 삭제
export const deleteExerciseRecord = async (id: number): Promise<void> => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(`${API_URL}/exercise-records/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const responseText = await response.text();
    if (!response.ok) {
      throw new Error(`Failed to delete exercise record: ${response.status} ${responseText}`);
    }
  } catch (error) {
    console.error('Error deleting exercise record:', error);
    throw error;
  }
};

// 운동 기록 수정
export const updateExerciseRecord = async (id: number, formData: FormData): Promise<void> => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(`${API_URL}/exercise-records/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const responseText = await response.text();
      throw new Error(`Failed to update exercise record: ${response.status} ${responseText}`);
    }
  } catch (error) {
    console.error('Error updating exercise record:', error);
    throw error;
  }
};
