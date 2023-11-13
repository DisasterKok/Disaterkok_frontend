import React, { useCallback, useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Platform } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FaIcon from 'react-native-vector-icons/FontAwesome';

import COLOR from '../constants/colors';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { HomeStackParamList } from '../navigation/types';
import { NotiContentBottomSheet } from '../components/BottomSheetModal';

export interface CustomNavigationOptions extends Partial<NativeStackNavigationOptions> {
  tabBarStyle?: {
    display: string;
  };
}

export default function Setting() {
  const [selectedTab, setSelectedTab] = useState('전체');

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

  const handleTabPress = (tabName: string) => {
    setSelectedTab(tabName);
  };

  return (
    <ScrollView style={styles.layout}>
      <View style={styles.tabContainer}>
        <Pressable
          style={
            selectedTab === '전체' ? StyleSheet.compose(styles.tab, styles.selectedTab) : styles.tab
          }
          onPress={() => handleTabPress('전체')}
        >
          <Text
            style={
              selectedTab === '전체'
                ? StyleSheet.compose(styles.tabText, styles.selectedTabText)
                : styles.tabText
            }
          >
            전체
          </Text>
        </Pressable>
        <Pressable
          style={
            selectedTab === '전국' ? StyleSheet.compose(styles.tab, styles.selectedTab) : styles.tab
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
        </Pressable>
      </View>

      <View style={styles.cautionContainer}>
        <FeatherIcon name="info" size={12} color={COLOR.gray} />
        <Text style={styles.cautionText}>알림 내역은 30일 후, 자동 삭제 돼요</Text>
      </View>

      <View style={styles.notiLayout}>
        <View style={styles.notiWrapper}>
          <View style={styles.notiWrapperTop}>
            <Text style={styles.notiWDate}>2023-09-27</Text>
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
              <Text style={styles.notiContentText}>재난내용에 대한 것 재난 내용에 대한 것</Text>
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
              <Text style={styles.notiTime}>오전 09:30</Text>
            </View>
            <View style={styles.notiContent}>
              <Text style={styles.notiContentText}>재난내용에 대한 것 재난 내용에 대한 것</Text>
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
              <Text style={styles.notiTime}>오전 09:30</Text>
            </View>
            <View style={styles.notiContent}>
              <Text style={styles.notiContentText}>재난내용에 대한 것 재난 내용에 대한 것</Text>
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
            <Text style={styles.notiWDate}>2023-09-27</Text>
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
              <Text style={styles.notiContentText}>재난내용에 대한 것 재난 내용에 대한 것</Text>
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
      <NotiContentBottomSheet bottomSheetModalRef={notiModalRef} />
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
