import React, { useCallback, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SelectRegionBottomSheet } from '../components/BottomSheetModal';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { RootTabParamList } from '../../App';
import COLOR from '../constants/colors';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import { SigunguAndEupmyeondongType } from '../components/SelectRegion/types';
import SelectDisasterBottomSheet from '../components/BottomSheetModal/SelectDisasterBottomSheet';
import { DisasterType } from '../components/SelectDisaster/types';

export type ReportScreenProps = NativeStackScreenProps<RootTabParamList, 'Report'>;

export interface CustomNavigationOptions extends Partial<NativeStackNavigationOptions> {
  tabBarStyle?: {
    display: string;
  };
}

export default function Report({ navigation }: ReportScreenProps) {
  const selectRegionModalRef = useRef<BottomSheetModal>(null);
  const selectDisasterModalRef = useRef<BottomSheetModal>(null);

  const showTabBar = useCallback(() => {
    navigation.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    } as CustomNavigationOptions); // 타입 단언 사용
  }, [navigation]);

  const handlePresentModalPress = useCallback((ref: React.RefObject<BottomSheetModal>) => {
    ref.current?.present();
    showTabBar();
  }, []);

  const [selectedEupmyeondong, setSelectedEupmyeondong] = useState<SigunguAndEupmyeondongType[]>(
    [],
  );
  const [selectedDisaster, setSelectedDisaster] = useState<DisasterType[]>([]);

  return (
    <View>
      <Pressable
        onPress={() => handlePresentModalPress(selectRegionModalRef)}
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
          color={selectedDisaster.length === 0 ? `${COLOR.gray}` : `${COLOR.white}`}
        />
      </Pressable>
      <SelectRegionBottomSheet
        bottomSheetModalRef={selectRegionModalRef}
        navigation={navigation}
        selectedEupmyeondong={selectedEupmyeondong}
        setSelectedEupmyeondong={setSelectedEupmyeondong}
      />

      <Pressable
        onPress={() => handlePresentModalPress(selectDisasterModalRef)}
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

      <SelectDisasterBottomSheet
        bottomSheetModalRef={selectDisasterModalRef}
        navigation={navigation}
        selectedDisaster={selectedDisaster}
        setSelectedDisaster={setSelectedDisaster}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
