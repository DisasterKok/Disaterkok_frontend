import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Home, ReportArticleDetail, ReportList } from '../pages';
import { HomeStackParamList } from './types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="ReportList" component={ReportList} options={{ title: '실시간 제보' }} />
      <Stack.Screen
        name="ReportArticleDetail"
        component={ReportArticleDetail}
        options={{ title: '실시간 제보' }}
      />
    </Stack.Navigator>
  );
}
