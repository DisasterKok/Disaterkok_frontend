import React, { useCallback, useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SelectRegionBottomSheet } from '../components/BottomSheetModal';

import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootTabParamList } from '../../App';

export type ReportScreenProps = NativeStackScreenProps<RootTabParamList, 'Report'>;

export default function Report({ navigation }: ReportScreenProps) {
  const selectRegionModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback((ref: React.RefObject<BottomSheetModal>) => {
    ref.current?.present();
    navigation.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View>
          <Pressable onPress={() => handlePresentModalPress(selectRegionModalRef)}>
            <Text>지역선택</Text>
          </Pressable>
          <SelectRegionBottomSheet
            bottomSheetModalRef={selectRegionModalRef}
            navigation={navigation}
          />
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({});
