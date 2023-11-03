import React from 'react';
import { Text, View, StyleSheet, ScrollView, Animated, Platform } from 'react-native';
import COLOR from '../constants/colors';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import SwitchButton from '../components/Home/SwitchButton';
import WeatherSection from '../components/Home/WeatherSection';
import IssueSection from '../components/Home/IssueSection';
import LocationBottomSheet from '../components/Home/LocationSetting/LocationBottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

export default function Home() {
  const bottomSheetRef = React.useRef<BottomSheetModal>(null);

  const [isLocalSelected, setLocalSelected] = React.useState<boolean>(false);
  const insets = useSafeAreaInsets();
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const colorChangeThreshold = 110;

  // Function to interpolate the background color
  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, colorChangeThreshold],
    outputRange: [`${COLOR.primary}`, `${COLOR.lightGray}`],
    extrapolate: 'clamp',
  });

  const headerTextColor = scrollY.interpolate({
    inputRange: [0, colorChangeThreshold],
    outputRange: [`${COLOR.white}`, `${COLOR.primary}`],
    extrapolate: 'clamp',
  });

  const handlePresentModalPress = React.useCallback((ref: React.RefObject<BottomSheetModal>) => {
    console.log('clicking');
    ref.current?.present();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.layout}>
        <Animated.View
          style={[
            styles.header,
            {
              backgroundColor: headerBackgroundColor,
            },
          ]}
        >
          {/* 상단바 영역 */}
          <View style={{ width: '100%', height: insets.top }}></View>
          {/* 앱바 영역 */}
          <Animated.View
            style={{
              width: '100%',
              height: 42,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Animated.Text style={{ color: headerTextColor }}>앱바 영역 입니다</Animated.Text>
          </Animated.View>
        </Animated.View>
        <ScrollView
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
            useNativeDriver: false,
          })}
          scrollEventThrottle={16}
          style={{ marginTop: 42, width: '100%' }}
        >
          <WeatherSection />
          <View style={styles.contentSheet}>
            <SwitchButton
              isLocalSelected={isLocalSelected}
              onSelect={setLocalSelected}
              handleSheet={() => handlePresentModalPress(bottomSheetRef)}
              bottomSheetModalRef={bottomSheetRef}
            />
            <IssueSection isLocalSelected={isLocalSelected} />
          </View>
        </ScrollView>
        <LocationBottomSheet bottomSheetModalRef={bottomSheetRef} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  layout: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: `${COLOR.primary}`,
    position: 'relative',
  },
  header: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  contentSheet: {
    display: 'flex',
    width: '100%',
    height: 3000,
    alignItems: 'center',
    backgroundColor: `${COLOR.lightGray}`,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingLeft: 22,
    paddingRight: 22,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        backgroundColor: `${COLOR.lightGray}`,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});
