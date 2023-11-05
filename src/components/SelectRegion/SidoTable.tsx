import React from 'react';
import { Pressable, StyleSheet, Text, View, FlatList } from 'react-native';
import { fetchSigunguInfo } from '../../apis/fetchRegionAPI/fetchSigunguInfo';
import COLOR from '../../constants/colors';
import { SidoType, SigunguAndEupmyeondongType, SigunguFeatureType } from './types';

type SidoTableProps = {
  sidoList: SidoType[];
  setSidoList: React.Dispatch<React.SetStateAction<SidoType[]>>;
  setSigunguList: React.Dispatch<React.SetStateAction<SigunguAndEupmyeondongType[]>>;
  setEupmyeondongList: React.Dispatch<React.SetStateAction<SigunguAndEupmyeondongType[]>>;
  selectedSido: number;
  setSelectedSido: React.Dispatch<React.SetStateAction<number>>;
  setSelectedSigungu: React.Dispatch<React.SetStateAction<number>>;
};

export default function SidoTable({
  sidoList,
  setSigunguList,
  setEupmyeondongList,
  selectedSido,
  setSelectedSido,
  setSelectedSigungu,
}: SidoTableProps) {
  const handleSidoItemClick = ({ item }: { item: SidoType }) => {
    if (item.id === selectedSido) {
      setSelectedSido(0);
      setSelectedSigungu(0);
      setSigunguList([]);
      setEupmyeondongList([]);
    } else {
      setSelectedSido(item.id);
      setEupmyeondongList([]);
      fetchSigunguInfo(item.name)
        .then((data) => {
          const sigunguListFormatted = data.features.map((feature: SigunguFeatureType) => ({
            id: feature.properties.sig_cd,
            fullName: feature.properties.full_nm,
            singleName: feature.properties.sig_kor_nm,
          }));
          setSigunguList(sigunguListFormatted);
        })
        .catch((error) => console.log(error));
    }
  };

  const renderSido = ({ item }: { item: SidoType }) => {
    return (
      <Pressable
        style={
          selectedSido == item.id
            ? StyleSheet.compose(styles.regionItem, styles.selectedSido)
            : styles.regionItem
        }
        onPress={() => handleSidoItemClick({ item })}
      >
        <Text
          style={
            selectedSido == item.id
              ? StyleSheet.compose(styles.regionItemtext, styles.selectedSidoText)
              : styles.regionItemtext
          }
        >
          {item.name.slice(0, 2)}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.tableLeft}>
      <View style={styles.tableTitle}>
        <Text>시,도</Text>
      </View>
      <FlatList data={sidoList} renderItem={renderSido} contentContainerStyle={styles.regionList} />
    </View>
  );
}

const styles = StyleSheet.create({
  tableLeft: {
    flex: 1.3,
    width: '100%',
  },

  tableTitle: {
    width: '100%',
    height: 42,
    borderBottomWidth: 1,
    borderColor: `${COLOR.middleGray}`,
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
