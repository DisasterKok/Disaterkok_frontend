import React, { useCallback, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SelectRegionBottomSheet } from '../components/BottomSheetModal';

import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { RootTabParamList } from '../../App';
import COLOR from '../constants/colors';
import FaIcon from 'react-native-vector-icons/FontAwesome';

export type ReportScreenProps = NativeStackScreenProps<RootTabParamList, 'Report'>;

export type SigunguAndEupmyeondongType = {
  id: number;
  fullName: string;
  singleName: string;
};

export interface CustomNavigationOptions extends Partial<NativeStackNavigationOptions> {
  tabBarStyle?: {
    display: string;
  };
}

export default function Report({ navigation }: ReportScreenProps) {
  const selectRegionModalRef = useRef<BottomSheetModal>(null);

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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
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
              color={selectedEupmyeondong.length === 0 ? `${COLOR.gray}` : `${COLOR.white}`}
            />
          </Pressable>
          <SelectRegionBottomSheet
            bottomSheetModalRef={selectRegionModalRef}
            navigation={navigation}
            selectedEupmyeondong={selectedEupmyeondong}
            setSelectedEupmyeondong={setSelectedEupmyeondong}
          />
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
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
