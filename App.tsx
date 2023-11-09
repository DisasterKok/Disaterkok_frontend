import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Home,
  Report,
  SignIn,
  SignUp,
  Solution,
  SetName,
  SelectLocation,
  DisasterNotiSettings,
  CompleteLogin,
  ReportArticleDetail,
} from './src/pages';
import Onboarding from './src/pages/Onboarding';
import useAuth from './src/states/useAuth';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export type RootTabParamList = {
  Home: undefined;
  Report: undefined;
  Solution: undefined;
};

export type RootStackParamList = {
  Onboarding: undefined;
  DisasterNotiSettings: undefined;
  SignIn: undefined;
  SignUp: undefined;
  SetName: undefined;
  SelectLocation: undefined;
  CompleteLogin: undefined;
  ReportDetail: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const { isLoggedIn } = useAuth();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <NavigationContainer>
          {isLoggedIn ? (
            <Tab.Navigator>
              <Tab.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false, title: '홈' }}
              />
              <Tab.Screen name="Report" component={Report} options={{ title: '실시간 제보' }} />
              <Tab.Screen name="Solution" component={Solution} options={{ title: '솔루션' }} />
            </Tab.Navigator>
          ) : (
            <Stack.Navigator>
              <Stack.Group>
                <Stack.Screen
                  name="Onboarding"
                  component={Onboarding}
                  options={{ headerShown: false }}
                />
                {/* 테스트 위해 임시로 설정한거 */}
                <Stack.Screen
                  name="DisasterNotiSettings"
                  component={DisasterNotiSettings}
                  options={{ title: '알림 설정' }}
                />
                <Stack.Screen
                  name="SignIn"
                  component={SignIn}
                  options={{ headerShown: false, title: '로그인' }}
                />
                <Stack.Screen name="SignUp" component={SignUp} options={{ title: '회원가입' }} />
                <Stack.Screen
                  name="SetName"
                  component={SetName}
                  options={{ title: '닉네임 설정' }}
                />
                <Stack.Screen
                  name="SelectLocation"
                  component={SelectLocation}
                  options={{ title: '지역 선택' }}
                />
                <Stack.Screen
                  name="CompleteLogin"
                  component={CompleteLogin}
                  options={{ headerShown: false, title: '회원가입 완료' }}
                />
              </Stack.Group>
              <Stack.Screen
                name="ReportDetail"
                component={ReportArticleDetail}
                options={{ title: '제보 상세' }}
              />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

export default App;
