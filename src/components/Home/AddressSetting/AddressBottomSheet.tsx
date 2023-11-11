import React, { useEffect, useCallback, RefObject } from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetFooter,
  BottomSheetFooterProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { View, StyleSheet, Text, Animated } from 'react-native';
import TownList from './TownList';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface CustomFooterProps extends BottomSheetFooterProps {}

interface AdrressBottomSheetProps {
  bottomSheetModalRef: RefObject<BottomSheetModal>;
  isEditable: boolean;
}

const AddressBottomSheet = ({ bottomSheetModalRef, isEditable }: AdrressBottomSheetProps) => {
  const snapPoints = React.useMemo(() => ['60%', '90%'], []);
  const [currentSnapPointIndex, setCurrentSnapPointIndex] = React.useState<number>(-1);

  const renderBackdrop = React.useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  const handleSheetChanges = useCallback((fromIndex: number, toIndex: number) => {
    setCurrentSnapPointIndex(toIndex);
  }, []);

  return (
    <>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        backdropComponent={renderBackdrop}
        snapPoints={snapPoints}
        // footerComponent={renderFooter}
        onAnimate={handleSheetChanges}
      >
        <View style={styles.modalContainer}>
          <TownList
            height={currentSnapPointIndex < 1 ? 0.6 : 0.9}
            isEditable={isEditable}
            bottomSheetModalRef={bottomSheetModalRef}
          />
        </View>
      </BottomSheetModal>
    </>
  );
};

export default AddressBottomSheet;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    paddingTop: 8,
  },
});
