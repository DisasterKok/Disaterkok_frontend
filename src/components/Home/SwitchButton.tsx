import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Platform } from 'react-native';
import COLOR from '../../constants/colors';

const SwitchButton = ({
  isLocalSelected,
  onSelect,
}: {
  isLocalSelected: boolean;
  onSelect: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const translateX = new Animated.Value(isLocalSelected ? 2000 : 0);

  const toggleSwitch = () => {
    toggleSwitching(() => {
      onSelect(!isLocalSelected);
    });
  };

  const toggleSwitching = (callback: () => void) => {
    Animated.timing(translateX, {
      toValue: isLocalSelected ? 0 : 2000,
      duration: 100,
      useNativeDriver: false,
    }).start(callback);
  };

  const buttonWidth = translateX.interpolate({
    inputRange: [0, 2000],
    outputRange: [65, 98],
    extrapolate: 'clamp',
  });

  const buttonLeft = translateX.interpolate({
    inputRange: [0, 2000],
    outputRange: [0, 57],
    extrapolate: 'clamp',
  });

  const NationalTextColor = translateX.interpolate({
    inputRange: [0, 2000],
    outputRange: ['#fff', '#888'],
    extrapolate: 'clamp',
  });

  const LocalTextColor = translateX.interpolate({
    inputRange: [0, 2000],
    outputRange: ['#888', '#fff'],
    extrapolate: 'clamp',
  });

  useEffect(() => {}, [translateX]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.switchButton} onPress={toggleSwitch} activeOpacity={1}>
        <Animated.View
          style={[
            styles.buttonIndicator,
            { width: buttonWidth, transform: [{ translateX: buttonLeft }] },
          ]}
        >
          <View style={styles.buttonShadow} />
        </Animated.View>
        <Animated.Text style={[styles.buttonText, styles.leftText, { color: NationalTextColor }]}>
          전국
        </Animated.Text>
        <Animated.Text style={[styles.buttonText, styles.rightText, { color: LocalTextColor }]}>
          우리동네
        </Animated.Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  switchButton: {
    position: 'relative',
    width: 155,
    height: 30,
    backgroundColor: '#E6E6E6',
    borderRadius: 20,
  },
  buttonIndicator: {
    width: 65,
    height: 30,
    backgroundColor: `${COLOR.blue}`,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonShadow: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.20)',
        shadowOffset: {
          width: 1,
          height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 0,
        backgroundColor: `${COLOR.blue}`,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  buttonText: {
    position: 'absolute',
    display: 'flex',
    top: 9,
    height: 30,
    textAlign: 'center',
    color: '#888',
    fontWeight: '600',
    fontSize: 12,
  },
  leftText: {
    left: 0,
    width: 65,
  },
  rightText: {
    right: 0,
    width: 98,
  },
});

export default SwitchButton;
