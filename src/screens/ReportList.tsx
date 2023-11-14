import React, { useCallback, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import COLOR from '../constants/colors';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SigunguAndEupmyeondongType } from '../components/SelectRegion/types';
import { DisasterType } from '../components/SelectDisaster/types';
import ReportArticleList from '../components/common/ReportArticle/ReportArticleList/ReportArticleList';
import { HomeStackParamList } from '../navigation/types';
import { NavigationProp } from '@react-navigation/native';
import {
  FilterDisasterBottomSheet,
  FilterRegionBottomSheet,
  AddressBottomSheet,
} from '../components/common/Modal/BottomSheetModal';
import TabBar from '../components/common/TabBar/TabBar';

export interface CustomNavigationOptions extends Partial<NativeStackNavigationOptions> {
  tabBarStyle?: {
    display: string;
  };
}
interface ReportListScreenProps {
  navigation: NavigationProp<HomeStackParamList, 'ReportList'>;
}

export default function ReportList({ navigation }: ReportListScreenProps) {
  const selectAddressModalRef = useRef<BottomSheetModal>(null);
  const filterRegionModalRef = useRef<BottomSheetModal>(null);
  const filterDisasterModalRef = useRef<BottomSheetModal>(null);

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

  const [selectedEupmyeondong, setSelectedEupmyeondong] = useState<SigunguAndEupmyeondongType[]>(
    [],
  );
  const [selectedDisaster, setSelectedDisaster] = useState<DisasterType[]>([]);

  return (
    <View style={styles.layout}>
      <ScrollView style={styles.contentLayout}>
        <TabBar tabList={['전국', '우리동네']} />
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
        </View>

        <ReportArticleList />

        {/* 모달 */}
        <AddressBottomSheet bottomSheetModalRef={selectAddressModalRef} isEditable={false} />
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
      </ScrollView>
      <Pressable style={styles.refresh}>
        <Ionicons name="refresh" size={20} color={COLOR.white} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    position: 'relative',
    height: '100%',
  },
  contentLayout: {
    padding: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  tab: {
    paddingBottom: 10,
    flexDirection: 'row',
    gap: 7,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: `${COLOR.middleGray}`,
  },
  selectedTab: {
    borderBottomWidth: 2,
  },
  selectedTabText: {
    color: `${COLOR.black}`,
  },
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
  refresh: {
    position: 'absolute',
    right: 15,
    bottom: 15,
    backgroundColor: `${COLOR.blue}`,
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
