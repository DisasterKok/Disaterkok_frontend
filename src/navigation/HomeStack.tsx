import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Home, ReportArticleDetail, ReportList, Setting, Search } from '../screens';
import { HomeStackParamList } from './types';
import HeaderLeftGoBack from '../components/common/Header/HeadrLeftGoBack';
import CompleteReportPost from '../screens/CompleteReportPost';
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
      <Stack.Screen
        name="CompleteReportPost"
        component={CompleteReportPost}
        options={{ title: '작성 성공', headerLeft: () => <HeaderLeftGoBack /> }}
      />
      <Stack.Screen
        name="Notification"
        component={Setting}
        options={{ title: '알림', headerLeft: () => <HeaderLeftGoBack /> }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ title: '검색', headerShown: false }}
      />
    </Stack.Navigator>
  );
}
