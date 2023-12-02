import React from 'react';
import Card from './Card';
import { Text, StyleSheet, Image } from 'react-native';

const HumidCard = ({ humid }: { humid: number }) => {
  let imageSource;
  if (humid >= 1 && humid < 10) {
    imageSource = require('../../../assets/weatherIcons/humidity/one.png');
  } else if (humid >= 10 && humid < 50) {
    imageSource = require('../../../assets/weatherIcons/humidity/two.png');
  } else if (humid >= 50 && humid < 70) {
    imageSource = require('../../../assets/weatherIcons/humidity/three.png');
  } else if (humid >= 70 && humid < 80) {
    imageSource = require('../../../assets/weatherIcons/humidity/four.png');
  } else if (humid >= 80 && humid < 99) {
    imageSource = require('../../../assets/weatherIcons/humidity/five.png');
  } else if (humid >= 100) {
    imageSource = require('../../../assets/weatherIcons/humidity/six.png');
  }

  return (
    <Card>
      <Text style={styles.humidText}>습도</Text>
      <Image source={imageSource} style={{ width: 20, height: 20, objectFit: 'contain' }} />
      <Text style={styles.humidDes}>{humid}%</Text>
    </Card>
  );
};

export default HumidCard;

const styles = StyleSheet.create({
  humidText: {
    color: '#9B9B9B',
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 17,
  },
  humidDes: {
    color: '#666',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 14,
  },
});
