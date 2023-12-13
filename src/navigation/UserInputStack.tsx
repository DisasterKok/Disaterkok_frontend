import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SelectLocation, DisasterNotiSettings, CompleteRegionSetting } from '../screens';
import { UserInputStackParamList } from './types';

const Stack = createNativeStackNavigator<UserInputStackParamList>();

export default function UserInputStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SelectLocation"
        component={SelectLocation}
        options={{ title: '지역 선택' }}
      />
      <Stack.Screen
        name="DisasterNotiSettings"
        component={DisasterNotiSettings}
        options={{ title: '알림 설정' }}
      />
      <Stack.Screen
        name="CompleteRegionSetting"
        component={CompleteRegionSetting}
        options={{ headerShown: false, title: '회원가입 완료' }}
      />
    </Stack.Navigator>
  );
}
