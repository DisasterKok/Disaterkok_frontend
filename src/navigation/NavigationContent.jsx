import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStackNavigator from './RootStackNavigator';
import LoggedOutStack from './LoggedOutStack';
import useUser from '../hooks/queries/Auth/useUser';

const NavigationContent = () => {
  const { user } = useUser();
  //console.log('user', user);
  return (
    <NavigationContainer>{user ? <RootStackNavigator /> : <LoggedOutStack />}</NavigationContainer>
  );
};

export default NavigationContent;
