import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Pressable } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import COLOR from '../../../../../constants/colors';

const AddAddress = ({
  openSearch,
  onCurrent,
  goBack,
}: {
  openSearch: () => void;
  onCurrent: () => void;
  goBack: () => void;
}) => {
  return (
    <View style={{ width: '100%', height: '100%' }}>
      <View style={styles.header}>
        <View style={styles.tabBar}>
          <Pressable onPress={goBack}>
            <IoniconsIcon name="chevron-back-outline" style={styles.gobackIcon} />
          </Pressable>
        </View>
      </View>
      <View style={styles.inputBox}>
        <View style={styles.searchBar}>
          <FeatherIcon name="search" size={14} style={styles.searchIcon} />
          <TextInput
            placeholder="지번, 도로명, 건물명으로 검색"
            style={styles.textInput}
            onFocus={openSearch}
          />
        </View>
        <View>
          <TouchableOpacity activeOpacity={0.8} onPress={onCurrent} style={styles.currentButton}>
            <MaterialIcon name="target" size={18} style={styles.currentButtonIcon} />
            <Text style={styles.currentButtonText}>현재 위치로 설정하기</Text>
            <IoniconsIcon
              name="chevron-forward-outline"
              size={12}
              style={styles.currentButtonIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AddAddress;

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    marginTop: 16,
    paddingHorizontal: 14,
  },
  tabBar: {
    height: 64,
    justifyContent: 'center',
  },
  gobackIcon: {
    fontSize: 20,
  },
  inputBox: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 22,
  },
  searchBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: `${COLOR.darkGray}`,
    paddingBottom: 6,
    marginBottom: 6,
  },
  searchIcon: {
    marginRight: 5,
    color: `${COLOR.gray}`,
  },
  textInput: {
    width: '95%',
  },
  currentButton: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    height: 40,
    alignItems: 'center',
  },
  currentButtonIcon: {
    color: `${COLOR.gray}`,
  },
  currentButtonText: {
    color: `${COLOR.gray}`,
    fontSize: 14,
    lineHeight: 20,
    marginRight: 5,
  },
});
