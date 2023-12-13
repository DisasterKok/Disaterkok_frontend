import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { SignIn, SignUp, SetName, Onboarding } from '../screens';
import { LoggedOutStackParamList } from './types';

const Stack = createNativeStackNavigator<LoggedOutStackParamList>();

export default function LoggedOutStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false, title: '로그인' }}
      />
      <Stack.Screen name="SignUp" component={SignUp} options={{ title: '회원가입' }} />
      <Stack.Screen name="SetName" component={SetName} options={{ title: '닉네임 설정' }} />
    </Stack.Navigator>
  );
}
