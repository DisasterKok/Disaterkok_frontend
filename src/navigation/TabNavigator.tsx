import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Solution, Main, ReportPost } from '../screens';
import { RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Main" component={Main} options={{ headerShown: false, title: '홈' }} />
      <Tab.Screen name="Report" component={ReportPost} options={{ title: '실시간 제보' }} />
      <Tab.Screen
        name="Solution"
        component={Solution}
        options={{ headerShown: false, title: '솔루션' }}
      />
    </Tab.Navigator>
  );
}
