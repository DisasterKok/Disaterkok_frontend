import React, { useCallback, useRef } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import COLOR from '../../../constants/colors';
import { View, Text } from 'react-native';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { SigunguAndEupmyeondongType } from '../FilterRegion/SelectRegion/types';
import { DisasterType } from '../FilterDisaster/SelectDisaster/types';
import { HomeStackParamList } from '../../../navigation/types';
import { FilterDisasterBottomSheet, FilterRegionBottomSheet } from '../index';

export interface CustomNavigationOptions extends Partial<NativeStackNavigationOptions> {
  tabBarStyle?: {
    display: string;
  };
}

interface FilterButtonsProps {
  selectedEupmyeondong: SigunguAndEupmyeondongType[];
  setSelectedEupmyeondong: React.Dispatch<React.SetStateAction<SigunguAndEupmyeondongType[]>>;
  selectedDisaster: DisasterType[];
  setSelectedDisaster: React.Dispatch<React.SetStateAction<DisasterType[]>>;
}

export default function FilterButtons({
  selectedEupmyeondong,
  setSelectedEupmyeondong,
  selectedDisaster,
  setSelectedDisaster,
}: FilterButtonsProps) {
  const filterRegionModalRef = useRef<BottomSheetModal>(null);
  const filterDisasterModalRef = useRef<BottomSheetModal>(null);

  const navigation: NavigationProp<HomeStackParamList, 'ReportList'> = useNavigation();

  const showTabBar = useCallback(() => {
    navigation.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    } as CustomNavigationOptions);
  }, [navigation]);

  const handlePresentModalPress = useCallback((ref: React.RefObject<BottomSheetModal>) => {
    ref.current?.present();
    showTabBar();
  }, []);
  return (
    <View style={styles.filterButtonContainer}>
      <Pressable
        onPress={() => handlePresentModalPress(filterRegionModalRef)}
        style={
          selectedEupmyeondong.length === 0
            ? styles.regionSelect
            : StyleSheet.compose(styles.regionSelect, styles.regionSelectActive)
        }
      >
        <Text
          style={
            selectedEupmyeondong.length === 0
              ? styles.regionSelectText
              : StyleSheet.compose(styles.regionSelectText, styles.regionSelectTextActive)
          }
        >
          지역
        </Text>
        <FaIcon
          name="angle-down"
          size={20}
          color={selectedEupmyeondong.length === 0 ? `${COLOR.gray}` : `${COLOR.white}`}
        />
      </Pressable>

      <Pressable
        onPress={() => handlePresentModalPress(filterDisasterModalRef)}
        style={
          selectedDisaster.length === 0
            ? styles.regionSelect
            : StyleSheet.compose(styles.regionSelect, styles.regionSelectActive)
        }
      >
        <Text
          style={
            selectedDisaster.length === 0
              ? styles.regionSelectText
              : StyleSheet.compose(styles.regionSelectText, styles.regionSelectTextActive)
          }
        >
          재난
        </Text>
        <FaIcon
          name="angle-down"
          size={20}
          color={selectedDisaster.length === 0 ? `${COLOR.gray}` : `${COLOR.white}`}
        />
      </Pressable>

      {/* 모달 */}
      <FilterRegionBottomSheet
        bottomSheetModalRef={filterRegionModalRef}
        navigation={navigation}
        selectedEupmyeondong={selectedEupmyeondong}
        setSelectedEupmyeondong={setSelectedEupmyeondong}
      />
      <FilterDisasterBottomSheet
        bottomSheetModalRef={filterDisasterModalRef}
        navigation={navigation}
        selectedDisaster={selectedDisaster}
        setSelectedDisaster={setSelectedDisaster}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  filterButtonContainer: {
    flexDirection: 'row',
    gap: 5,
    marginBottom: 20,
  },
  regionSelect: {
    borderWidth: 1,
    borderColor: `${COLOR.gray}`,
    borderRadius: 20,
    width: 70,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 5,
    paddingHorizontal: 10,
  },
  regionSelectActive: {
    backgroundColor: `${COLOR.blue}`,
    borderWidth: 0,
  },
  regionSelectText: {
    fontSize: 12,
    color: `${COLOR.gray}`,
  },
  regionSelectTextActive: {
    color: `${COLOR.white}`,
  },
});
