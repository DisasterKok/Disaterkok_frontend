import React, { RefObject, useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View, FlatList } from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import COLOR from '../../constants/colors';
import { fetchSidoInfo } from '../../apis/fetchSidoInfo';
import { fetchSigunguInfo } from '../../apis/fetchSigunguInfo';

type SelectRegionBottomSheetProps = {
  bottomSheetModalRef: RefObject<BottomSheetModal>;
};

type SelectRegionType = {
  id: number;
  name: string;
};

const SELECT_REGION: SelectRegionType[] = [
  { id: 1, name: '서울' },
  { id: 2, name: '경기' },
  { id: 3, name: '인천' },
  { id: 4, name: '대전' },
  { id: 5, name: '강원' },
  { id: 6, name: '세종' },
  { id: 7, name: '낙뢰/뇌우' },
  { id: 8, name: '황사/미세먼지' },
  { id: 9, name: '한파' },
  { id: 10, name: '강풍' },
  { id: 11, name: '가뭄' },
  { id: 12, name: '산불' },
  { id: 13, name: '폭염' },
];

export default function NaturalDisasterBottomSheet({
  bottomSheetModalRef,
}: SelectRegionBottomSheetProps) {
  const snapPoints = useMemo(() => ['25%', '65%'], []);

  const handleCloseModalPress = useCallback((ref: React.RefObject<BottomSheetModal>) => {
    ref.current?.close();
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} pressBehavior="close" />,
    [],
  );

  const [sidoList, setSidoList] = useState([]);
  const [sigunguList, setSigunguList] = useState([]);

  const [leftSelectedItem, setLeftSelectedItem] = useState(0);

  const handleLeftItemClick = ({ item }: { item: SelectRegionType }) => {
    // setLeftSelectedItem(item.id === leftSelectedItem ? 0 : item.id);

    fetchSigunguInfo(item.name)
      .then((data) => {
        const sigunguListFormatted = data.features.map((feature) => ({
          id: feature.properties.sig_cd,
          name: feature.properties.sig_kor_nm,
        }));
        setSigunguList(sigunguListFormatted);
      })
      .catch((error) => console.log(error));
  };

  const renderSido = ({ item }: { item: SelectRegionType }) => {
    return (
      <Pressable style={styles.regionItem} onPress={() => handleLeftItemClick({ item })}>
        <Text style={styles.regionItemtext}>{item.name}</Text>
      </Pressable>
    );
  };

  const renderSigungu = ({ item }: { item: SelectRegionType }) => {
    return (
      <Pressable style={styles.regionItem} onPress={() => handleLeftItemClick({ item })}>
        <Text style={styles.regionItemtext}>{item.name}</Text>
      </Pressable>
    );
  };

  const renderItem = ({ item }: { item: SelectRegionType }) => (
    <Pressable
      style={
        leftSelectedItem == item.id
          ? StyleSheet.compose(styles.regionItem, styles.selectedLeftRegion)
          : styles.regionItem
      }
      onPress={() => handleLeftItemClick({ item })}
    >
      <Text
        style={
          leftSelectedItem == item.id
            ? StyleSheet.compose(styles.regionItemtext, styles.selectedLeftRegionText)
            : styles.regionItemtext
        }
      >
        {item.name}
      </Text>
    </Pressable>
  );

  const LeftTable = () => {
    // 왼쪽 테이블 UI 및 핸들러 등 구현
    return (
      <View style={styles.tableLeft}>
        <View style={styles.tableTitle}>
          <Text>시,도</Text>
        </View>
        <FlatList
          data={sidoList}
          renderItem={renderSido}
          numColumns={1}
          contentContainerStyle={styles.regionList}
        />
      </View>
    );
  };

  const CenterComponent = () => {
    // 왼쪽 테이블 UI 및 핸들러 등 구현
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
  };

  const RightTable = () => {
    // 왼쪽 테이블 UI 및 핸들러 등 구현
    return (
      <View style={styles.tableRight}>
        <View style={styles.tableTitle}>
          <Text>동,읍,면</Text>
        </View>
        <FlatList
          data={SELECT_REGION}
          renderItem={renderItem}
          numColumns={1}
          contentContainerStyle={styles.regionList}
        />
      </View>
    );
  };

  useEffect(() => {
    fetchSidoInfo()
      .then((data) => {
        const sidoListFormatted = data.features.map((feature) => ({
          id: feature.properties.ctprvn_cd,
          name: feature.properties.ctp_kor_nm,
        }));
        setSidoList(sidoListFormatted);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={1}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: `${COLOR.whiteBackground}` }}
    >
      <View style={styles.modalContainer}>
        <Text style={styles.title}>지역 선택</Text>
        <View style={styles.tableLayout}>
          <LeftTable />
          <CenterComponent />
          <RightTable />
        </View>
      </View>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tableLayout: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    borderTopWidth: 1,
    borderColor: `${COLOR.middleGray}`,
  },
  tableTitle: {
    width: '100%',
    height: 42,
    borderBottomWidth: 1,
    borderColor: `${COLOR.middleGray}`,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tableLeft: {
    flex: 1.3,
  },

  tableCenter: {
    flex: 2,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: `${COLOR.middleGray}`,
  },
  tableRight: {
    flex: 2,
  },
  regionList: {
    flex: 1,
    alignItems: 'center',
  },
  regionItem: {
    width: '100%',
    height: 34,
    justifyContent: 'center',
  },
  regionItemtext: {
    fontSize: 12,
    color: `${COLOR.gray}`,
  },
  selectedLeftRegion: {
    backgroundColor: `${COLOR.blue}`, // 클릭 시 배경색 변경
  },
  selectedLeftRegionText: {
    color: `${COLOR.white}`,
  },
});
