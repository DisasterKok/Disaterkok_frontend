import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import {
  SignIn,
  SignUp,
  SetName,
  SelectLocation,
  DisasterNotiSettings,
  CompleteLogin,
  Onboarding,
} from '../screens';
import { LoggedOutStackParamList } from './types';

const Stack = createNativeStackNavigator<LoggedOutStackParamList>();

export default function LoggedOutStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
      {/* 테스트 위해 임시로 설정한거 */}
      <Stack.Screen
        name="DisasterNotiSettings"
        component={DisasterNotiSettings}
        options={{ title: '알림 설정' }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false, title: '로그인' }}
      />
      <Stack.Screen name="SignUp" component={SignUp} options={{ title: '회원가입' }} />
      <Stack.Screen name="SetName" component={SetName} options={{ title: '닉네임 설정' }} />
      <Stack.Screen
        name="SelectLocation"
        component={SelectLocation}
        options={{ title: '지역 선택' }}
      />
      <Stack.Screen
        name="CompleteLogin"
        component={CompleteLogin}
        options={{ headerShown: false, title: '회원가입 완료' }}
      />
    </Stack.Navigator>
  );
}
