import * as React from 'react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NavigationContent from './src/navigation/NavigationContent';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <SafeAreaProvider>
            <NavigationContent />
          </SafeAreaProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

export default App;
