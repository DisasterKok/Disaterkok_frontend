import React from 'react';
import { Text, View, StyleSheet, TextInput, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import COLOR from '../../constants/colors';
import Separator from '../Separator';
import useInput from '../../hooks/useInput';
import AliasTypeButton from './AliasTypeButton';

export interface AddressData {
  address: string;
  roadAddress: string;
  zoneCode: string; // 우편번호
  xCoordinate: number;
  yCoordinate: number;
}

interface AliasData {
  aliasType: string;
  name: string;
  default: boolean;
  alarm: boolean;
}

const AliasPostcode = ({
  addressData,
  aliasData,
  updateAddress,
  goBack,
}: {
  addressData: AddressData;
  aliasData?: AliasData;
  updateAddress: (data: any) => void;
  goBack: () => void;
}) => {
  const { address, roadAddress, zoneCode, xCoordinate, yCoordinate } = addressData;
  const [aliasType, setAliasType] = React.useState<string>(aliasData?.aliasType || '');
  const [name, setName] = useInput(aliasData?.name || '');
  const [isEtc, setIsEtc] = React.useState<boolean>(aliasData?.aliasType == 'etc' || false);

  const [inputNameFocused, setInputNameFocused] = React.useState(false);

  const onChangeAliasType = (text: string) => {
    setAliasType(text);
    if (text === 'home') {
      setAliasType('home');
      setName('집');
      setIsEtc(false);
    } else if (text === 'work') {
      setAliasType('work');
      setName('회사');
      setIsEtc(false);
    } else if (text === 'school') {
      setAliasType('school');
      setName('학교');
      setIsEtc(false);
    } else if (text === 'etc') {
      if (aliasType === 'etc') return;
      setAliasType('etc');
      setName('');
      setIsEtc(true);
    }
  };

  const onChangeName = (text: string) => {
    setName(text);
  };

  const handleUpdateAddress = () => {
    const newAliasData = {
      addressData: {
        address,
        roadAddress,
        zoneCode,
        xCoordinate,
        yCoordinate,
      },
      aliasType,
      name,
      default: aliasData?.default || false,
      alarm: aliasData?.alarm || false,
    };
    updateAddress(newAliasData);
  };

  return (
    <>
      <View style={styles.layout}>
        <View style={styles.header}>
          <View style={styles.tabBar}>
            <Pressable onPress={goBack}>
              <Icon name="chevron-back-outline" style={styles.gobackIcon} />
            </Pressable>
          </View>
          <Text style={styles.headerText}>주소 별명을 선택해주세요</Text>
        </View>
        <Separator />
        <View style={styles.inputBox}>
          <View>
            <Text style={styles.jibunText}>{address}</Text>
            <View style={styles.roadBox}>
              <View style={styles.roadIcon}>
                <Text style={styles.roadIconText}>도로명</Text>
              </View>
              <Text style={styles.roadText}>{roadAddress}</Text>
            </View>
          </View>
          <View style={styles.buttonGroup}>
            <AliasTypeButton
              selected={aliasType === 'home'}
              buttonName="집"
              onPress={() => onChangeAliasType('home')}
            />
            <AliasTypeButton
              selected={aliasType === 'work'}
              buttonName="회사"
              onPress={() => onChangeAliasType('work')}
            />
            <AliasTypeButton
              selected={aliasType === 'school'}
              buttonName="학교"
              onPress={() => onChangeAliasType('school')}
            />
            <AliasTypeButton
              selected={aliasType === 'etc'}
              buttonName="기타"
              onPress={() => onChangeAliasType('etc')}
            />
          </View>
          {isEtc && (
            <View>
              <TextInput
                style={
                  inputNameFocused
                    ? StyleSheet.compose(styles.textInput, styles.textInputActive)
                    : styles.textInput
                }
                placeholder="주소 별명을 입력해주세요"
                onFocus={() => setInputNameFocused(true)}
                onBlur={() => setInputNameFocused(false)}
                value={name}
                onChangeText={onChangeName}
                autoCapitalize="none"
              />
            </View>
          )}
        </View>
        <Pressable
          style={
            aliasType && name
              ? StyleSheet.compose(styles.Button, styles.ButtonActive)
              : styles.Button
          }
          disabled={!aliasType || !name}
          onPress={handleUpdateAddress}
        >
          <Text style={styles.ButtonText}>다음</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  layout: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    alignItems: 'center',
    backgroundColor: `${COLOR.white}`,
    position: 'relative',
  },
  header: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    padding: 14,
  },
  tabBar: {
    height: 64,
    justifyContent: 'center',
  },
  gobackIcon: {
    fontSize: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '400',
    marginLeft: 8,
  },
  jibunText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  roadBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  roadIcon: {
    display: 'flex',
    width: 30,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: `${COLOR.lightGray}`,
    marginRight: 7,
  },
  roadIconText: {
    textAlign: 'center',
    fontSize: 8,
    color: `${COLOR.gray}`,
  },
  roadText: {
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 20,
    color: `${COLOR.gray}`,
  },
  inputBox: {
    display: 'flex',
    flexDirection: 'column',
    padding: 22,
    gap: 14,
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
  buttonGroup: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
});

export default AliasPostcode;
