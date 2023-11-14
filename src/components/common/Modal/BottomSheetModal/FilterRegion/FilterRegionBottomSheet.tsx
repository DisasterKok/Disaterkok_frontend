import React, { RefObject, useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View, FlatList, Platform } from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import COLOR from '../../../../../constants/colors';
import { fetchSidoInfo } from '../../../../../apis/fetchRegionAPI/fetchSidoInfo';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { NavigationProp } from '@react-navigation/native';
import { EupmyeondongTable, SidoTable, SigunguTable } from '../../../../SelectRegion';
import { SidoType, SigunguAndEupmyeondongType } from '../../../../SelectRegion/types';
import { CustomNavigationOptions } from '../../../../../screens/ReportList';
import { HomeStackParamList } from '../../../../../navigation/types';

type SelectRegionScreenProps = {
  bottomSheetModalRef: RefObject<BottomSheetModal>;
  navigation: NavigationProp<HomeStackParamList, 'ReportList'>;
  selectedEupmyeondong: SigunguAndEupmyeondongType[];
  setSelectedEupmyeondong: React.Dispatch<React.SetStateAction<SigunguAndEupmyeondongType[]>>;
};

type SidoFeatureType = {
  type: string;
  properties: {
    ctprvn_cd: string;
    ctp_kor_nm: string;
  };
  id: string;
};

export default function FilterRegionBottomSheet({
  bottomSheetModalRef,
  navigation,
  selectedEupmyeondong,
  setSelectedEupmyeondong,
}: SelectRegionScreenProps) {
  const snapPoints = useMemo(() => ['25%', '80%'], []);

  const showTabBar = useCallback(() => {
    navigation.setOptions({
      tabBarStyle: {
        display: 'block',
      },
    } as CustomNavigationOptions);
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

  const [sidoList, setSidoList] = useState<SidoType[]>([]);
  const [sigunguList, setSigunguList] = useState<SigunguAndEupmyeondongType[]>([]);
  const [eupmyeondongList, setEupmyeondongList] = useState<SigunguAndEupmyeondongType[]>([]);

  const [selectedSido, setSelectedSido] = useState(0);
  const [selectedSigungu, setSelectedSigungu] = useState(0);

  const handleEupmyeondongItemDelete = ({ item }: { item: SigunguAndEupmyeondongType }) => {
    setSelectedEupmyeondong((prev) => prev.filter((prevItem) => prevItem.id !== item.id));
  };

  const renderSelectedEupmyeondong = ({ item }: { item: SigunguAndEupmyeondongType }) => {
    return (
      <Pressable style={styles.selectedRegionItem}>
        <Text style={styles.selectedRegionItemText}>{item.singleName}</Text>
        <AntIcon
          name="close"
          size={12}
          style={styles.close}
          onPress={() => handleEupmyeondongItemDelete({ item })}
        />
      </Pressable>
    );
  };

  useEffect(() => {
    fetchSidoInfo()
      .then((data) => {
        const sidoListFormatted = data.features.map((feature: SidoFeatureType) => ({
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
          <SidoTable
            sidoList={sidoList}
            setSidoList={setSidoList}
            setSigunguList={setSigunguList}
            setEupmyeondongList={setEupmyeondongList}
            selectedSido={selectedSido}
            setSelectedSido={setSelectedSido}
            setSelectedSigungu={setSelectedSigungu}
          />
          <SigunguTable
            sigunguList={sigunguList}
            setEupmyeondongList={setEupmyeondongList}
            selectedSigungu={selectedSigungu}
            setSelectedSigungu={setSelectedSigungu}
          />
          <EupmyeondongTable
            setSelectedEupmyeondong={setSelectedEupmyeondong}
            selectedEupmyeondong={selectedEupmyeondong}
            eupmyeondongList={eupmyeondongList}
          />
        </View>
      </View>
      {selectedEupmyeondong.length !== 0 && (
        <View style={styles.selecetdRegion}>
          <FlatList
            data={selectedEupmyeondong}
            renderItem={renderSelectedEupmyeondong}
            numColumns={1}
            contentContainerStyle={styles.selecetdRegionList}
            horizontal={true}
          />
        </View>
      )}
      <View
        style={
          selectedEupmyeondong.length === 0
            ? styles.resultModal
            : StyleSheet.compose(styles.resultModal, styles.resultModalActive)
        }
      >
        <Pressable
          style={
            selectedEupmyeondong.length === 0
              ? styles.completeButton
              : StyleSheet.compose(styles.completeButton, styles.completeButtonActive)
          }
          onPress={() => handleCloseModalPress(bottomSheetModalRef)}
        >
          <Text style={styles.completeButtonText}>완료</Text>
        </Pressable>
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
    borderColor: `${COLOR.lightGray}`,
    paddingBottom: 40,
  },
  resultModal: {
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${COLOR.white}`,
    ...Platform.select({
      ios: {
        shadowColor: `${COLOR.black}`,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: {
          width: 0,
          height: 1,
        },
      },
      android: {
        elevation: 3,
      },
    }),
  },

  resultModalActive: {
    shadowColor: 'transparent',
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },

  completeButton: {
    width: '90%',
    height: 50,
    backgroundColor: `${COLOR.lightGray}`,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeButtonActive: { backgroundColor: `${COLOR.blue}` },
  completeButtonText: { color: `${COLOR.white}` },
  selecetdRegion: {
    height: 56,
    backgroundColor: `${COLOR.white}`,
    justifyContent: 'center',
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderColor: `${COLOR.lightGray}`,
    ...Platform.select({
      ios: {
        shadowColor: `${COLOR.black}`,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: {
          width: 0,
          height: 1,
        },
      },
      android: {
        elevation: 3,
      },
    }),
  },
  selecetdRegionList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  selectedRegionItem: {
    backgroundColor: `${COLOR.lightGray}`,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    gap: 4,
    borderRadius: 5,
  },
  selectedRegionItemText: {
    fontSize: 10,
    color: `${COLOR.gray}`,
  },
  close: {
    color: `${COLOR.gray}`,
  },
});
