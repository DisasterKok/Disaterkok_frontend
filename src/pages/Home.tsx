import React, { useEffect, useRef } from 'react';
import { Text, View, StyleSheet, ScrollView, Animated } from 'react-native';
import COLOR from '../constants/colors';

export default function Home() {
  const scrollY = useRef(new Animated.Value(0)).current;

  // Define the scroll threshold where you want to change the header color
  const colorChangeThreshold = 200; // Adjust this value as needed

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
    <View style={styles.layout}>
      <Animated.View
        style={{
          backgroundColor: headerBackgroundColor,
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          top: 0,
          left: 0,
          right: 0,
          height: 60,
        }}
      >
        <Animated.Text style={{ color: headerTextColor }}>앱바 영역입니다</Animated.Text>
      </Animated.View>
      <ScrollView
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false,
        })}
        scrollEventThrottle={16} // Adjust as needed
        style={{ position: 'absolute', top: 60, width: '100%' }}
      >
        <View style={{ height: 120, backgroundColor: `${COLOR.primary}` }}>
          <Text>날씨 영역</Text>
        </View>
        <View style={styles.contentSheet}>
          <Text>내용입니다</Text>
        </View>
      </ScrollView>
    </View>
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
  contentSheet: {
    width: '100%',
    height: 1200,
    backgroundColor: `${COLOR.lightGray}`,
    borderTopColor: `${COLOR.middleGray}`,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
  },
});
