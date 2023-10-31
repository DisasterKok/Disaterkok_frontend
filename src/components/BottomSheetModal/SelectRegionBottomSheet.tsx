import React, { RefObject, useCallback, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View, FlatList } from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import COLOR from '../../constants/colors';

type SelectRegionBottomSheetProps = {
  bottomSheetModalRef: RefObject<BottomSheetModal>;
};

type SelectRegionType = {
  id: number;
  text: string;
};

const SELECT_REGION: SelectRegionType[] = [
  { id: 1, text: '서울' },
  { id: 2, text: '경기' },
  { id: 3, text: '인천' },
  { id: 4, text: '대전' },
  { id: 5, text: '강원' },
  { id: 6, text: '세종' },
  { id: 7, text: '낙뢰/뇌우' },
  { id: 8, text: '황사/미세먼지' },
  { id: 9, text: '한파' },
  { id: 10, text: '강풍' },
  { id: 11, text: '가뭄' },
  { id: 12, text: '산불' },
  { id: 13, text: '폭염' },
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

  const [leftSelectedItem, setLeftSelectedItem] = useState('');
  const [centerData, setCenterData] = useState([]);

  const handleLeftItemClick = (item: string) => {
    setLeftSelectedItem(item);
  };

  const renderItem = ({ item }: { item: SelectRegionType }) => (
    <Pressable style={styles.regionItem}>
      <Text style={styles.regionItemtext}>{item.text}</Text>
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
          data={SELECT_REGION}
          renderItem={renderItem}
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
          data={SELECT_REGION}
          renderItem={renderItem}
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

  regionList: {
    alignItems: 'center',
    gap: 3,
  },

  tableLeft: {
    flex: 1,
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
  regionItem: {
    height: 34,
    justifyContent: 'center',
  },
  regionItemtext: {
    fontSize: 12,
    color: `${COLOR.gray}`,
  },
});
