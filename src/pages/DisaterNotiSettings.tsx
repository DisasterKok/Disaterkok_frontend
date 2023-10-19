import React, { useCallback, useRef } from 'react';
import { Pressable, StyleSheet, Text, View, Platform, Image } from 'react-native';
import COLOR from '../constants/colors';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LocalDisasterBottomSheet from '../components/BottomSheetModal/LocalDisasterBottomSheet';
import SocialDisasterBottomSheet from '../components/BottomSheetModal/SocialDisasterBottomSheet';

export default function DisaterNotiSettings() {
  const localDisasterModalRef = useRef<BottomSheetModal>(null);
  const socialDisasterModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback((ref: React.RefObject<BottomSheetModal>) => {
    ref.current?.present();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View style={styles.layout}>
          <View style={styles.titleContainer}>
            <View style={styles.title}>
              <Text style={styles.titleText}>알림 받고 싶은</Text>
              <Text style={styles.titleText}>재난 종류를 선택해주세요</Text>
            </View>
            <View style={styles.subTitle}>
              <Text style={styles.subTitleText}>이후 설정에서 편집할 수 있으며,</Text>
              <Text style={styles.subTitleText}>
                재난 알림을 받고 싶지 않은 경우 건너뛰기를 할 수 있어요
              </Text>
            </View>
          </View>
          <View style={styles.tabContainer}>
            <Pressable
              style={styles.tab}
              onPress={() => handlePresentModalPress(localDisasterModalRef)}
            >
              <Text style={styles.tabText}>자연재난</Text>
              <Image source={require('../assets/images/chevron-down.png')} />
              <LocalDisasterBottomSheet bottomSheetModalRef={localDisasterModalRef} />
            </Pressable>
            <Pressable
              style={styles.tab}
              onPress={() => handlePresentModalPress(socialDisasterModalRef)}
            >
              <Text style={styles.tabText}>사회재난</Text>
              <Image source={require('../assets/images/chevron-down.png')} />
              <SocialDisasterBottomSheet bottomSheetModalRef={socialDisasterModalRef} />
            </Pressable>
          </View>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  layout: {
    paddingTop: 70,
  },
  titleContainer: { gap: 7, marginBottom: 30, paddingLeft: 30 },
  title: {},
  titleText: { fontSize: 18 },
  subTitle: {},
  subTitleText: { fontSize: 12, color: `${COLOR.gray}` },
  tabContainer: { gap: 20, alignItems: 'center' },
  tab: {
    width: '90%',
    height: 52,
    borderWidth: 1,
    borderColor: `${COLOR.middleGray}`,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    ...Platform.select({
      ios: {
        shadowColor: `${COLOR.black}`,
        shadowOpacity: 0.25,
        shadowRadius: 5,
        shadowOffset: {
          width: 0,
          height: 2,
        },
      },
      android: {
        elevation: 3,
      },
    }),
  },
  tabText: {},
});
