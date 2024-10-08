import React from 'react';
import { View, StyleSheet, ScrollView, Animated, Platform } from 'react-native';
import COLOR from '../constants/colors';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import SwitchButton from '../components/Home/SwitchButton';
import WeatherSection from '../components/Home/WeatherSection';
import IssueSection from '../components/Home/IssueSection';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import ReportSection from '../components/Home/ReportSection';
import { HomeStackParamList } from '../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AppBar from '../components/Home/AppBar';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import AddressBottomSheet from '../components/common/Modal/BottomSheetModal/AddressSetting/AddressBottomSheet';

export type HomeScreenProps = NativeStackScreenProps<HomeStackParamList, 'Home'>;

export default function Home() {
  const navigation: NavigationProp<HomeStackParamList, 'Home'> = useNavigation();

  const bottomSheetRef = React.useRef<BottomSheetModal>(null);

  const [isLocalSelected, setLocalSelected] = React.useState<boolean>(false);
  const insets = useSafeAreaInsets();
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const colorChangeThreshold = 110;

  // Function to interpolate the background color
  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, colorChangeThreshold],
    outputRange: [`${COLOR.primary}`, `${COLOR.white}`],
    extrapolate: 'clamp',
  });

  const headerTextColor = scrollY.interpolate({
    inputRange: [0, colorChangeThreshold],
    outputRange: [`${COLOR.white}`, `${COLOR.primary}`],
    extrapolate: 'clamp',
  });

  const navigateToSetting = () => {
    navigation.navigate('Setting');
  };

  const handlePresentModalPress = React.useCallback((ref: React.RefObject<BottomSheetModal>) => {
    ref.current?.present();
  }, []);

  return (
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
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <AppBar animatedColor={headerTextColor} />
        </Animated.View>
      </Animated.View>
      <ScrollView
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false,
        })}
        scrollEventThrottle={16}
        style={{ marginTop: 50, width: '100%' }}
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
          <ReportSection />
        </View>
      </ScrollView>
      <AddressBottomSheet bottomSheetModalRef={bottomSheetRef} isEditable />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  layout: {
    width: '100%',
    height: '115%',
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
    flexDirection: 'column',
  },
  contentSheet: {
    width: '100%',
    height: '100%',
    backgroundColor: `${COLOR.white}`,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingLeft: 22,
    paddingRight: 22,
    paddingBottom: 120,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        backgroundColor: `${COLOR.white}`,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});
