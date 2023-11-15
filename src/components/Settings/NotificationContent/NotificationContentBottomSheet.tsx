import React, { RefObject, useCallback, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import COLOR from '../../../constants/colors';

type NotiContentBottomSheetProps = {
  bottomSheetModalRef: RefObject<BottomSheetModal>;
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

export default function NotificationContentBottomSheet({
  bottomSheetModalRef,
}: NotiContentBottomSheetProps) {
  const snapPoints = useMemo(() => ['25%', '40%'], []);

  const handleCloseModalPress = useCallback((ref: React.RefObject<BottomSheetModal>) => {
    ref.current?.close();
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} pressBehavior="close" />,
    [],
  );

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={1}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: `${COLOR.whiteBackground}` }}
    >
      <View style={styles.modal}>
        <Pressable
          style={styles.complete}
          onPress={() => handleCloseModalPress(bottomSheetModalRef)}
        >
          <Text style={styles.completeText}>완료</Text>
        </Pressable>
        <View style={styles.modalContainer}>
          <Text style={styles.notiCategory}>전국 재난 알림</Text>
          <Text style={styles.notiDate}>2023-09-27 오전 09:30</Text>
          <View style={styles.notiContentContainer}>
            <View style={styles.title}>
              <Text style={styles.titleText}>재난내용에 대한 것 재난 내용에 대한 것 재난 내용</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.contentText}>
                재난에 대한 상세 내용 재난에 대한 상세 내용재난에 대한 상세 내용 재난에 대한 상세
                내용재난에 대한 상세 내용 재난에 대한 상세 내용재난에 대한 상세 내용 재난에 대한
                상세 내용재난에 대한 상세 내용
              </Text>
            </View>
          </View>
        </View>
      </View>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  modal: {
    position: 'relative',
  },
  complete: {
    position: 'absolute',
    right: 15,
    top: 0,
  },
  completeText: {
    color: `${COLOR.blue}`,
  },
  modalContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  notiCategory: {
    fontSize: 16,
    fontWeight: '600',
  },
  notiDate: {
    fontSize: 12,
    fontWeight: '500',
    color: `${COLOR.gray}`,
  },
  notiContentContainer: {
    marginTop: 10,
    width: '90%',
    height: 150,
    backgroundColor: `${COLOR.lightGray}`,
    borderRadius: 5,
  },
  title: {
    paddingHorizontal: 7,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: `${COLOR.middleGray}`,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    paddingHorizontal: 7,
    paddingVertical: 15,
  },
  contentText: {
    fontSize: 12,
    color: `${COLOR.gray}`,
  },
});
