import React, { useEffect } from 'react';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { View, StyleSheet, Text } from 'react-native';
import TownList from './TownList';

const AddressBottomSheet = ({
  bottomSheetModalRef,
}: {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
}) => {
  const snapPoints = React.useMemo(() => ['25%', '60%', '90%'], []);
  const handleCloseModalPress = React.useCallback((ref: React.RefObject<BottomSheetModal>) => {
    ref.current?.close();
  }, []);

  const renderBackdrop = React.useCallback(
    (props: any) => <BottomSheetBackdrop {...props} pressBehavior="close" />,
    [],
  );

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={1}
      backdropComponent={renderBackdrop}
      snapPoints={snapPoints}
    >
      <View style={styles.modalContainer}>
        <TownList/>
      </View>
    </BottomSheetModal>
  );
};

export default AddressBottomSheet;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingTop: 8,
  },
});
