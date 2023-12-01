import React from 'react';
import { Text, View, Image, StyleSheet, Pressable } from 'react-native';
import COLOR from '../constants/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LoggedOutStackParamList } from '../navigation/types';

type CompleteLoginScreenProps = NativeStackScreenProps<LoggedOutStackParamList, 'CompleteLogin'>;

const CompleteLogin = ({ navigation }: CompleteLoginScreenProps) => {
  const handleSubmit = () => {
    // navigation.navigate('Home');
    // login('1234'); //임시로그인
  };

  return (
    <View style={styles.layout}>
      <Text style={styles.text}>
        필요한 설정이 모두 완료되었어요{'\n'}재난콕과 함께 안전한 하루를 시작해볼까요?
      </Text>
      <Image source={require('../assets/images/onboardingtmpBox.png')} style={styles.image} />
      <Pressable style={styles.Button} onPress={handleSubmit}>
        <Text style={styles.ButtonText}>재난콕 시작하기</Text>
      </Pressable>
    </View>
  );
};

export default CompleteLogin;

const styles = StyleSheet.create({
  layout: {
    width: '100%',
    height: '100%',
    display: 'flex',
    padding: 22,
    flexDirection: 'column',
    backgroundColor: `${COLOR.whiteBackground}`,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  text: {
    position: 'absolute',
    fontSize: 18,
    fontWeight: '400',
    top: 65,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  Button: {
    backgroundColor: `${COLOR.primary}`,
    position: 'absolute',
    bottom: 15,
    width: 346,
    height: 48,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonText: {
    color: 'white',
    fontSize: 14,
  },
});
