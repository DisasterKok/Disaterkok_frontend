import Card from './Card';
import { Text, StyleSheet, Image } from 'react-native';
import COLOR from '../../../constants/colors';

const DustCard = ({ dust }: { dust: number }) => {
  const texts = ['좋아요', '나빠요', '최악'];
  let index = 0;
  if (dust < 35) {
    index = 0;
  } else if (dust >= 35 && dust < 75) {
    index = 1;
  } else if (dust >= 75) {
    index = 2;
  }

  return (
    <Card>
      <Text style={styles.tempText}>미세먼지</Text>
      {index === 0 && (
        <Image
          source={require('../../../assets/weatherIcons/dust_good.png')}
          style={{ width: 20, height: 20 }}
        />
      )}
      {index === 1 && (
        <Image
          source={require('../../../assets/weatherIcons/dust_bad.png')}
          style={{ width: 20, height: 20 }}
        />
      )}
      {index === 2 && (
        <Image
          source={require('../../../assets/weatherIcons/dust_worst.png')}
          style={{ width: 20, height: 20 }}
        />
      )}
      <Text style={styles.tempDes}>{texts[index]}</Text>
    </Card>
  );
};

export default DustCard;

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
