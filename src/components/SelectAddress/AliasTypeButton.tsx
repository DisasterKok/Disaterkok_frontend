import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import COLOR from '../../constants/colors';

const AliasTypeButton = ({
  selected,
  buttonName,
  onPress,
}: {
  selected: boolean;
  buttonName: string;
  onPress: () => void;
}) => {
  return (
    <Pressable style={[styles.typeButton, selected && styles.typeButtonSelected]} onPress={onPress}>
      <Text style={[styles.typeText, selected && styles.typeTextSelected]}>{buttonName}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  typeButton: {
    width: 76,
    height: 40,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: `${COLOR.gray}`,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${COLOR.white}`,
    color: `${COLOR.gray}`,
  },
  typeButtonSelected: {
    borderColor: `${COLOR.primary}`,
    backgroundColor: `${COLOR.primary}`,
    color: `${COLOR.white}`,
  },
  typeText: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    color: `${COLOR.gray}`,
  },
  typeTextSelected: {
    color: `${COLOR.white}`,
  },
});

export default AliasTypeButton;
