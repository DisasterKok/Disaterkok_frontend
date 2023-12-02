import Card from './Card';
import { Text, StyleSheet, Image } from 'react-native';

const UVCard = ({ uv }: { uv: number }) => {
  const texts = ['낮음', '보통', '높음', '매우높음', '위험'];
  let index = 0;
  let imageSource;
  imageSource = require('../../../assets/weatherIcons/uv/one.png');

  if (uv >= 3 && uv <= 5) {
    index = 1;
    imageSource = require('../../../assets/weatherIcons/uv/two.png');
  } else if (uv >= 6 && uv <= 7) {
    index = 2;
    imageSource = require('../../../assets/weatherIcons/uv/three.png');
  } else if (uv >= 8 && uv <= 10) {
    imageSource = require('../../../assets/weatherIcons/uv/five.png');
    index = 3;
  } else if (uv >= 11) {
    imageSource = require('../../../assets/weatherIcons/uv/six.png');
    index = 4;
  }

  return (
    <Card>
      <Text style={styles.uvText}>자외선</Text>
      <Image source={imageSource} style={{ width: 20, height: 20, objectFit: 'contain' }} />
      <Text style={styles.uvDes}>{texts[index]}</Text>
    </Card>
  );
};

export default UVCard;

const styles = StyleSheet.create({
  uvText: {
    color: '#9B9B9B',
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 17,
  },
  uvDes: {
    color: '#666',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 14,
  },
});
