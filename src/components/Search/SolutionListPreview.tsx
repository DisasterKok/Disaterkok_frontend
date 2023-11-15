import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import COLOR from '../../constants/colors';

interface SolutionListPreviewProps {
  searchInput: string;
  selectedFilter: string;
  handleTabPress: (tabName: string) => void;
}

const SolutionListPreview = ({
  searchInput,
  selectedFilter,
  handleTabPress,
}: SolutionListPreviewProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.tabNameContainer}>
        <Text style={styles.tabName}>솔루션</Text>
        <Pressable onPress={() => handleTabPress('솔루션')} style={styles.button}>
          <Text style={styles.buttonText}>더보기</Text>
          <IonIcon name="chevron-forward" size={12} color={`${COLOR.gray}`} />
        </Pressable>
      </View>
    </View>
  );
};

export default SolutionListPreview;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 10,
    marginBottom: 30,
  },
  tabNameContainer: {
    flexDirection: 'row',
    height: 27,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: `${COLOR.lightGray}`,
  },
  tabName: {
    color: `${COLOR.black}`,
    fontSize: 16,
    fontWeight: '600',
  },
  button: {
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonText: {
    color: `${COLOR.gray}`,
    fontSize: 12,
    fontWeight: '600',
  },
});
