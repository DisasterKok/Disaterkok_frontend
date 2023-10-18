import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View, Platform, Image, Button, FlatList } from 'react-native';
import COLOR from '../constants/colors';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

type LocalDisasterType = {
  id: number;
  text: string;
};

const LOCAL_DISASTER: LocalDisasterType[] = [
  { id: 1, text: '태풍' },
  { id: 2, text: '호우' },
  { id: 3, text: '폭설' },
  { id: 4, text: '지진/해일' },
  { id: 5, text: '산사태' },
  { id: 6, text: '우박' },
  { id: 7, text: '낙뢰/뇌우' },
  { id: 8, text: '황사/미세먼지' },
  { id: 9, text: '한파' },
  { id: 10, text: '강풍' },
  { id: 11, text: '가뭄' },
  { id: 12, text: '산불' },
  { id: 13, text: '폭염' },
];

export default function DisaterNotiSettings() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetModalRef2 = useRef<BottomSheetModal>(null);

  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const handlePresentModalPress = useCallback((ref: React.RefObject<BottomSheetModal>) => {
    ref.current?.present();
  }, []);

  const toggleTagSelection = (tagId: number) => {
    setSelectedTags((prevSelectedTags) => {
      if (prevSelectedTags.includes(tagId)) {
        // 이미 선택된 경우 선택 해제
        return prevSelectedTags.filter((id) => id !== tagId);
      } else {
        // 선택되지 않은 경우 선택
        return [...prevSelectedTags, tagId];
      }
    });
  };

  const toggleAllTags = () => {
    // 현재 선택된 태그가 있으면 전체 선택 해제
    if (selectedTags.length === LOCAL_DISASTER.length) {
      setSelectedTags([]);
    } else {
      // 현재 선택된 태그가 없으면 전체 선택
      setSelectedTags(LOCAL_DISASTER.map((tag) => tag.id));
    }
  };

  const snapPoints = useMemo(() => ['25%', '65%'], []);

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} pressBehavior="close" />,
    [],
  );

  const renderItem = ({ item }: { item: LocalDisasterType }) => (
    <Pressable
      onPress={() => toggleTagSelection(item.id)}
      style={[
        styles.tag,
        {
          backgroundColor: selectedTags.includes(item.id) ? `${COLOR.blue}` : `${COLOR.white}`,
        },
      ]}
    >
      <Text
        style={[
          styles.tagText,
          {
            color: selectedTags.includes(item.id) ? `${COLOR.white}` : `${COLOR.gray}`,
          },
        ]}
      >
        {item.text}
      </Text>
    </Pressable>
  );

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
              onPress={() => handlePresentModalPress(bottomSheetModalRef)}
            >
              <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
                backgroundStyle={{ backgroundColor: `${COLOR.whiteBackground}` }}
              >
                <View style={styles.modalContainer}>
                  <FlatList
                    data={LOCAL_DISASTER}
                    renderItem={renderItem}
                    numColumns={3}
                    style={styles.tagContainer}
                  />
                  <Pressable style={styles.selectAllButton} onPress={toggleAllTags}>
                    <Text style={styles.selectAllText}>전체선택</Text>
                  </Pressable>
                  <Pressable
                    style={
                      !selectedTags.length
                        ? styles.selectButton
                        : StyleSheet.compose(styles.selectButton, styles.selectButtonActive)
                    }
                  >
                    <Text style={styles.selectButtonText}>완료</Text>
                  </Pressable>
                </View>
              </BottomSheetModal>
              <Text style={styles.tabText}>지역재난</Text>
              <Image source={require('../assets/images/chevron-down.png')} />
            </Pressable>
            <Pressable
              style={styles.tab}
              onPress={() => handlePresentModalPress(bottomSheetModalRef2)}
            >
              <Text style={styles.tabText}>사회재난</Text>
              <BottomSheetModal
                ref={bottomSheetModalRef2}
                index={1}
                snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
              >
                <View style={styles.modalContainer}>
                  <Text>사회재난</Text>
                </View>
              </BottomSheetModal>
              <Image source={require('../assets/images/chevron-down.png')} />
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
  modalContainer: {
    flex: 1,
    alignItems: 'center',
  },
  tagContainer: {},
  tag: {
    margin: 5,
    width: 104,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${COLOR.white}`,
    borderRadius: 8,
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
  tagText: { color: `${COLOR.gray}` },
  selectAllButton: {
    marginLeft: 'auto',
    marginRight: 20,
  },
  selectAllText: {
    color: `${COLOR.blue}`,
  },
  selectButton: {
    width: '90%',
    height: 50,
    backgroundColor: `${COLOR.lightGray}`,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  selectButtonActive: {
    backgroundColor: `${COLOR.blue}`,
  },
  selectButtonText: {
    color: `${COLOR.white}`,
  },
});
