import React, { RefObject, useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View, FlatList } from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import COLOR from '../../constants/colors';
import { fetchSidoInfo } from '../../apis/fetchSidoInfo';
import { fetchSigunguInfo } from '../../apis/fetchSigunguInfo';
import { fetchEupmyeondongInfo } from '../../apis/fetchEupmyeondong';

type SelectRegionBottomSheetProps = {
  bottomSheetModalRef: RefObject<BottomSheetModal>;
};

type SidoType = {
  id: number;
  name: string;
};

type SigunguType = {
  id: number;
  fullName: string;
  singleName: string;
};

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
  const [eupmyeondongList, setEupmyeondongList] = useState([]);

  const [leftSelectedItem, setLeftSelectedItem] = useState(0);

  const handleSidoItemClick = ({ item }: { item: SidoType }) => {
    // setLeftSelectedItem(item.id === leftSelectedItem ? 0 : item.id);
    fetchSigunguInfo(item.name)
      .then((data) => {
        const sigunguListFormatted = data.features.map((feature) => ({
          id: feature.properties.sig_cd,
          fullName: feature.properties.full_nm,
          singleName: feature.properties.sig_kor_nm,
        }));
        setSigunguList(sigunguListFormatted);
      })
      .catch((error) => console.log(error));
  };

  const handleSigunguItemClick = ({ item }: { item: SigunguType }) => {
    // setLeftSelectedItem(item.id === leftSelectedItem ? 0 : item.id);
    fetchEupmyeondongInfo(item.fullName)
      .then((data) => {
        const eupmyeondongListFormatted = data.features.map((feature) => ({
          id: feature.properties.emd_cd,
          fullName: feature.properties.full_nm,
          singleName: feature.properties.emd_kor_nm,
        }));
        setEupmyeondongList(eupmyeondongListFormatted);
      })
      .catch((error) => console.log(error));
  };

  const renderSido = ({ item }: { item: SidoType }) => {
    return (
      <Pressable style={styles.regionItem} onPress={() => handleSidoItemClick({ item })}>
        <Text style={styles.regionItemtext}>{item.name}</Text>
      </Pressable>
    );
  };

  const renderSigungu = ({ item }: { item: SigunguType }) => {
    return (
      <Pressable style={styles.regionItem} onPress={() => handleSigunguItemClick({ item })}>
        <Text style={styles.regionItemtext}>{item.singleName}</Text>
      </Pressable>
    );
  };

  const renderEupmyeondong = ({ item }: { item: SigunguType }) => {
    return (
      <Pressable style={styles.regionItem} onPress={() => handleSigunguItemClick({ item })}>
        <Text style={styles.regionItemtext}>{item.singleName}</Text>
      </Pressable>
    );
  };

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
          data={eupmyeondongList}
          renderItem={renderEupmyeondong}
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
