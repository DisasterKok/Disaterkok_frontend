import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStackNavigator from './RootStackNavigator';
import LoggedOutStack from './LoggedOutStack';
import useUser from '../hooks/queries/Auth/useUser';

const NavigationContent = () => {
  const { userData } = useUser();

  return (
    <NavigationContainer>
      {userData?.token.access ? <RootStackNavigator /> : <LoggedOutStack />}
    </NavigationContainer>
  );
};

export default NavigationContent;
