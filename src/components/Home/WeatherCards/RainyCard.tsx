import Card from './Card';
import { Text, StyleSheet, Image } from 'react-native';
import COLOR from '../../../constants/colors';

const RainyCard = ({ rainPos }: { rainPos: number }) => {
  let imageSource;
  imageSource = require('../../../assets/weatherIcons/rain/zero.png');
  if (rainPos >= 1 && rainPos < 10) {
    imageSource = require('../../../assets/weatherIcons/rain/one.png');
  } else if (rainPos >= 10 && rainPos < 50) {
    imageSource = require('../../../assets/weatherIcons/rain/two.png');
  } else if (rainPos >= 50 && rainPos < 70) {
    imageSource = require('../../../assets/weatherIcons/rain/three.png');
  } else if (rainPos >= 70 && rainPos < 80) {
    imageSource = require('../../../assets/weatherIcons/rain/four.png');
  } else if (rainPos >= 80 && rainPos < 99) {
    imageSource = require('../../../assets/weatherIcons/rain/five.png');
  } else if (rainPos >= 100) {
    imageSource = require('../../../assets/weatherIcons/rain/six.png');
  }
  return (
    <Card>
      <Text style={styles.rainText}>강수</Text>
      <Image source={imageSource} style={{ width: 20, height: 20, objectFit: 'contain' }} />
      <Text style={styles.rainDes}>{rainPos}%</Text>
    </Card>
  );
};

export default RainyCard;

const styles = StyleSheet.create({
  rainText: {
    color: '#9B9B9B',
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 17,
  },
  rainNum: {
    color: `${COLOR.primary}`,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 17,
    left: 2,
  },
  rainDes: {
    color: '#666',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 14,
  },
});
