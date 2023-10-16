import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import Swiper from 'react-native-swiper';
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import COLOR from '../constants/colors';

type OnboardingScreenProps = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const Onboarding = ({ navigation }: OnboardingScreenProps) => {
  const gotoSignIn = () => {
    navigation.navigate('DisaterNotiSettings');
  };

  return (
    <Swiper
      loop={false}
      showsButtons={true}
      dot={<View style={styles.dot} />}
      activeDot={<View style={styles.activeDot} />}
      nextButton={<Text style={styles.buttonText}>›</Text>}
      prevButton={<Text style={styles.buttonText}>‹</Text>}
    >
      <View style={styles.slide}>
        <Image source={require('../assets/images/onboardingtmpBox.png')} style={styles.image} />
        <View style={styles.title}>
          <Text style={styles.titleText}>내가 원하는 지역을 설정하고,</Text>
          <Text style={styles.titleText}>실시간 제보를 통해 재난 상황을 확인해요</Text>
        </View>
      </View>
      <View style={styles.slide}>
        <Image source={require('../assets/images/onboardingtmpBox.png')} style={styles.image} />
        <View style={styles.title}>
          <Text style={styles.titleText}>개별 재난 알림 설정을 통해</Text>
          <Text style={styles.titleText}>나에게 필요한 알림을 받을 수 있어요</Text>
        </View>
      </View>
      <View style={StyleSheet.compose(styles.slide, styles.lastSlide)}>
        <Image source={require('../assets/images/onboardingtmpBox.png')} style={styles.image} />
        <View style={StyleSheet.compose(styles.title, styles.lastTitle)}>
          <Text style={styles.titleText}>생성한 재난 상황을 실시간으로,</Text>
          <Text style={styles.titleText}>재난콕과 안전한 하루를 시작해볼까요?</Text>
        </View>
        <Pressable style={styles.loginButton} onPress={gotoSignIn}>
          <Text style={styles.loginButtonText}>로그인하기</Text>
        </Pressable>
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  lastSlide: {
    justifyContent: 'flex-end',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    alignItems: 'center',
  },
  lastTitle: {
    marginBottom: 110,
  },
  titleText: {
    fontSize: 14,
    marginBottom: 4,
  },
  dot: {
    backgroundColor: `${COLOR.lightGray}`,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    marginBottom: 100,
  },
  activeDot: {
    backgroundColor: `${COLOR.black}`,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    marginBottom: 100,
  },
  buttonText: {
    fontSize: 40,
    color: `${COLOR.black}`,
  },
  loginButton: {
    width: '90%',
    height: 50,
    backgroundColor: `${COLOR.blue}`,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  loginButtonText: {
    fontSize: 14,
    color: `${COLOR.white}`,
  },
});

export default Onboarding;
