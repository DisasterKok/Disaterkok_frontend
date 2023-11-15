import React, { RefObject, useCallback, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View, Platform, FlatList } from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import COLOR from '../../../constants/colors';

type SocialDisasterBottomSheetProps = {
  bottomSheetModalRef: RefObject<BottomSheetModal>;
  selectedTags: number[];
  setSelectedTags: React.Dispatch<React.SetStateAction<number[]>>;
};

type SocialDisasterType = {
  id: number;
  text: string;
};

const SOCIAL_DISASTER: SocialDisasterType[] = [
  { id: 1, text: '화재' },
  { id: 2, text: '건축물붕괴' },
  { id: 3, text: '폭발' },
  { id: 4, text: '도로교통사고' },
  { id: 5, text: '철도/지하철 사고' },
  { id: 6, text: '정전/전력부족' },
  { id: 7, text: '감염병' },
  { id: 8, text: '테러사고' },
  { id: 9, text: '인파사고' },
];

export default function SocialDisasterBottomSheet({
  bottomSheetModalRef,
  selectedTags,
  setSelectedTags,
}: SocialDisasterBottomSheetProps) {
  const toggleTag = (tagId: number) => {
    setSelectedTags((prevSelectedTags) => {
      if (prevSelectedTags.includes(tagId)) {
        return prevSelectedTags.filter((id) => id !== tagId);
      } else {
        return [...prevSelectedTags, tagId];
      }
    });
  };

  const toggleAllTags = () => {
    if (selectedTags.length === SOCIAL_DISASTER.length) {
      setSelectedTags([]);
    } else {
      setSelectedTags(SOCIAL_DISASTER.map((tag) => tag.id));
    }
  };

  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const handleCloseModalPress = useCallback((ref: React.RefObject<BottomSheetModal>) => {
    ref.current?.close();
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} pressBehavior="close" />,
    [],
  );

  const renderItem = ({ item }: { item: SocialDisasterType }) => (
    <Pressable
      onPress={() => toggleTag(item.id)}
      style={
        !selectedTags.includes(item.id)
          ? styles.tag
          : StyleSheet.compose(styles.tag, styles.selectedTag)
      }
    >
      <Text
        style={
          !selectedTags.includes(item.id)
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
          data={SOCIAL_DISASTER}
          renderItem={renderItem}
          numColumns={3}
          style={styles.tagContainer}
        />
        <BouncyCheckbox
          size={15}
          style={styles.selectAllButton}
          fillColor="#2C58F4"
          unfillColor="#FFFFFF"
          text="전체 선택"
          iconStyle={{ marginRight: 0, borderRadius: 3 }}
          innerIconStyle={{ borderWidth: 1, borderRadius: 3 }}
          textStyle={styles.selectAllText}
          onPress={toggleAllTags}
          disableBuiltInState={true}
          isChecked={selectedTags.length === SOCIAL_DISASTER.length}
        />
        <Pressable
          onPress={() => handleCloseModalPress(bottomSheetModalRef)}
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
