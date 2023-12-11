import React, { RefObject, useCallback, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View, Platform, FlatList } from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import COLOR from '../../../constants/colors';

type AllDisasterBottomSheetProps = {
  bottomSheetModalRef: RefObject<BottomSheetModal>;
  selectedTag: string;
  setSelectedTag: React.Dispatch<React.SetStateAction<string>>;
};

type DisasterType = {
  id: number;
  text: string;
};

const DISASTER: DisasterType[] = [
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
  { id: 14, text: '화재' },
  { id: 15, text: '건축물붕괴' },
  { id: 16, text: '폭발' },
  { id: 17, text: '도로교통사고' },
  { id: 18, text: '철도/지하철 사고' },
  { id: 19, text: '정전/전력부족' },
  { id: 20, text: '감염병' },
  { id: 21, text: '테러사고' },
  { id: 22, text: '인파사고' },
];

export default function SelectAllDisasterBottomSheet({
  bottomSheetModalRef,
  selectedTag,
  setSelectedTag,
}: AllDisasterBottomSheetProps) {
  const toggleTag = (tagText: string) => {
    if (selectedTag === tagText) {
      setSelectedTag('');
    } else {
      setSelectedTag(tagText);
    }
  };

  const snapPoints = useMemo(() => ['25%', '65%'], []);

  const handleCloseModalPress = useCallback((ref: React.RefObject<BottomSheetModal>) => {
    ref.current?.close();
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} pressBehavior="close" />,
    [],
  );

  const renderItem = ({ item }: { item: DisasterType }) => (
    <Pressable
      onPress={() => toggleTag(item.text)}
      style={
        selectedTag !== item.text ? styles.tag : StyleSheet.compose(styles.tag, styles.selectedTag)
      }
    >
      <Text
        style={
          selectedTag !== item.text
            ? styles.tagText
            : StyleSheet.compose(styles.tagText, styles.selectedTagText)
        }
      >
        {item.text}
      </Text>
    </Pressable>
  );

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={1}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: `${COLOR.whiteBackground}` }}
    >
      <View style={styles.modalContainer}>
        <FlatList
          data={DISASTER}
          renderItem={renderItem}
          numColumns={3}
          style={styles.tagContainer}
        />
        <Pressable
          onPress={() => handleCloseModalPress(bottomSheetModalRef)}
          style={
            selectedTag === null
              ? styles.selectButton
              : StyleSheet.compose(styles.selectButton, styles.selectButtonActive)
          }
        >
          <Text style={styles.selectButtonText}>완료</Text>
        </Pressable>
      </View>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
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
  selectedTag: {
    backgroundColor: `${COLOR.blue}`,
  },
  tagText: { color: `${COLOR.gray}` },
  selectedTagText: {
    color: `${COLOR.white}`,
  },
  selectAllButton: {
    marginLeft: 'auto',
    marginRight: 20,
  },

  selectAllText: {
    color: `${COLOR.blue}`,
    textDecorationLine: 'none',
    marginLeft: -10,
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
