import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import useAuth from './src/states/useAuth';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoggedOutStack from './src/navigation/LoggedOutStack';
import RootStackNavigator from './src/navigation/RootStackNavigator';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  const { isLoggedIn } = useAuth();
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              {isLoggedIn ? <RootStackNavigator /> : <LoggedOutStack />}
            </NavigationContainer>
          </SafeAreaProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

export default App;
