import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Solution, Main, ReportPost } from '../screens';
import { RootTabParamList } from './types';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Dimensions, View } from 'react-native';
import COLOR from '../constants/colors';

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { height: 90, paddingVertical: 10, paddingHorizontal: 15 },
        tabBarActiveTintColor: COLOR.black,
        tabBarInactiveTintColor: COLOR.gray,
      }}
    >
      <Tab.Screen
        name="Main"
        component={Main}
        options={{
          headerShown: false,
          title: '홈',
          tabBarIcon: ({ color }) => <FeatherIcon name="home" color={color} size={22} />,
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: '500',
            marginTop: 5,
            marginBottom: 10,
          },
        }}
      />
      <Tab.Screen
        name="Report"
        component={ReportPost}
        options={{
          title: '제보',
          tabBarIcon: () => (
            <View
              style={{
                width: 58,
                height: 58,
                backgroundColor: COLOR.primary,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 40,
              }}
            >
              <FeatherIcon name="camera" color={COLOR.white} size={27} />
            </View>
          ),
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: '500',
            marginTop: 5,
            marginBottom: 20,
          },
        }}
      />
      <Tab.Screen
        name="Solution"
        component={Solution}
        options={{
          headerShown: false,
          title: '솔루션',
          tabBarIcon: ({ color }) => <FeatherIcon name="book-open" color={color} size={22} />,
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: '500',
            marginTop: 5,
            marginBottom: 10,
          },
        }}
      />
    </Tab.Navigator>
  );
}
