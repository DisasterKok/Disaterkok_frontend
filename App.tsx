import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Report, SignIn, SignUp, Solution, SetName, SelectLocation, DisaterNotiSettings } from './src/pages';
import Onboarding from './src/pages/Onboarding';

export type LoggedInParamList = {
  Orders: undefined;
  Settings: undefined;
  Delivery: undefined;
  Complete: { orderId: string };
};

export type RootStackParamList = {
  Onboarding: undefined;
  DisaterNotiSettings: undefined;
  SignIn: undefined;
  SignUp: undefined;
  SetName: undefined;
  SelectLocation: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator>
          <Tab.Screen name="home" component={Home} options={{ title: '홈' }} />
          <Tab.Screen name="report" component={Report} options={{ title: '제보' }} />
          <Tab.Screen name="solution" component={Solution} options={{ title: '솔루션' }} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
          {/* 테스트 위해 임시로 설정한거 */}
          <Stack.Screen
            name="DisaterNotiSettings"
            component={DisaterNotiSettings}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ title: '회원가입' }} />
          <Stack.Screen name="SetName" component={SetName} options={{ title: '닉네임 설정' }} />
          <Stack.Screen
            name="SelectLocation"
            component={SelectLocation}
            options={{ title: '지역 선택' }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default App;
