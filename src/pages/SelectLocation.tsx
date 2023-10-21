import React, { useEffect } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import COLOR from '../constants/colors';
import Icon from 'react-native-vector-icons/Feather';
import SearchPostcode from '../components/SelectAddress/SearchPostcode';
import AliasPostcode from '../components/SelectAddress/AliasPostcode';
import useAddressData from '../hooks/useAddressData';
import getCurrentLocation from '../components/SelectAddress/GetCurrentLocation';
type SelectLocScreenProps = NativeStackScreenProps<RootStackParamList, 'SelectLocation'>;

const AddressDataList = [
  {
    addressData: {
      address: '서울특별시 서초구 서초동',
      roadAddress: '서울특별시 서초구 서초대로 396',
      zoneCode: '06626',
    },
    detail: '204호',
    aliasType: 'home',
    name: '집',
    default: true,
  },
  {
    addressData: {
      address: '서울특별시 서초구 서초동',
      roadAddress: '서울특별시 서초구 서초대로 396',
      zoneCode: '06626',
    },
    detail: '204호',
    aliasType: 'work',
    name: '회사',
    default: true,
  },
  {
    addressData: {
      address: '서울특별시 서초구 서초동',
      roadAddress: '서울특별시 서초구 서초대로 396',
      zoneCode: '06626',
    },
    detail: '',
    aliasType: 'etc',
    name: '칭구칑긔집',
    default: true,
  },
];

export default function SelectLoc({ navigation }: SelectLocScreenProps) {
  const [addressDataList, setAddressDataList] = React.useState(AddressDataList);

  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isSearchAliasOpen, setIsSearchAliasOpen] = React.useState(false);
  const [isCurrentAliasOpen, setIsCurrentAliasOpen] = React.useState(false);

  const { data, setAddressData, resetAddressData } = useAddressData({
    address: '',
    roadAddress: '',
    zoneCode: '',
  });

  const openModal = () => {
    setIsSearchOpen(true);
  };

  const handleSelect = (data: any) => {
    setIsSearchOpen(false);
    //console.log(data);
    setAddressData({
      address: data.jibunAddress ? data.jibunAddress : data.autoJibunAddress,
      roadAddress: data.roadAddress ? data.roadAddress : data.autoRoadAddress,
      zoneCode: data.zonecode,
    });
    setIsSearchAliasOpen(true);
  };

  const handleCurrentSelect = () => {
    getCurrentLocation()
      .then((data: any) => {
        setAddressData({
          address: data.address,
          roadAddress: data.roadAddress,
          zoneCode: data.zoneCode,
        });
        setIsCurrentAliasOpen(true);
      })
      .catch((error) => {
        // console.log(error);
        console.log('위치를 얻는 도중 오류가 발생했습니다.');
      });
  };

  const handleAddAddress = (data: any) => {
    const updatedAddressDataList = [...addressDataList];
    const newData = {
      addressData: data.addressData,
      detail: data.detail,
      aliasType: data.aliasType,
      name: data.name,
      default: !updatedAddressDataList ? true : data.default,
    };
    updatedAddressDataList.push(newData);
    setAddressDataList(updatedAddressDataList);
    resetAddressData();
    if (isSearchAliasOpen) setIsSearchAliasOpen(false);
    else if (isCurrentAliasOpen) setIsCurrentAliasOpen(false);
  };

  const backToSearch = () => {
    setIsSearchAliasOpen(false);
    setIsSearchOpen(true);
  };

  const handleSubmit = () => {
    //console.log(addressDataList);
    navigation.navigate('DisaterNotiSettings');
  };

  useEffect(() => {
    //console.log(AddressDataList);
  }, [AddressDataList]);

  return (
    <>
      <View style={styles.layout}>
        <View style={styles.searchBox}>
          <View style={styles.title}>
            <Text style={styles.titleText}>재난 상황을 확인하고 싶은{'\n'}동네를 설정해주세요</Text>
            <Text style={styles.explanation}>이후 홈화면에서 편집하거나 추가할 수 있어요</Text>
          </View>
          <View style={styles.searchBar}>
            <Icon name="search" size={14} style={styles.searchIcon} />
            <TextInput
              placeholder="지번, 도로명, 건물명으로 검색"
              style={styles.textInput}
              onFocus={openModal}
            />
          </View>
          <View>
            <Pressable onPress={handleCurrentSelect}>
              <Text>실시간</Text>
            </Pressable>
          </View>
        </View>
        <SafeAreaView style={{ width: '100%' }}>
          <ScrollView style={styles.list}>
            <View>
              {addressDataList &&
                addressDataList.map((data, index) => (
                  <View key={index} style={styles.listItem}>
                    <Text style={styles.listName}>{data.name}</Text>
                    <View style={styles.roadBox}>
                      <View style={styles.roadIcon}>
                        <Text style={styles.roadIconText}>도로명</Text>
                      </View>
                      <Text style={styles.roadText}>
                        {data.addressData.roadAddress + ' ' + data.detail}
                      </Text>
                    </View>
                  </View>
                ))}
            </View>
          </ScrollView>
        </SafeAreaView>
        <Pressable
          style={
            !!addressDataList
              ? StyleSheet.compose(styles.Button, styles.ButtonActive)
              : styles.Button
          }
          disabled={!addressDataList}
          onPress={handleSubmit}
        >
          <Text style={styles.ButtonText}>다음</Text>
        </Pressable>
      </View>
      <Modal visible={isSearchOpen || isSearchAliasOpen || isCurrentAliasOpen}>
        {isSearchOpen && (
          <SearchPostcode
            onSelected={handleSelect}
            goBack={() => {
              setIsSearchOpen(false);
            }}
          />
        )}
        {isSearchAliasOpen && data.address && (
          <AliasPostcode addressData={data} addAddress={handleAddAddress} goBack={backToSearch} />
        )}
        {isCurrentAliasOpen && data.address && (
          <AliasPostcode
            addressData={data}
            addAddress={handleAddAddress}
            goBack={() => setIsCurrentAliasOpen(false)}
          />
        )}
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  layout: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: `${COLOR.white}`,
    height: '100%',
    position: 'relative',
    alignItems: 'center',
  },
  searchBox: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    marginBottom: 5,
    padding: 20,
  },
  title: {
    marginTop: 40,
    marginBottom: 30,
  },
  titleText: {
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 7,
  },
  explanation: {
    fontSize: 12,
    color: `${COLOR.gray}`,
  },
  searchBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: `${COLOR.darkGray}`,
    paddingBottom: 6,
  },
  searchIcon: {
    marginRight: 5,
    color: `${COLOR.gray}`,
  },
  textInput: {
    width: '95%',
  },
  list: {
    backgroundColor: `${COLOR.white}`,
    paddingLeft: 22,
    paddingRight: 22,
    width: '100%',
    height: '50%',
  },
  listItem: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingTop: 22,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: `${COLOR.lightGray}`,
  },
  listName: {
    color: `${COLOR.black}`,
    fontSize: 14,
    fontWeight: '600',
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
  Button: {
    backgroundColor: `${COLOR.middleGray}`,
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
