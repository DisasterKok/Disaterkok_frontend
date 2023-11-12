import React from 'react';
import { View, Text } from 'react-native';
import COLOR from '../../constants/colors';

const WeatherSection = () => {
  return (
    <View style={{ height: 146, backgroundColor: `${COLOR.secondary}` }}>
      <Text>날씨영역</Text>
    </View>
  );
};

export default WeatherSection;
