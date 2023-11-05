import React from 'react';
import { Pressable, StyleSheet, Text, View, FlatList } from 'react-native';
import COLOR from '../../constants/colors';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { SigunguAndEupmyeondongType } from './types';

type EupmyeondongTableProps = {
  selectedEupmyeondong: SigunguAndEupmyeondongType[];
  setSelectedEupmyeondong: React.Dispatch<React.SetStateAction<SigunguAndEupmyeondongType[]>>;
  eupmyeondongList: SigunguAndEupmyeondongType[];
};

export default function EupmyeondongTable({
  selectedEupmyeondong,
  setSelectedEupmyeondong,
  eupmyeondongList,
}: EupmyeondongTableProps) {
  const handleEupmyeondongItemClick = ({ item }: { item: SigunguAndEupmyeondongType }) => {
    setSelectedEupmyeondong((prev) => {
      if (prev.some((selectedItem) => selectedItem.id === item.id)) {
        return prev.filter((prevItem) => prevItem.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const renderEupmyeondong = ({ item }: { item: SigunguAndEupmyeondongType }) => {
    return (
      <Pressable style={styles.regionItem} onPress={() => handleEupmyeondongItemClick({ item })}>
        <View style={styles.eupmyeondongItem}>
          <Text
            style={
              selectedEupmyeondong.some((selectedItem) => selectedItem.id === item.id)
                ? StyleSheet.compose(styles.regionItemtext, styles.selectedEupmyeondongText)
                : styles.regionItemtext
            }
          >
            {item.singleName}
          </Text>
          {selectedEupmyeondong.some((selectedItem) => selectedItem.id === item.id) && (
            <FeatherIcon name="check" size={18} style={styles.check} />
          )}
        </View>
      </Pressable>
    );
  };
  return (
    <View style={styles.tableRight}>
      <View style={styles.tableTitle}>
        <Text>동,읍,면</Text>
      </View>
      <FlatList
        data={eupmyeondongList}
        renderItem={renderEupmyeondong}
        numColumns={1}
        contentContainerStyle={styles.regionList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tableTitle: {
    width: '100%',
    height: 42,
    borderBottomWidth: 1,
    borderColor: `${COLOR.middleGray}`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableRight: {
    flex: 2,
    width: '100%',
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
  eupmyeondongItem: {
    position: 'relative',
  },
  check: {
    position: 'absolute',
    top: -3,
    right: -30,
    color: `${COLOR.blue}`,
  },

  regionItemtext: {
    fontSize: 12,
    color: `${COLOR.gray}`,
  },

  selectedEupmyeondongText: {
    color: `${COLOR.blue}`,
  },
});
