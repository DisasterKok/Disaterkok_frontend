import React, { RefObject, useCallback, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View, FlatList, Platform } from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import COLOR from '../../../constants/colors';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { NavigationProp } from '@react-navigation/native';
import { CustomNavigationOptions } from '../../../screens/ReportList';
import MainCategory from '../../SelectDisaster/MainCategory';
import { DisasterCategoryType, DisasterType } from '../../SelectDisaster/types';
import { DISASTER_CATEGORY } from '../../../constants/DummyDisaster';
import SubCategory from '../../SelectDisaster/SubCategory';
import { HomeStackParamList } from '../../../navigation/types';

type SelectDisasterScreenProps = {
  bottomSheetModalRef: RefObject<BottomSheetModal>;
  navigation: NavigationProp<HomeStackParamList, 'ReportList'>;
  selectedDisaster: DisasterType[];
  setSelectedDisaster: React.Dispatch<React.SetStateAction<DisasterType[]>>;
};

export default function FilterDisasterBottomSheet({
  bottomSheetModalRef,
  navigation,
  selectedDisaster,
  setSelectedDisaster,
}: SelectDisasterScreenProps) {
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

  const [disasterList, setDisasterList] = useState<DisasterCategoryType[]>([]);
  const [selectedDisasterCategory, setSelectedDisasterCategory] = useState(0);

  const handleDisasterItemDelete = ({ item }: { item: DisasterType }) => {
    setSelectedDisaster((prev) => prev.filter((prevItem) => prevItem.id !== item.id));
  };

  const renderSelectedDisaster = ({ item }: { item: DisasterType }) => {
    return (
      <Pressable style={styles.selectedRegionItem}>
        <Text style={styles.selectedRegionItemText}>{item.text}</Text>
        <AntIcon
          name="close"
          size={12}
          style={styles.close}
          onPress={() => handleDisasterItemDelete({ item })}
        />
      </Pressable>
    );
  };

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
        <Text style={styles.title}>재난 선택</Text>
        <View style={styles.tableLayout}>
          <MainCategory
            disasterCategory={DISASTER_CATEGORY}
            selectedDisasterCategory={selectedDisasterCategory}
            setSelectedDisasterCategory={setSelectedDisasterCategory}
            setDisasterList={setDisasterList}
          />
          <SubCategory
            selectedDisaster={selectedDisaster}
            setSelectedDisaster={setSelectedDisaster}
            disasterList={disasterList}
          />
        </View>
      </View>
      {selectedDisaster.length !== 0 && (
        <View style={styles.selecetdRegion}>
          <FlatList
            data={selectedDisaster}
            renderItem={renderSelectedDisaster}
            numColumns={1}
            contentContainerStyle={styles.selecetdRegionList}
            horizontal={true}
          />
        </View>
      )}
      <View
        style={
          selectedDisaster.length === 0
            ? styles.resultModal
            : StyleSheet.compose(styles.resultModal, styles.resultModalActive)
        }
      >
        <Pressable
          style={
            selectedDisaster.length === 0
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
