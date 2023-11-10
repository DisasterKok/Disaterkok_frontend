import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import COLOR from '../constants/colors';
import useInput from '../hooks/useInput';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LoggedOutStackParamList } from '../navigation/types';

type SignUpScreenProps = NativeStackScreenProps<LoggedOutStackParamList, 'SignUp'>;

export default function SignUp({ navigation }: SignUpScreenProps) {
  const [inputIdFocused, setInputIdFocused] = useState(false);
  const [inputEmailFocuesd, setInputEmailFocuesd] = useState(false);
  const [inputPasswordFocused, setInputPasswordFocused] = useState(false);
  const [inputPasswordConfirmFocused, setInputPasswordConfirmFocused] = useState(false);

  const [id, onChangeId] = useInput('');
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordConfirm, onChangePasswordConfirm] = useInput('');

  const [activeSignUpButton, setActiveSignUpButton] = useState(false);

  const [idError, setIdError] = useState('');
  const [emailError, setEmailError] = useState('');
  // const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');

  const [checkSubmit, setCheckSubmit] = useState(false);

  const checkActiveLoginButton = () => {
    setActiveSignUpButton(!!id && !!email && !!password && !!passwordConfirm);
  };

  const checkNameValidation = (id: string) => {
    let isChekced = false;

    if (id.length < 2) setIdError('사용할 수 없는 아이디에요');
    else {
      setIdError('');
      isChekced = true;
    }

    return isChekced;
  };

  const checkEmailValidation = (email: string) => {
    let isChekced = false;
    const emailRegEx =
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

    if (!emailRegEx.test(email)) setEmailError('잘못된 이메일 형식이에요');
    else {
      setEmailError('');
      isChekced = true;
    }

    return isChekced;
  };

  const checkConfirmedPasswordValidation = (password: string) => {
    let isChecked = false;
    if (password !== passwordConfirm) setPasswordConfirmError('비밀번호가 일치하지 않습니다');
    else {
      setPasswordConfirmError('');
      isChecked = true;
    }

    return isChecked;
  };

  const checkAllValidation = (id: string, email: string, password: string) => {
    // 유효성 검사 방식 정해지면 추후 수정
    const checkedName = checkNameValidation(id);
    const checkedEmail = checkEmailValidation(email);
    const checkedConfirmedPassword = checkConfirmedPasswordValidation(password);

    return checkedName && checkedEmail && checkedConfirmedPassword;
  };

  const onSubmit = () => {
    checkAllValidation(id, email, password);
    setCheckSubmit(true);
    navigation.navigate('SetName', { id: id, email: email, password: password });
  };

  useEffect(() => {
    checkActiveLoginButton();
  }, [id, email, password, passwordConfirm]);

  return (
    <View style={styles.layout}>
      <View style={styles.title}>
        <Text style={styles.titleText}>회원가입</Text>
      </View>
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
          onChangeText={onChangeId}
          autoCapitalize="none"
        />
        {idError ? (
          <View style={styles.submitReturnText}>
            <Image source={require('../assets/images/sad.png')} />
            <Text style={styles.errorText}>{idError}</Text>
          </View>
        ) : (
          checkSubmit && (
            <View style={styles.submitReturnText}>
              <Image source={require('../assets/images/smile.png')} />
              <Text style={styles.successText}>사용 가능한 아이디에요</Text>
            </View>
          )
        )}
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          style={
            inputEmailFocuesd
              ? StyleSheet.compose(styles.textInput, styles.textInputActive)
              : styles.textInput
          }
          placeholder="이메일을 입력해주세요"
          importantForAutofill="yes"
          clearButtonMode="always"
          onFocus={() => setInputEmailFocuesd(true)}
          onBlur={() => setInputEmailFocuesd(false)}
          onChangeText={onChangeEmail}
          autoCapitalize="none"
        />

        {emailError ? (
          <View style={styles.submitReturnText}>
            <Image source={require('../assets/images/sad.png')} />
            <Text style={styles.errorText}>{emailError}</Text>
          </View>
        ) : (
          checkSubmit && (
            <View style={styles.submitReturnText}>
              <Image source={require('../assets/images/smile.png')} />
              <Text style={styles.successText}>사용 가능한 이메일이에요</Text>
            </View>
          )
        )}
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
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>비밀번호 확인</Text>
        <TextInput
          style={
            inputPasswordConfirmFocused
              ? StyleSheet.compose(styles.textInput, styles.textInputActive)
              : styles.textInput
          }
          placeholder="비밀번호를 다시 입력해주세요"
          importantForAutofill="yes"
          clearButtonMode="always"
          onFocus={() => setInputPasswordConfirmFocused(true)}
          onBlur={() => setInputPasswordConfirmFocused(false)}
          onChangeText={onChangePasswordConfirm}
          autoCapitalize="none"
          secureTextEntry
        />

        {passwordConfirmError ? (
          <View style={styles.submitReturnText}>
            <Image source={require('../assets/images/sad.png')} />
            <Text style={styles.errorText}>{passwordConfirmError}</Text>
          </View>
        ) : (
          checkSubmit && (
            <View style={styles.submitReturnText}>
              <Image source={require('../assets/images/smile.png')} />
              <Text style={styles.successText}>사용 가능한 비밀번호에요</Text>
            </View>
          )
        )}
      </View>
      <Pressable
        style={
          activeSignUpButton
            ? StyleSheet.compose(styles.loginButton, styles.loginButtonActive)
            : styles.loginButton
        }
        disabled={!activeSignUpButton}
        onPress={onSubmit}
      >
        <Text style={styles.loginButtonText}>다음</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    alignItems: 'center',
  },
  title: {
    marginVertical: 30,
  },
  titleText: {
    fontSize: 16,
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
    backgroundColor: `${COLOR.middleGray}`,
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
  successText: {
    color: `${COLOR.blue}`,
    fontSize: 12,
  },
  errorText: {
    color: `${COLOR.red}`,
    fontSize: 12,
  },
  submitReturnText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
});
