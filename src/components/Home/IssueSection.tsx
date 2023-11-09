import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import COLOR from '../../constants/colors';

const IssueSection = ({ isLocalSelected }: { isLocalSelected: boolean }) => {
  return (
    <View style={styles.sectionCard}>
      {isLocalSelected ? <Text>우리동네 키워드</Text> : <Text>실슈 체크</Text>}
    </View>
  );
};

export default IssueSection;

const styles = StyleSheet.create({
  sectionCard: {
    display: 'flex',
    padding: 15,
    justifyContent: 'center',
    width: '100%',
    height: 120,
    backgroundColor: `${COLOR.white}`,
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.03)',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
    marginBottom: 30,
  },
});
