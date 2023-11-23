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
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import COLOR from '../constants/colors';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import SearchPostcode from '../components/SelectAddress/SearchPostcode';
import AliasPostcode from '../components/SelectAddress/AliasPostcode';
import useAddressData from '../hooks/useAddressData';
import getCurrentLocation from '../components/SelectAddress/GetCurrentLocation';
import getAddressCoords from '../components/SelectAddress/GetAddressCoords';
import Separator from '../components/Separator';
import { LoggedOutStackParamList } from '../navigation/types';

type SelectLocScreenProps = NativeStackScreenProps<LoggedOutStackParamList, 'SelectLocation'>;

const AddressDataList = [
  {
    addressData: {
      address: '서울특별시 서초구 서초동',
      roadAddress: '서울특별시 서초구 서초대로 396',
      zoneCode: '06626',
      xCoordinate: 127.024612,
      yCoordinate: 37.495985,
    },
    aliasType: 'home',
    name: '집',
    default: true,
    alarm: true,
  },
  {
    addressData: {
      address: '서울특별시 서초구 서초동',
      roadAddress: '서울특별시 서초구 서초대로 396',
      zoneCode: '06626',
      xCoordinate: 127.024612,
      yCoordinate: 37.495985,
    },
    aliasType: 'work',
    name: '회사',
    default: false,
    alarm: false,
  },
  {
    addressData: {
      address: '서울특별시 서초구 서초동',
      roadAddress: '서울특별시 서초구 서초대로 396',
      zoneCode: '06626',
      xCoordinate: 127.024612,
      yCoordinate: 37.495985,
    },
    aliasType: 'etc',
    name: '본가',
    default: false,
    alarm: true,
  },
  {
    addressData: {
      address: '서울특별시 서초구 서초동',
      roadAddress: '서울특별시 서초구 서초대로 396',
      zoneCode: '06626',
      xCoordinate: 127.024612,
      yCoordinate: 37.495985,
    },
    aliasType: 'etc',
    name: '본가',
    default: false,
    alarm: true,
  },
];

export default function SelectLoc({ navigation }: SelectLocScreenProps) {
  const [addressDataList, setAddressDataList] = React.useState(AddressDataList);

  // 주소 찾기 모달
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  // 주소 찾기로 선택한 주소 별명 설정하기 모달
  const [isSearchAliasOpen, setIsSearchAliasOpen] = React.useState(false);
  // 현재 위치로 설정한 주소 별명 설정하기 모달
  const [isCurrentAliasOpen, setIsCurrentAliasOpen] = React.useState(false);
  // 별명 수정하기 모달
  const [isUpdateAliasOpen, setIsUpdateAliasOpen] = React.useState(false);
  const [updatingIndex, setUpdatingIndex] = React.useState<number>(0);

  // 주소 찾기로 선택한 주소
  const { data, setAddressData, resetAddressData } = useAddressData({
    address: '',
    roadAddress: '',
    zoneCode: '',
    xCoordinate: -1,
    yCoordinate: -1,
  });

  const openModal = () => {
    setIsSearchOpen(true);
  };

  // 주소 찾기로 위치 가져오기
  const handleSelect = (data: any) => {
    setIsSearchOpen(false);
    //console.log(data);
    getAddressCoords(data.jibunAddress ? data.jibunAddress : data.autoJibunAddresss)
      .then((coordinates) => {
        setAddressData({
          address: data.jibunAddress ? data.jibunAddress : data.autoJibunAddress,
          roadAddress: data.roadAddress ? data.roadAddress : data.autoRoadAddress,
          zoneCode: data.zonecode,
          xCoordinate: coordinates.longitude,
          yCoordinate: coordinates.latitude,
        });
        setIsSearchAliasOpen(true);
      })
      .catch((error) => {
        console.log(error);
        console.log('위치를 얻는 도중 오류가 발생했습니다.');
      });
  };

  // 현재 위치 가져오기
  const handleCurrentSelect = () => {
    getCurrentLocation()
      .then((data: any) => {
        setAddressData({
          address: data.address,
          roadAddress: data.roadAddress,
          zoneCode: data.zoneCode,
          xCoordinate: data.xCoordinate,
          yCoordinate: data.yCoordinate,
        });
        setIsCurrentAliasOpen(true);
      })
      .catch((error) => {
        // console.log(error);
        console.log('위치를 얻는 도중 오류가 발생했습니다.');
      });
  };

  // 주소 추기하기
  const handleAddAddress = (data: any) => {
    const updatedAddressDataList = [...addressDataList];
    const newData = {
      addressData: data.addressData,
      aliasType: data.aliasType,
      name: data.name,
      default: !updatedAddressDataList ? true : data.default,
      alarm: false, //default false?
    };
    updatedAddressDataList.push(newData);
    setAddressDataList(updatedAddressDataList);
    resetAddressData();
    if (isSearchAliasOpen) setIsSearchAliasOpen(false);
    else if (isCurrentAliasOpen) setIsCurrentAliasOpen(false);
  };

  const handleUpdateAddress = (data: any) => {
    const updatedAddressDataList = [...addressDataList];
    updatedAddressDataList[updatingIndex] = data;
    setAddressDataList(updatedAddressDataList);
    setIsUpdateAliasOpen(false);
  };

  // 기본 주소로 설정하기
  const handleToggleDefault = (index: number) => {
    if (addressDataList[index].default) return;
    const updatedAddressDataList = [...addressDataList];

    updatedAddressDataList[index].default = !updatedAddressDataList[index].default;
    for (let i = 0; i < updatedAddressDataList.length; i++) {
      if (i !== index) {
        updatedAddressDataList[i].default = false;
      }
    }
    setAddressDataList(updatedAddressDataList);
  };

  const backToSearch = () => {
    setIsSearchAliasOpen(false);
    setIsSearchOpen(true);
  };

  const handleSubmit = () => {
    //console.log(addressDataList);
    navigation.navigate('DisasterNotiSettings');
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
            <FeatherIcon name="search" size={14} style={styles.searchIcon} />
            <TextInput
              placeholder="지번, 도로명, 건물명으로 검색"
              style={styles.textInput}
              onFocus={openModal}
            />
          </View>
          <View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleCurrentSelect}
              style={styles.currentButton}
            >
              <MaterialIcon name="target" size={18} style={styles.currentButtonIcon} />
              <Text style={styles.currentButtonText}>현재 위치로 설정하기</Text>
              <IoniconsIcon
                name="chevron-forward-outline"
                size={12}
                style={styles.currentButtonIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Separator />
        <SafeAreaView style={{ width: '100%' }}>
          <ScrollView style={styles.list}>
            <View>
              {addressDataList &&
                addressDataList.map((data, index) => (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.8}
                    style={styles.listItemContainer}
                    onPress={() => {
                      setUpdatingIndex(index);
                      setIsUpdateAliasOpen(true);
                    }}
                  >
                    <View style={styles.listItem}>
                      <Text style={styles.listName}>{data.name}</Text>
                      <View style={styles.roadBox}>
                        <View style={styles.roadIcon}>
                          <Text style={styles.roadIconText}>도로명</Text>
                        </View>
                        <Text style={styles.roadText}>{data.addressData.roadAddress}</Text>
                      </View>
                    </View>
                    <View style={styles.listButton}>
                      <Pressable onPress={() => handleToggleDefault(index)}>
                        <FeatherIcon
                          name="check-circle"
                          size={24}
                          style={[
                            styles.itemButtonUnchecked,
                            data.default && styles.itemButtonChecked,
                          ]}
                        ></FeatherIcon>
                      </Pressable>
                    </View>
                  </TouchableOpacity>
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
      <Modal visible={isSearchOpen || isSearchAliasOpen || isCurrentAliasOpen || isUpdateAliasOpen}>
        {isSearchOpen && (
          <SearchPostcode
            onSelected={handleSelect}
            goBack={() => {
              setIsSearchOpen(false);
            }}
          />
        )}
        {isSearchAliasOpen && data.address && (
          <AliasPostcode
            addressData={data}
            updateAddress={handleAddAddress}
            goBack={backToSearch}
          />
        )}
        {isCurrentAliasOpen && data.address && (
          <AliasPostcode
            addressData={data}
            updateAddress={handleAddAddress}
            goBack={() => setIsCurrentAliasOpen(false)}
          />
        )}
        {isUpdateAliasOpen && (
          <AliasPostcode
            addressData={addressDataList[updatingIndex].addressData}
            aliasData={{
              aliasType: addressDataList[updatingIndex].aliasType,
              name: addressDataList[updatingIndex].name,
              default: addressDataList[updatingIndex].default,
              alarm: addressDataList[updatingIndex].alarm,
            }}
            updateAddress={handleUpdateAddress}
            goBack={() => setIsUpdateAliasOpen(false)}
          />
        )}
      </Modal>
    </>
  );
}

export const styles = StyleSheet.create({
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
    paddingRight: 20,
    paddingLeft: 20,
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
    marginBottom: 6,
  },
  searchIcon: {
    marginRight: 5,
    color: `${COLOR.gray}`,
  },
  textInput: {
    width: '95%',
  },
  currentButton: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    height: 40,
    alignItems: 'center',
  },
  currentButtonIcon: {
    color: `${COLOR.gray}`,
  },
  currentButtonText: {
    color: `${COLOR.gray}`,
    fontSize: 14,
    lineHeight: 20,
    marginRight: 5,
  },
  list: {
    backgroundColor: `${COLOR.white}`,
    paddingLeft: 22,
    paddingRight: 22,
    width: '100%',
    height: '50%',
  },
  listItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    paddingTop: 22,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: `${COLOR.lightGray}`,
  },
  listItem: {
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
  },
  listButton: {
    width: '10%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemButtonUnchecked: {
    color: `${COLOR.lightGray}`,
  },
  itemButtonChecked: {
    color: `${COLOR.darkGray}`,
  },

  listName: {
    color: `${COLOR.black}`,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    marginBottom: 5,
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
    color: `${COLOR.gray}`,
    height: 15,
    alignItems: 'center',
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
