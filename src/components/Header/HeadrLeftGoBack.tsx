import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import COLOR from '../../constants/colors';

const HeaderLeftGoBack = () => {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.goBack()} hitSlop={8}>
      <View>
        <Icon size={24} name="chevron-back" color={COLOR.black} />
      </View>
    </Pressable>
  );
};

export default HeaderLeftGoBack;
