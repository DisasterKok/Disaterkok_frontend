import Card from './Card';
import { Text, StyleSheet } from 'react-native';
import COLOR from '../../../constants/colors';

const HumidCard = ({ humid }: { humid: number }) => {
  return (
    <Card>
      <Text style={styles.tempText}>습도</Text>
      <Text style={styles.tempDes}>{humid}%</Text>
    </Card>
  );
};

export default HumidCard;

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
