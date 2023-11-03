import React from 'react';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { View, StyleSheet, Text } from 'react-native';

const LocationBottomSheet = ({
  bottomSheetModalRef,
}: {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
}) => {
  const snapPoints = React.useMemo(() => ['25%', '65%'], []);
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
      style={{ zIndex: 2000 }}
    >
      <View style={styles.modalContainer}>
        <Text>지역선택</Text>
      </View>
    </BottomSheetModal>
  );
};

export default LocationBottomSheet;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});
