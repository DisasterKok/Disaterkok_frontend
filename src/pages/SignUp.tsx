import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import COLOR from '../constants/colors';

export default function SignUp() {
  const [inputIdFocused, setInputIdFocused] = useState(false);
  const [inputEmailFocuesd, setInputEmailFocuesd] = useState(false);
  const [inputPasswordFocused, setInputPasswordFocused] = useState(false);
  const [inputPasswordConfirmFocused, setInputPasswordConfirmFocused] = useState(false);
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
          autoCapitalize="none"
        />
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
          autoCapitalize="none"
          secureTextEntry
        />
      </View>
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
    borderBottomColor: `${COLOR.lightGray}`,
  },
  textInputActive: {
    borderBottomColor: `${COLOR.black}`,
  },

  label: {
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 20,
  },
});
