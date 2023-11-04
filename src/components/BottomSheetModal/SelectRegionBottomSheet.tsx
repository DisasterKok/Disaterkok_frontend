import React, { RefObject, useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View, FlatList } from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import COLOR from '../../constants/colors';
import { fetchSidoInfo } from '../../apis/fetchSidoInfo';
import { fetchSigunguInfo } from '../../apis/fetchSigunguInfo';
import { fetchEupmyeondongInfo } from '../../apis/fetchEupmyeondong';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { ReportScreenProps } from '../../pages/Report';

type SelectRegionBottomSheetProps = {
  bottomSheetModalRef: RefObject<BottomSheetModal>;
};

type SidoType = {
  id: number;
  name: string;
};

type SigunguAndEupmyeondongType = {
  id: number;
  fullName: string;
  singleName: string;
};

export default function NaturalDisasterBottomSheet({
  bottomSheetModalRef,
  navigation,
}: SelectRegionBottomSheetProps & ReportScreenProps) {
  const snapPoints = useMemo(() => ['25%', '65%'], []);

  const showTabBar = useCallback(() => {
    navigation.setOptions({
      tabBarStyle: {
        display: 'flex',
      },
    });
  }, [navigation]);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      showTabBar();
    }
  }, []);

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

  const [selectedSido, setSelectedSido] = useState(0);
  const [selectedSigungu, setSelectedSigungu] = useState(0);
  const [selectedEupmyeondong, setSelectedEupmyeondong] = useState(0);

  const handleSidoItemClick = ({ item }: { item: SidoType }) => {
    if (item.id === selectedSido) {
      setSelectedSido(0);
      setSelectedSigungu(0);
      setSelectedEupmyeondong(0);
      setSigunguList([]);
      setEupmyeondongList([]);
    } else {
      setSelectedSido(item.id);
      setSelectedEupmyeondong(0);
      setEupmyeondongList([]);
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
    }
  };

  const handleSigunguItemClick = ({ item }: { item: SigunguAndEupmyeondongType }) => {
    if (item.id === selectedSigungu) {
      setSelectedSigungu(0);
      setSelectedEupmyeondong(0);
      setEupmyeondongList([]);
    } else {
      setSelectedSigungu(item.id);
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
    }
  };

  const handleEupmyeondongItemClick = ({ item }: { item: SigunguAndEupmyeondongType }) => {
    setSelectedEupmyeondong(item.id === selectedEupmyeondong ? 0 : item.id);
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

  const renderEupmyeondong = ({ item }: { item: SigunguAndEupmyeondongType }) => {
    return (
      <Pressable style={styles.regionItem} onPress={() => handleEupmyeondongItemClick({ item })}>
        <View style={styles.eupmyeondongItem}>
          <Text
            style={
              selectedEupmyeondong == item.id
                ? StyleSheet.compose(styles.regionItemtext, styles.selectedEupmyeondongText)
                : styles.regionItemtext
            }
          >
            {item.singleName}
          </Text>
          {item.id === selectedEupmyeondong && (
            <FeatherIcon name="check" size={18} style={styles.check} />
          )}
        </View>
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
      onChange={handleSheetChanges}
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
    marginBottom: 20,
  },
  tableLayout: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    borderTopWidth: 1,
    borderColor: `${COLOR.middleGray}`,
    paddingBottom: 40,
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
    width: '100%',
  },

  tableCenter: {
    flex: 2,
    width: '100%',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: `${COLOR.middleGray}`,
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
  selectedSido: {
    backgroundColor: `${COLOR.blue}`,
  },
  selectedSidoText: {
    color: `${COLOR.white}`,
  },
  selectedSigungu: {
    backgroundColor: `${COLOR.lightBlue}`,
  },
  selectedSigunguText: {
    color: `${COLOR.white}`,
  },
  selectedEupmyeondongText: {
    color: `${COLOR.blue}`,
  },
});
