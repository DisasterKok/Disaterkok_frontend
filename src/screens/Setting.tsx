import React, { useCallback, useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Platform } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FaIcon from 'react-native-vector-icons/FontAwesome';

import COLOR from '../constants/colors';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { HomeStackParamList } from '../navigation/types';
import TabBar from '../components/common/TabBar/TabBar';
import useTabBar from '../hooks/useTabBar';
import NotificationContentBottomSheet from '../components/Settings/NotificationContent/NotificationContentBottomSheet';

export interface CustomNavigationOptions extends Partial<NativeStackNavigationOptions> {
  tabBarStyle?: {
    display: string;
  };
}

export default function Setting() {
  const notiModalRef = useRef<BottomSheetModal>(null);

  const navigation: NavigationProp<HomeStackParamList, 'Setting'> = useNavigation();

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

  const { selectedTab, handleTabPress } = useTabBar({ tabList: ['전체', '전국', '우리동네'] });

  return (
    <ScrollView style={styles.layout}>
      <TabBar
        tabList={['전체', '전국', '우리동네']}
        selectedTab={selectedTab}
        handleTabPress={handleTabPress}
      />
      <View style={styles.cautionContainer}>
        <FeatherIcon name="info" size={12} color={COLOR.gray} />
        <Text style={styles.cautionText}>알림 내역은 30일 후, 자동 삭제 돼요</Text>
      </View>

      <View style={styles.notiLayout}>
        <View style={styles.notiWrapper}>
          <View style={styles.notiWrapperTop}>
            <Text style={styles.notiWDate}>2023-12-13</Text>
            <Text style={styles.allRead}>다 읽음</Text>
          </View>
          <View style={styles.notiContainer}>
            <View style={styles.notiTitleContainer}>
              <View style={styles.notiTitleContainerLeft}>
                <View style={styles.nationwideNotiCircle} />
                <Text style={styles.notiCatecoryText}>전국 재난 알림</Text>
              </View>
              <Text style={styles.notiTime}>오전 09:30</Text>
            </View>
            <View style={styles.notiContent}>
              <Text style={styles.notiContentText}>
                현재 성북구 지역에서는 강한 폭풍우로 인해 피해가 발생하고 있습니다. 모든 주민은
                안전한 장소로 이동하시고, 긴급 대피소를 이용해 주세요. 자세한 안내는 지역 방송 및
                관할 당국의 지시를 따라 주시기 바랍니다.
              </Text>
              <FaIcon
                name="angle-down"
                size={20}
                color={COLOR.middleGray}
                onPress={() => handlePresentModalPress(notiModalRef)}
              />
            </View>
          </View>
          <View style={styles.notiContainer}>
            <View style={styles.notiTitleContainer}>
              <View style={styles.notiTitleContainerLeft}>
                <View style={styles.hometownNotiCircle} />
                <Text style={styles.notiCatecoryText}>우리동네 재난 알림</Text>
              </View>
              <Text style={styles.notiTime}>오후 15:31</Text>
            </View>
            <View style={styles.notiContent}>
              <Text style={styles.notiContentText}>
                현재 지하철 파업으로 인해 4호선이 지연되고 있습니다.
              </Text>
              <FaIcon
                name="angle-down"
                size={20}
                color={COLOR.middleGray}
                onPress={() => handlePresentModalPress(notiModalRef)}
              />
            </View>
          </View>
          <View style={styles.notiContainer}>
            <View style={styles.notiTitleContainer}>
              <View style={styles.notiTitleContainerLeft}>
                <View style={styles.nationwideNotiCircle} />
                <Text style={styles.notiCatecoryText}>전국 재난 알림</Text>
              </View>
              <Text style={styles.notiTime}>오후 20:15</Text>
            </View>
            <View style={styles.notiContent}>
              <Text style={styles.notiContentText}>
                전주 지역에서 현재 지진이 발생하였습니다. 안전한 곳으로 빠르게 대피하시고, 가스 및
                전기 차단, 낙하물 주의 등 안전 조치를 취해주세요. 긴급 대피소로 대피해주세요
              </Text>
              <FaIcon
                name="angle-down"
                size={20}
                color={COLOR.middleGray}
                onPress={() => handlePresentModalPress(notiModalRef)}
              />
            </View>
          </View>
        </View>

        <View style={styles.notiWrapper}>
          <View style={styles.notiWrapperTop}>
            <Text style={styles.notiWDate}>2023-12-12</Text>
            <Text style={styles.allRead}>다 읽음</Text>
          </View>
          <View style={styles.notiContainer}>
            <View style={styles.notiTitleContainer}>
              <View style={styles.notiTitleContainerLeft}>
                <View style={styles.nationwideNotiCircle} />
                <Text style={styles.notiCatecoryText}>전국 재난 알림</Text>
              </View>
              <Text style={styles.notiTime}>오전 09:30</Text>
            </View>
            <View style={styles.notiContent}>
              <Text style={styles.notiContentText}>
                현재 중구 지역에서는 강한 폭풍우로 인해 피해가 발생하고 있습니다. 모든 주민은 안전한
                장소로 이동하시고, 긴급 대피소를 이용해 주세요. 자세한 안내는 지역 방송 및 관할
                당국의 지시를 따라 주시기 바랍니다.
              </Text>
              <FaIcon
                name="angle-down"
                size={20}
                color={COLOR.middleGray}
                onPress={() => handlePresentModalPress(notiModalRef)}
              />
            </View>
          </View>
        </View>
      </View>

      {/* 모달 */}
      <NotificationContentBottomSheet bottomSheetModalRef={notiModalRef} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  layout: {
    paddingHorizontal: 15,
    paddingTop: 20,
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
  cautionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: `${COLOR.lightBlue}`,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  cautionText: {
    fontSize: 12,
    color: `${COLOR.gray}`,
  },
  notiLayout: {},
  notiWrapper: {
    gap: 10,
    marginBottom: 50,
  },
  notiWrapperTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  notiWDate: {
    fontSize: 14,
    fontWeight: '600',
  },
  allRead: {
    fontSize: 10,
    color: `${COLOR.blue}`,
  },
  notiContainer: {
    backgroundColor: `${COLOR.white}`,
    borderRadius: 5,
    paddingVertical: 7,
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
  notiTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: `${COLOR.lightGray}`,
    flex: 1,
    padding: 10,
  },
  notiTitleContainerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  nationwideNotiCircle: {
    borderRadius: 50,
    backgroundColor: `${COLOR.notiNationWide}`,
    width: 10,
    height: 10,
  },
  hometownNotiCircle: {
    borderRadius: 50,
    backgroundColor: `${COLOR.notiHomeTown}`,
    width: 10,
    height: 10,
  },
  notiCatecoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  notiTime: {
    fontSize: 10,
    fontWeight: '500',
    color: `${COLOR.gray}`,
  },
  notiContent: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notiContentText: {
    fontSize: 12,
    color: `${COLOR.gray}`,
  },
});
