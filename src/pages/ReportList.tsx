import React, { useCallback, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native';
import { SelectRegionBottomSheet } from '../components/BottomSheetModal';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import COLOR from '../constants/colors';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SigunguAndEupmyeondongType } from '../components/SelectRegion/types';
import SelectDisasterBottomSheet from '../components/BottomSheetModal/SelectDisasterBottomSheet';
import { DisasterType } from '../components/SelectDisaster/types';
import ReportArticleList from '../components/ReportArticle/ReportArticleList';
import AddressBottomSheet from '../components/Home/AddressSetting/AddressBottomSheet';

export interface CustomNavigationOptions extends Partial<NativeStackNavigationOptions> {
  tabBarStyle?: {
    display: string;
  };
}

export default function ReportList({ navigation }) {
  const selectAddressModalRef = useRef<BottomSheetModal>(null);
  const selectRegionModalRef = useRef<BottomSheetModal>(null);
  const selectDisasterModalRef = useRef<BottomSheetModal>(null);

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

  const [selectedTab, setSelectedTab] = useState('전국');
  const [selectedEupmyeondong, setSelectedEupmyeondong] = useState<SigunguAndEupmyeondongType[]>(
    [],
  );
  const [selectedDisaster, setSelectedDisaster] = useState<DisasterType[]>([]);

  const handleTabPress = (tabName: string) => {
    setSelectedTab(tabName);
  };

  return (
    <View style={styles.layout}>
      <ScrollView style={styles.contentLayout}>
        <View style={styles.tabContainer}>
          <Pressable
            style={
              selectedTab === '전국'
                ? StyleSheet.compose(styles.tab, styles.selectedTab)
                : styles.tab
            }
            onPress={() => handleTabPress('전국')}
          >
            <Text
              style={
                selectedTab === '전국'
                  ? StyleSheet.compose(styles.tabText, styles.selectedTabText)
                  : styles.tabText
              }
            >
              전국
            </Text>
          </Pressable>
          <Pressable
            style={
              selectedTab === '우리동네'
                ? StyleSheet.compose(styles.tab, styles.selectedTab)
                : styles.tab
            }
            onPress={() => handleTabPress('우리동네')}
          >
            <Text
              style={
                selectedTab === '우리동네'
                  ? StyleSheet.compose(styles.tabText, styles.selectedTabText)
                  : styles.tabText
              }
            >
              우리동네
            </Text>
            {selectedTab === '우리동네' && (
              <FaIcon
                name="angle-down"
                size={15}
                color={COLOR.black}
                onPress={() => handlePresentModalPress(selectAddressModalRef)}
              />
            )}
          </Pressable>
        </View>
        <View style={styles.filterButtonContainer}>
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
        </View>

        <ReportArticleList />

        {/* 모달 */}
        <AddressBottomSheet bottomSheetModalRef={selectAddressModalRef} isEditable={false} />
        <SelectRegionBottomSheet
          bottomSheetModalRef={selectRegionModalRef}
          navigation={navigation}
          selectedEupmyeondong={selectedEupmyeondong}
          setSelectedEupmyeondong={setSelectedEupmyeondong}
        />
        <SelectDisasterBottomSheet
          bottomSheetModalRef={selectDisasterModalRef}
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
