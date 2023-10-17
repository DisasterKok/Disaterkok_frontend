import React from 'react';
import { Text, View } from 'react-native';
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type SelectLocScreenProps = NativeStackScreenProps<RootStackParamList, 'SelectLocation'>;

export default function SelectLoc({ navigation }: SelectLocScreenProps) {
  return (
    <View>
      <View>
        <Text>재난 상황을 확인하고 싶은{'\n'}동네를 설정해주세요</Text>
        <Text>이후 홈화면에서 편집하거나 추가할 수 있어요</Text>
      </View>
      <View></View>
    </View>
  );
}
