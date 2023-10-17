import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import COLOR from '../constants/colors';

type OnboardingScreenProps = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export const Onboarding = ({ navigation }: OnboardingScreenProps) => {
  const gotoSignIn = () => {
    navigation.navigate('SignIn');
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
      <View style={styles.slide}>
        <Image source={require('../assets/images/onboardingtmpBox.png')} style={styles.image} />
        <View style={styles.title}>
          <Text style={styles.titleText}>생성한 재난 상황을 실시간으로,</Text>
          <Text style={styles.titleText} onPress={gotoSignIn}>
            재난콕과 안전한 하루를 시작해볼까요?
          </Text>
        </View>
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
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    alignItems: 'center',
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
    marginBottom: 50,
  },
  activeDot: {
    backgroundColor: `${COLOR.black}`,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    marginBottom: 50,
  },
  buttonText: {
    fontSize: 40,
    color: `${COLOR.black}`,
  },
});

export default Onboarding;
