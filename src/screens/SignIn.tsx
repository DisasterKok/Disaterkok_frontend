import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import COLOR from '../constants/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import useInput from '../hooks/useInput';
import { LoggedOutStackParamList } from '../navigation/types';
import useSignIn from '../hooks/queries/Auth/useSignIn';

type SignInScreenProps = NativeStackScreenProps<LoggedOutStackParamList, 'SignIn'>;

export default function SignIn({ navigation }: SignInScreenProps) {
  const [inputIdFocused, setInputIdFocused] = useState(false);
  const [inputPasswordFocused, setInputPasswordFocused] = useState(false);
  const [username, onChangeUsername] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [activeLoginButton, setActiveLoginButton] = useState(false);

  const { signInMutation } = useSignIn();

  const checkActiveLoginButton = () => {
    setActiveLoginButton(!!username && !!password);
  };

  const gotoSignUp = () => {
    navigation.navigate('SignUp');
  };

  const submitLoginForm = (e: any) => {
    e.preventDefault();
    signInMutation.mutate({ username, password });
  };

  useEffect(() => {
    checkActiveLoginButton();
  }, [username, password]);

  return (
    <View style={styles.layout}>
      <View style={styles.logo}>
        <Text>로고</Text>
      </View>
      <View style={styles.signForm}>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>아이디</Text>
          <TextInput
            style={
              inputIdFocused
                ? StyleSheet.compose(styles.textInput, styles.textInputActive)
                : styles.textInput
            }
            placeholder="아이디를 입력해주세요"
            importantForAutofill="yes"
            clearButtonMode="always"
            onFocus={() => setInputIdFocused(true)}
            onBlur={() => setInputIdFocused(false)}
            onChangeText={onChangeUsername}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>비밀번호</Text>
          <TextInput
            style={
              inputPasswordFocused
                ? StyleSheet.compose(styles.textInput, styles.textInputActive)
                : styles.textInput
            }
            placeholder="비밀번호를 입력해주세요"
            importantForAutofill="yes"
            clearButtonMode="always"
            onFocus={() => setInputPasswordFocused(true)}
            onBlur={() => setInputPasswordFocused(false)}
            onChangeText={onChangePassword}
            autoCapitalize="none"
            secureTextEntry
          />
        </View>
        <Pressable
          onPress={submitLoginForm}
          style={
            activeLoginButton
              ? StyleSheet.compose(styles.loginButton, styles.loginButtonActive)
              : styles.loginButton
          }
          disabled={!activeLoginButton}
        >
          <Text style={styles.loginButtonText}>로그인</Text>
        </Pressable>
      </View>
      <View style={styles.loginBottomTap}>
        <Pressable>
          <Text style={styles.loginBottomTapText}>아이디 찾기</Text>
        </Pressable>
        <Pressable style={styles.loginBottomTapCenter}>
          <Text style={styles.loginBottomTapText}>비밀번호 찾기</Text>
        </Pressable>
        <Pressable onPress={gotoSignUp}>
          <Text style={styles.loginBottomTapText}>회원가입</Text>
        </Pressable>
      </View>
      <View style={styles.easyLoginContainer}>
        <Text style={styles.easyLoginText}>간편 로그인</Text>
        <View style={styles.easyLoginButtonTap}>
          <Image source={require('../assets/social/kakao.png')} style={styles.easyLoginButton} />
          <Image source={require('../assets/social/naver.png')} style={styles.easyLoginButton} />
          <Image source={require('../assets/social/google.png')} style={styles.easyLoginButton} />

          {/* <View style={styles.easyLoginButton}></View>
          <View style={styles.easyLoginButton}></View>
          <View style={styles.easyLoginButton}></View> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    alignItems: 'center',
    paddingTop: 100,
  },
  logo: {
    width: 75,
    height: 75,
    backgroundColor: `${COLOR.middleGray}`,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signForm: {
    width: '100%',
    alignItems: 'center',
  },
  inputWrapper: {
    width: '100%',
    padding: 20,
  },
  textInput: {
    padding: 5,
    fontSize: 14,
    borderBottomWidth: 2,
    borderBottomColor: `${COLOR.middleGray}`,
  },
  textInputActive: {
    borderBottomColor: `${COLOR.black}`,
  },

  label: {
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: `${COLOR.deactivated}`,
    width: 346,
    height: 48,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
  loginButtonActive: {
    backgroundColor: `${COLOR.primary}`,
  },
  loginBottomTap: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    marginTop: 10,
  },
  loginBottomTapCenter: {
    borderLeftWidth: 1,
    borderColor: `${COLOR.gray}`,
    borderRightWidth: 1,
    paddingHorizontal: 20,
  },
  loginBottomTapText: {
    color: `${COLOR.gray}`,
  },
  easyLoginContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  easyLoginText: {
    fontSize: 14,
    color: `${COLOR.middleGray}`,
    marginBottom: 15,
  },
  easyLoginButtonTap: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
  },
  easyLoginButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: `${COLOR.middleGray}`,
  },
});
