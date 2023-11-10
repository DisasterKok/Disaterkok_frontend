import React, { useCallback, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View, Platform } from 'react-native';
import COLOR from '../constants/colors';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  NaturalDisasterBottomSheet,
  SocialDisasterBottomSheet,
} from '../components/BottomSheetModal';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LoggedOutStackParamList } from '../navigation/types';

type DstrNotiSetScreenProps = NativeStackScreenProps<
  LoggedOutStackParamList,
  'DisasterNotiSettings'
>;

export default function DisasterNotiSettings({ navigation }: DstrNotiSetScreenProps) {
  const naturalDisasterModalRef = useRef<BottomSheetModal>(null);
  const socialDisasterModalRef = useRef<BottomSheetModal>(null);

  const [naturalSelectedTags, naturalSetSelectedTags] = useState<number[]>([]);
  const [soicalSelectedTags, soicalSetSelectedTags] = useState<number[]>([]);

  const handlePresentModalPress = useCallback((ref: React.RefObject<BottomSheetModal>) => {
    ref.current?.present();
  }, []);

  const onSubmit = () => {
    navigation.navigate('CompleteLogin');
  };
  return (
    <View style={styles.layout}>
      <View style={styles.topContainer}>
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
            style={
              !naturalSelectedTags.length
                ? styles.tab
                : StyleSheet.compose(styles.tab, styles.tabActive)
            }
            onPress={() => handlePresentModalPress(naturalDisasterModalRef)}
          >
            <Text
              style={
                !naturalSelectedTags.length
                  ? styles.tabText
                  : StyleSheet.compose(styles.tabText, styles.tabTextActive)
              }
            >
              자연재난
            </Text>
            <Icon
              name="angle-down"
              size={25}
              color={!naturalSelectedTags.length ? 'gray' : 'white'}
            />
          </Pressable>
          <NaturalDisasterBottomSheet
            bottomSheetModalRef={naturalDisasterModalRef}
            selectedTags={naturalSelectedTags}
            setSelectedTags={naturalSetSelectedTags}
          />
          <Pressable
            style={
              !soicalSelectedTags.length
                ? styles.tab
                : StyleSheet.compose(styles.tab, styles.tabActive)
            }
            onPress={() => handlePresentModalPress(socialDisasterModalRef)}
          >
            <Text
              style={
                !soicalSelectedTags.length
                  ? styles.tabText
                  : StyleSheet.compose(styles.tabText, styles.tabTextActive)
              }
            >
              사회재난
            </Text>
            <Icon
              name="angle-down"
              size={25}
              color={!soicalSelectedTags.length ? 'gray' : 'white'}
            />

            <SocialDisasterBottomSheet
              bottomSheetModalRef={socialDisasterModalRef}
              selectedTags={soicalSelectedTags}
              setSelectedTags={soicalSetSelectedTags}
            />
          </Pressable>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.skip}>
          <Text style={styles.skipText}>건너뛰기 {'>'}</Text>
        </View>
        <Pressable
          style={
            naturalSelectedTags.length || soicalSelectedTags.length
              ? StyleSheet.compose(styles.completeButton, styles.completeButtonActive)
              : styles.completeButton
          }
          disabled={!naturalSelectedTags.length && !soicalSelectedTags.length}
          onPress={() => onSubmit()}
        >
          <Text style={styles.completeButtonText}>완료</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    paddingTop: 70,
    justifyContent: 'space-between',
  },
  topContainer: {},
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
  tabActive: {
    backgroundColor: `${COLOR.blue}`,
  },
  tabText: {
    fontSize: 14,
    color: `${COLOR.gray}`,
  },
  tabTextActive: {
    color: `${COLOR.white}`,
  },
  bottomContainer: {
    alignItems: 'center',
  },
  skip: { marginLeft: 'auto', marginRight: 40 },
  skipText: {
    fontSize: 12,
    color: `${COLOR.gray}`,
  },
  completeButton: {
    width: '90%',
    height: 50,
    backgroundColor: `${COLOR.lightGray}`,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  completeButtonActive: {
    backgroundColor: `${COLOR.blue}`,
  },
  completeButtonText: {
    color: `${COLOR.white}`,
  },
});
