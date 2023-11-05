import React from 'react';
import { Pressable, StyleSheet, Text, View, FlatList } from 'react-native';
import COLOR from '../../constants/colors';
import { fetchEupmyeondongInfo } from '../../apis/fetchEupmyeondong';
import { EupmyeondingFeatureType, SigunguAndEupmyeondongType } from './types';

type SigunguTableProps = {
  sigunguList: SigunguAndEupmyeondongType[];
  setEupmyeondongList: React.Dispatch<React.SetStateAction<SigunguAndEupmyeondongType[]>>;
  selectedSigungu: number;
  setSelectedSigungu: React.Dispatch<React.SetStateAction<number>>;
};

export default function SigunguTable({
  sigunguList,
  setEupmyeondongList,
  selectedSigungu,
  setSelectedSigungu,
}: SigunguTableProps) {
  const handleSigunguItemClick = ({ item }: { item: SigunguAndEupmyeondongType }) => {
    if (item.id === selectedSigungu) {
      setSelectedSigungu(0);
      setEupmyeondongList([]);
    } else {
      setSelectedSigungu(item.id);
      fetchEupmyeondongInfo(item.fullName)
        .then((data) => {
          const eupmyeondongListFormatted = data.features.map(
            (feature: EupmyeondingFeatureType) => ({
              id: feature.properties.emd_cd,
              fullName: feature.properties.full_nm,
              singleName: feature.properties.emd_kor_nm,
            }),
          );
          setEupmyeondongList(eupmyeondongListFormatted);
        })
        .catch((error) => console.log(error));
    }
  };

  const renderSigungu = ({ item }: { item: SigunguAndEupmyeondongType }) => {
    return (
      <Pressable
        style={
          selectedSigungu == item.id
            ? StyleSheet.compose(styles.regionItem, styles.selectedSigungu)
            : styles.regionItem
        }
        onPress={() => handleSigunguItemClick({ item })}
      >
        <Text
          style={
            selectedSigungu == item.id
              ? StyleSheet.compose(styles.regionItemtext, styles.selectedSigunguText)
              : styles.regionItemtext
          }
        >
          {item.singleName}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.tableCenter}>
      <View style={styles.tableTitle}>
        <Text>시,군,구</Text>
      </View>
      <FlatList
        data={sigunguList}
        renderItem={renderSigungu}
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

  tableCenter: {
    flex: 2,
    width: '100%',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: `${COLOR.middleGray}`,
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

  selectedSigungu: {
    backgroundColor: `${COLOR.lightBlue}`,
  },
  selectedSigunguText: {
    color: `${COLOR.white}`,
  },
});
