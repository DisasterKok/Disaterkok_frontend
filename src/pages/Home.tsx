import React, { useEffect, useRef } from 'react';
import { Text, View, StyleSheet, ScrollView, Animated, Platform } from 'react-native';
import COLOR from '../constants/colors';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Home() {
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;

  const colorChangeThreshold = 120;

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

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.layout}>
        <Animated.View
          style={[
            {
              backgroundColor: headerBackgroundColor,
            },
            styles.header,
          ]}
        >
          {/* 상단바 영역 */}
          <View style={{ width: '100%', height: insets.top }}></View>
          {/* 앱바 영역 */}
          <View style={{ height: 42, justifyContent: 'center' }}>
            <Animated.Text style={{ color: headerTextColor }}>앱바 영역 입니다</Animated.Text>
          </View>
        </Animated.View>
        <ScrollView
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
            useNativeDriver: false,
          })}
          scrollEventThrottle={16}
          style={{ marginTop: 42, width: '100%' }}
        >
          <View style={{ height: 146, backgroundColor: `${COLOR.primary}` }}>
            <Text>날씨영역</Text>
          </View>
          <View style={styles.contentSheet}>
            <Text>내용입니다</Text>
          </View>
        </ScrollView>
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
    backgroundColor: `${COLOR.lightGray}`,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});
