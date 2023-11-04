import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Dimensions,
} from 'react-native';
import COLOR from '../../../constants/colors';
import Separator from '../../Separator';
import FeatherIcon from 'react-native-vector-icons/Feather';

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
    alarm: true,
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
    default: false,
    alarm: false,
  },
  {
    addressData: {
      address: '서울특별시 서초구 서초동',
      roadAddress: '서울특별시 서초구 서초대로 396',
      zoneCode: '06626',
    },
    detail: '',
    aliasType: 'etc',
    name: '본가',
    default: false,
    alarm: true,
  },
];

const TownList = ({ currentSnap }: { currentSnap?: number }) => {
  const [addressDataList, setAddressDataList] = React.useState(AddressDataList);
  const [isUpdateAliasOpen, setIsUpdateAliasOpen] = React.useState(false);
  const [updatingIndex, setUpdatingIndex] = React.useState<number>(0);

  const handleAddTown = () => {};

  const handleEditTown = () => {};

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

  const handleCheckAlarm = (index: number) => {
    const updatedAddressDataList = [...addressDataList];
    updatedAddressDataList[index].alarm = !updatedAddressDataList[index].alarm;
    setAddressDataList(updatedAddressDataList);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageName}>우리동네</Text>
      <View style={styles.buttonSection}>
        <TouchableOpacity onPress={handleAddTown} style={styles.addButton}>
          <Text style={styles.addButtonText}>우리동네 추가히기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleEditTown} style={styles.editButton}>
          <Text style={styles.editButtonText}>편집</Text>
        </TouchableOpacity>
      </View>

      <Separator />
      <ScrollView style={[styles.list, {}]}>
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
                    <Text style={styles.roadText}>
                      {data.addressData.roadAddress + ' ' + data.detail}
                    </Text>
                  </View>
                </View>
                <View style={styles.listButton}>
                  <Pressable onPress={() => handleToggleDefault(index)}>
                    <FeatherIcon
                      name="check-circle"
                      size={24}
                      style={[styles.itemButtonUnchecked, data.default && styles.itemButtonChecked]}
                    />
                  </Pressable>
                  <Pressable
                    onPress={() => handleCheckAlarm(index)}
                    style={{
                      position: 'relative',
                      width: 24,
                      height: 24,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <View
                      style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        display: 'flex',
                        borderWidth: 2,
                        borderColor: data.alarm ? `${COLOR.primary}` : `${COLOR.lightGray}`,
                        borderRadius: 12,
                      }}
                    />
                    <FeatherIcon
                      name="bell"
                      size={16}
                      style={[
                        styles.itemButtonUnchecked,
                        data.alarm && styles.itemButtonChecked,
                        { position: 'absolute', top: 4, left: 4 },
                      ]}
                    />
                  </Pressable>
                </View>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default TownList;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
  },
  pageName: {
    fontSize: 16,
    color: `${COLOR.darkGray}`,
    fontWeight: '700',
    marginBottom: 12,
  },
  buttonSection: {
    height: 34,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    height: '100%',
    width: '80%',
    paddingLeft: 24,
    justifyContent: 'center',
  },
  addButtonText: {
    color: `${COLOR.black}`,
    fontSize: 14,
    fontWeight: '500',
  },
  editButton: {
    height: '100%',
    paddingLeft: 24,
    paddingRight: 24,
    justifyContent: 'center',
  },
  editButtonText: {
    color: `${COLOR.primary}`,
    fontSize: 14,
    fontWeight: '500',
  },
  list: {
    paddingLeft: 22,
    paddingRight: 22,
    width: '100%',
  },
  listItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 22,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: `${COLOR.lightGray}`,
  },
  listItem: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
  },
  listButton: {
    width: '17%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemButtonUnchecked: {
    color: `${COLOR.lightGray}`,
  },
  itemButtonChecked: {
    color: `${COLOR.primary}`,
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
