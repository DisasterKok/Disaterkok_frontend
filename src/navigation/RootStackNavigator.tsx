import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import { RootStackParamList } from './types';
import UserInputStack from './UserInputStack';
import useUser from '../hooks/queries/Auth/useUser';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  const { user } = useUser();

  return (
    <>
      {user && user?.locData ? (
        <Stack.Navigator>
          <Stack.Screen
            name="MainTabNavigator"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <UserInputStack />
      )}
    </>
  );
}
