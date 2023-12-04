import React from 'react';
import Card from './Card';
import { Text, StyleSheet } from 'react-native';
import COLOR from '../../../constants/colors';

const TemperatureCard = ({ temperature }: { temperature: number }) => {
  const texts = ['추워요', '쌀쌀해요', '따뜻해요', '더워요'];
  const textColors = ['#CFD9FC', '#6E8CF7', '#F7B06E', '#F76E6E'];
  let index = 0;
  if (temperature < 12) {
    index = 0;
  } else if (temperature >= 12 && temperature < 19) {
    index = 1;
  } else if (temperature >= 19 && temperature < 24) {
    index = 2;
  } else {
    index = 3;
  }

  return (
    <Card>
      <Text style={styles.tempText}>기온</Text>
      <Text style={[styles.tempNum, { color: textColors[index] }]}>{temperature}°</Text>
      <Text style={styles.tempDes}>{texts[index]}</Text>
    </Card>
  );
};

export default TemperatureCard;

const styles = StyleSheet.create({
  tempText: {
    color: '#9B9B9B',
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 17,
  },
  tempNum: {
    color: `${COLOR.primary}`,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 17,
    left: 2,
  },
  tempDes: {
    color: '#666',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 14,
  },
});
