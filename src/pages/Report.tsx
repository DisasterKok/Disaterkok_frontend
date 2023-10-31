import React, { useCallback, useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SelectRegionBottomSheet } from '../components/BottomSheetModal';

import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Report() {
  const selectRegionModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback((ref: React.RefObject<BottomSheetModal>) => {
    ref.current?.present();
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View>
          <Pressable onPress={() => handlePresentModalPress(selectRegionModalRef)}>
            <Text>지역선택</Text>
          </Pressable>
          <SelectRegionBottomSheet bottomSheetModalRef={selectRegionModalRef} />
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({});
