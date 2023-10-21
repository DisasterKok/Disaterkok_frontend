import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import COLOR from '../constants/colors';
import useInput from '../hooks/useInput';
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type SetNameScreenProps = NativeStackScreenProps<RootStackParamList, 'SetName'>;

export default function SetName({ navigation }: SetNameScreenProps) {
  const [inputNicknameFocused, setInputNicknameFocused] = useState(false);

  const [nickname, onChangeNickname] = useInput('');

  const [activeNextButton, setActiveNextButton] = useState(false);

  const [lengthError, setLengthError] = useState(false);
  const [charError, setCharError] = useState(false);

  const checkActiveButton = () => {
    setActiveNextButton(!!nickname && !lengthError && !charError);
  };

  const checkNameValidation = (nickname: string) => {
    const specialChar = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/;
    if (nickname.length > 10) setLengthError(true);
    else setLengthError(false);
    if (specialChar.test(nickname)) setCharError(true);
    else setCharError(false);
  };

  const onSubmit = () => {
    navigation.navigate('SelectLocation');
  };

  useEffect(() => {
    checkActiveButton();
    checkNameValidation(nickname);
  }, [nickname]);

  return (
    <View style={styles.layout}>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>닉네임</Text>
        <TextInput
          style={
            inputNicknameFocused
              ? StyleSheet.compose(styles.textInput, styles.textInputActive)
              : styles.textInput
          }
          placeholder="닉네임을 입력해주세요"
          clearButtonMode="always"
          onFocus={() => setInputNicknameFocused(true)}
          onBlur={() => setInputNicknameFocused(false)}
          onChangeText={onChangeNickname}
          autoCapitalize="none"
        />
        <View style={styles.submitReturnText}>
          <Image
            source={
              lengthError
                ? require('../assets/images/sad.png')
                : require('../assets/images/smile.png')
            }
          />
          <Text style={lengthError ? styles.errorText : styles.successText}>10자 이내</Text>
          <Text>{'   '}</Text>
          <Image
            source={
              charError
                ? require('../assets/images/sad.png')
                : require('../assets/images/smile.png')
            }
          />
          <Text style={charError ? styles.errorText : styles.successText}>특수기호 사용안함</Text>
        </View>
      </View>
      <Pressable
        style={
          activeNextButton ? StyleSheet.compose(styles.Button, styles.ButtonActive) : styles.Button
        }
        disabled={!activeNextButton}
        onPress={onSubmit}
      >
        <Text style={styles.ButtonText}>다음</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    alignItems: 'center',
    position: 'relative',
    height: '100%',
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
  Button: {
    backgroundColor: `${COLOR.lightGray}`,
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
    fontSize: 16,
  },
  ButtonActive: {
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
