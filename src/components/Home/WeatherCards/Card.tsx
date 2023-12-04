import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.container}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 80,
    borderRadius: 5,
    backgroundColor: '#f4f4f4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    marginRight: 10,
  },
});
