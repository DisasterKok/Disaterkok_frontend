import React from 'react';
import { Pressable, StyleSheet, Text, View, FlatList } from 'react-native';
import COLOR from '../../constants/colors';
import { DisasterCategoryType, DisasterType } from './types';
import { NATURAL_DISASTER, SOCIAL_DISASTER } from '../../constants/DummyDisaster';

type SidoTableProps = {
  disasterCategory: DisasterCategoryType[];
  selectedDisasterCategory: number;
  setSelectedDisasterCategory: React.Dispatch<React.SetStateAction<number>>;
  setDisasterList: React.Dispatch<React.SetStateAction<DisasterType[]>>;
};

export default function MainCategory({
  disasterCategory,
  selectedDisasterCategory,
  setSelectedDisasterCategory,
  setDisasterList,
}: SidoTableProps) {
  const handleDisasterCategoryClick = ({ item }: { item: DisasterCategoryType }) => {
    if (item.id === selectedDisasterCategory) {
      setSelectedDisasterCategory(0);
      setDisasterList([]);
    } else {
      setSelectedDisasterCategory(item.id);

      if (item.id === 1) {
        setDisasterList(NATURAL_DISASTER);
      }

      if (item.id === 2) {
        setDisasterList(SOCIAL_DISASTER);
      }
    }
  };

  const renderDisasterCategory = ({ item }: { item: DisasterCategoryType }) => {
    return (
      <Pressable
        style={
          selectedDisasterCategory == item.id
            ? StyleSheet.compose(styles.regionItem, styles.selectedSido)
            : styles.regionItem
        }
        onPress={() => handleDisasterCategoryClick({ item })}
      >
        <Text
          style={
            selectedDisasterCategory == item.id
              ? StyleSheet.compose(styles.regionItemtext, styles.selectedSidoText)
              : styles.regionItemtext
          }
        >
          {item.text}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.tableLeft}>
      <View style={styles.tableTitle}>
        <Text>대분류</Text>
      </View>
      <FlatList
        data={disasterCategory}
        renderItem={renderDisasterCategory}
        contentContainerStyle={styles.regionList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tableLeft: {
    flex: 1.2,
    width: '100%',
    borderRightWidth: 1,
    borderColor: `${COLOR.lightGray}`,
  },

  tableTitle: {
    width: '100%',
    height: 42,
    borderBottomWidth: 1,
    borderColor: `${COLOR.lightGray}`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  regionList: {
    width: '100%',
    alignItems: 'stretch',
  },
  regionItem: {
    width: '100%',
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },

  regionItemtext: {
    fontSize: 12,
    color: `${COLOR.gray}`,
  },
  selectedSido: {
    backgroundColor: `${COLOR.blue}`,
  },
  selectedSidoText: {
    color: `${COLOR.white}`,
  },
});
