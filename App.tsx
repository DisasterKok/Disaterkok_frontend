import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import useAuth from './src/states/useAuth';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LoggedOutStack from './src/navigation/LoggedOutStack';
import RootStackNavigator from './src/navigation/RootStackNavigator';

function App() {
  const { isLoggedIn } = useAuth();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <NavigationContainer>
          {isLoggedIn ? <RootStackNavigator /> : <LoggedOutStack />}
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

export default App;
