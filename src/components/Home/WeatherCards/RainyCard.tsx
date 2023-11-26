import Card from './Card';
import { Text, StyleSheet } from 'react-native';
import COLOR from '../../../constants/colors';

const RainyCard = ({ rainPos }: { rainPos: number }) => {
  return (
    <Card>
      <Text style={styles.tempText}>강수</Text>
      <Text style={styles.tempDes}>{rainPos}%</Text>
    </Card>
  );
};

export default RainyCard;

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
