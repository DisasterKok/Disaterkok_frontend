import React from 'react';
import { Text, View, Image, StyleSheet, Pressable } from 'react-native';
import COLOR from '../constants/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UserInputStackParamList } from '../navigation/types';
import { useQueryClient } from '@tanstack/react-query';
import useUser from '../hooks/queries/Auth/useUser';

type CompleteRegionScreenProps = NativeStackScreenProps<
  UserInputStackParamList,
  'CompleteRegionSetting'
>;

const CompleteRegionSetting = ({ route }: CompleteRegionScreenProps) => {
  const { username, locData } = route.params;
  const { userData } = useUser();
  const queryClient = useQueryClient();

  const handleSubmit = () => {
    queryClient.setQueryData(['user'], {
      username: username,
      locData: locData,
      token: userData?.token,
    });
  };

  return (
    <View style={styles.layout}>
      <Text style={styles.text}>
        필요한 설정이 모두 완료되었어요{'\n'}재난콕과 함께 안전한 하루를 시작해볼까요?
      </Text>
      <Image source={require('../assets/onboarding/onboarding_3.png')} style={styles.image} />
      <Pressable style={styles.Button} onPress={handleSubmit}>
        <Text style={styles.ButtonText}>재난콕 시작하기</Text>
      </Pressable>
    </View>
  );
};

export default CompleteRegionSetting;

const styles = StyleSheet.create({
  layout: {
    width: '100%',
    height: '100%',
    paddingVertical: 70,
    paddingTop: 100,
    backgroundColor: `${COLOR.whiteBackground}`,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 18,
    fontWeight: '400',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  Button: {
    backgroundColor: `${COLOR.primary}`,
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
