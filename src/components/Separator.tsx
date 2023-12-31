import { View, StyleSheet } from 'react-native';
import COLOR from '../constants/colors';

const Separator = () => {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  separator: {
    width: '100%',
    borderBottomWidth: 5,
    borderBottomColor: `${COLOR.lightGray}`,
  },
});

export default Separator;
