import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Home, ReportArticleDetail, ReportList } from '../pages';
import { HomeStackParamList } from './types';
import HeaderLeftGoBack from '../components/Header/HeadrLeftGoBack';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen
        name="ReportList"
        component={ReportList}
        options={{
          title: '실시간 제보',
          headerLeft: () => <HeaderLeftGoBack />,
        }}
      />
      <Stack.Screen
        name="ReportArticleDetail"
        component={ReportArticleDetail}
        options={{ title: '실시간 제보', headerLeft: () => <HeaderLeftGoBack /> }}
      />
    </Stack.Navigator>
  );
}
