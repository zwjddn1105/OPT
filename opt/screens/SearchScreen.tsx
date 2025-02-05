import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, Animated, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FilterSideBarProps {
  visible: boolean;
  onClose: () => void;
  selectedSort: string;
  onSortChange: (sort: string) => void;
  sortOptions: { id: string; label: string }[];
}

const FilterSideBar: React.FC<FilterSideBarProps> = ({
  visible,
  onClose,
  selectedSort, 
  onSortChange,
  sortOptions
}) => {
  const [isExtendedSort, setIsExtendedSort] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [visible]);

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0]
  });

  return (
    <Modal 
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.filterOverlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <Animated.View 
          style={[
            styles.filterSideBar, 
            { transform: [{ translateX }] }
          ]}
        >
          <TouchableOpacity 
            activeOpacity={1} 
            onPress={(e) => e.stopPropagation()}
            style={styles.filterContainer}
          >
            <View style={styles.filterHeader}>
              <Text style={styles.filterTitle}>정렬 및 필터</Text>
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.sortSection}>
              <TouchableOpacity 
                style={styles.sortTitleContainer}
                onPress={() => setIsExtendedSort(!isExtendedSort)}
              >
                <Text style={styles.sortSectionTitle}>정렬</Text>
                <Ionicons 
                  name={isExtendedSort ? "chevron-up" : "chevron-down"} 
                  size={20} 
                  color="#666" 
                />
              </TouchableOpacity>
              
              {isExtendedSort && sortOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={styles.sortOptionItem}
                  onPress={() => {
                    onSortChange(option.id);
                    setIsExtendedSort(false);
                  }}
                >
                  <Text 
                    style={[
                      styles.sortOptionText,
                      selectedSort === option.id && styles.sortOptionTextActive
                    ]}
                  >
                    {option.label}
                  </Text>
                  {selectedSort === option.id && (
                    <Ionicons name="checkmark" size={20} color="#004AAD" />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.filterContent}>
              {/* 기존 필터 옵션들 */}
            </View>

            <View style={styles.filterFooter}>
              <TouchableOpacity style={styles.filterResetButton}>
                <Text>초기화</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterApplyButton}>
                <Text style={styles.filterApplyButtonText}>적용</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const SearchScreen = () => {
  const [searchCategory, setSearchCategory] = useState<'address' | 'name'>('address');
  const [selectedSort, setSelectedSort] = useState('recommended');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  
  const sortOptions = [
    { id: 'recommended', label: '추천순' },
    { id: 'distance', label: '거리순' },
    { id: 'rating', label: '평점순' },
    { id: 'review', label: '리뷰순' },
  ];

  const categoryOptions = [
    { id: 'address', label: '주소' },
    { id: 'name', label: '이름' }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* 검색 카테고리 선택 드롭다운 */}
        <View>
          <TouchableOpacity 
            style={[
              styles.categoryButton, 
              { width: 80 } // 고정된 너비 추가
            ]}
            onPress={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
          >
            <Text style={[
              styles.categoryText, 
              { textAlign: 'left', width: '100%' } // 가운데 정렬
            ]}>
              {searchCategory === 'address' ? '주소' : '이름'}
            </Text>
            <Ionicons 
              name="chevron-down" 
              size={16} 
              color="#666" 
              style={{ position: 'absolute', right: 5 }} 
            />
          </TouchableOpacity>
  
          {isCategoryDropdownOpen && (
            <View style={styles.categoryDropdown}>
              {categoryOptions
                .filter(option => option.id !== searchCategory)
                .map(option => (
                  <TouchableOpacity
                    key={option.id}
                    style={styles.categoryDropdownItem}
                    onPress={() => {
                      setSearchCategory(option.id as 'address' | 'name');
                      setIsCategoryDropdownOpen(false);
                    }}
                  >
                    <Text style={styles.categoryDropdownItemText}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))
              }
            </View>
          )}
        </View>

        {/* 검색 입력창 */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={`원하는 트레이너를 검색해보세요`}
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 정렬 옵션과 필터 */}
      <View style={styles.filterSection}>
        <TouchableOpacity 
          style={styles.sortTriggerButton} 
          onPress={() => setIsFilterVisible(true)}
        >
          <Text style={styles.sortTriggerText}>
            {sortOptions.find(opt => opt.id === selectedSort)?.label || '추천순'}
          </Text>
          <Ionicons name="chevron-down" size={16} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.filterButton} 
          onPress={() => setIsFilterVisible(true)}
        >
          <Text style={styles.filterButtonText}>필터</Text>
          <Text style={styles.filterCount}>(1)</Text>
        </TouchableOpacity>

        <FilterSideBar 
          visible={isFilterVisible} 
          onClose={() => setIsFilterVisible(false)} 
          selectedSort={selectedSort}
          onSortChange={(sort) => {
            setSelectedSort(sort);
            setIsFilterVisible(false);
          }}
          sortOptions={sortOptions}
        />
      </View>
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
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: '#f5f5f5',
  },
  categoryText: {
    fontSize: 14,
    marginRight: 4,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    padding: 0,
  },
  searchButton: {
    padding: 4,
  },
  filterSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sortContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  sortButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  sortButtonActive: {
    backgroundColor: '#f0f0f0',
  },
  sortButtonText: {
    fontSize: 13,
    color: '#666',
  },
  sortButtonTextActive: {
    color: '#000',
    fontWeight: '500',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: '#f5f5f5',
  },
  filterButtonText: {
    fontSize: 13,
    color: '#666',
  },
  filterCount: {
    fontSize: 13,
    color: '#007AFF',
    marginLeft: 2,
  },
  filterOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 어두운 배경
  },
  filterSideBar: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 250, // 사이드바 너비
    height: '100%',
    backgroundColor: 'white',
  },
  filterContainer: {
    flex: 1,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  filterContent: {
    flex: 1,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd', // 선 색상을 더 진하게 변경
  },
  filterFooter: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd', // 선 색상을 더 진하게 변경
  },
  filterResetButton: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 10,
  },
  filterApplyButton: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#004AAD',
  },
  filterApplyButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  categoryDropdown: {
    position: 'absolute',
    top: '100%', // 버튼 아래에 위치
    left: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 4,
    zIndex: 10,
  },
  categoryDropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  categoryDropdownItemText: {
    fontSize: 14,
  },
  sortTriggerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10, // 필터 버튼과 붙이기 위해 제거
  },
  sortTriggerText: {
    fontSize: 14,
    color: '#666',
    marginRight: 5,
  },
  sortSection: {
    padding: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  sortSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  sortOptionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  sortOptionText: {
    fontSize: 14,
    color: '#666',
  },
  sortOptionTextActive: {
    color: '#004AAD',
    fontWeight: '600',
  },
  sortTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10, // 마진 줄이기
  },
});

export default SearchScreen;