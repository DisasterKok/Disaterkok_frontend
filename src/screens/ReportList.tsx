import React, { useRef, useState } from 'react';
import { Pressable, StyleSheet, View, ScrollView } from 'react-native';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import COLOR from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SigunguAndEupmyeondongType } from '../components/SelectRegion/types';
import { DisasterType } from '../components/SelectDisaster/types';
import ReportArticleList from '../components/common/ReportArticle/ReportArticleList/ReportArticleList';
import { AddressBottomSheet } from '../components/common/Modal/BottomSheetModal';
import TabBar from '../components/common/TabBar/TabBar';
import useTabBar from '../hooks/useTabBar';
import FilterButtons from '../components/ReportList/FilterButtons';

export default function ReportList() {
  const selectAddressModalRef = useRef<BottomSheetModal>(null);

  const [selectedEupmyeondong, setSelectedEupmyeondong] = useState<SigunguAndEupmyeondongType[]>(
    [],
  );
  const [selectedDisaster, setSelectedDisaster] = useState<DisasterType[]>([]);

  const { selectedTab, handleTabPress } = useTabBar({ tabList: ['전국', '우리동네'] });
  return (
    <View style={styles.layout}>
      <ScrollView style={styles.contentLayout}>
        <TabBar
          tabList={['전국', '우리동네']}
          selectedTab={selectedTab}
          handleTabPress={handleTabPress}
        />
        <FilterButtons
          selectedEupmyeondong={selectedEupmyeondong}
          setSelectedEupmyeondong={setSelectedEupmyeondong}
          selectedDisaster={selectedDisaster}
          setSelectedDisaster={setSelectedDisaster}
        />

        <ReportArticleList />

        {/* 모달 */}
        <AddressBottomSheet bottomSheetModalRef={selectAddressModalRef} isEditable={false} />
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
