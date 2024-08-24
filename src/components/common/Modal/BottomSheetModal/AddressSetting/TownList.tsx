import React, { RefObject, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Pressable,
} from 'react-native';
import COLOR from '../../../../../constants/colors';
import Separator from '../../../../Separator';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import useAddressData from '../../../../../hooks/useAddressData';
import SearchPostcode from '../../../../SelectAddress/SearchPostcode';
import AliasPostcode from '../../../../SelectAddress/AliasPostcode';
import DeleteConfirmModal from './DeleteConfirmModal';
import AddAddress from './AddAdress';
import getCurrentLocation from '../../../../SelectAddress/GetCurrentLocation';
import getAddressCoords from '../../../../SelectAddress/GetAddressCoords';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { UserRegion, UserRegionPayload } from '../../../../../apis/userRegionAPI';
import {
  useRegionListQuery,
  useAddRegion,
  useUpdateAlias,
  useSetDefault,
  useDeleteRegion,
  useSetOnoff,
} from '../../../../../hooks/queries/Region';

import useUser from '../../../../../hooks/queries/Auth/useUser';

interface TownListBottomSheetProps {
  height: number;
  isEditable: boolean;
  bottomSheetModalRef: RefObject<BottomSheetModal>;
}

const TownList = ({ height, isEditable, bottomSheetModalRef }: TownListBottomSheetProps) => {
  const { userData } = useUser();
  const token = userData?.token;
  console.log('townlist token:', token);
  const accessToken = token ? token.access : '';
  const [isEditMode, setIsEditMode] = React.useState<boolean>(false);
  const [updatingIndex, setUpdatingIndex] = React.useState<number>(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState<boolean>(false);

  const {
    regionListQuery: { data: regions },
  } = useRegionListQuery(accessToken);
  const [addressDataList, setAddressDataList] = React.useState<UserRegion[]>(
    regions ? regions.results : [],
  );
  const { addRegionMutation } = useAddRegion(accessToken);
  const { updateAliasMutation } = useUpdateAlias(accessToken);
  const { setDefaultMutation } = useSetDefault(accessToken);
  const { deleteRegionMutation } = useDeleteRegion(accessToken);
  const { setOnoffMutation } = useSetOnoff(accessToken);

  const viewHeight = Dimensions.get('window').height * height - 30;

  const handleEditTown = () => {
    setIsEditMode(!isEditMode);
  };

  const [isSlideOpen, setIsSlideOpen] = React.useState<boolean>(false);
  const [slideNum, setSlideNum] = React.useState<number>(-1);
  const { data, setAddressData, resetAddressData } = useAddressData({
    address: '',
    roadAddress: '',
    zoneCode: '',
    xCoordinate: -1,
    yCoordinate: -1,
  });

  const handleSelect = (data: any) => {
    closeSlide();

    getAddressCoords(data.jibunAddress ? data.jibunAddress : data.autoJibunAddress)
      .then((coordinates) => {
        setAddressData({
          address: data.jibunAddress ? data.jibunAddress : data.autoJibunAddress,
          roadAddress: data.roadAddress ? data.roadAddress : data.autoRoadAddress,
          zoneCode: data.zonecode,
          xCoordinate: coordinates.longitude,
          yCoordinate: coordinates.latitude,
        });
        setIsSlideOpen(true);
        setSlideNum(2);
      })
      .catch((error) => {
        console.log(error);
        console.log('주소를 얻는 도중 오류가 발생했습니다.');
      });
  };

  const closeSlide = () => {
    setIsSlideOpen(false);
    setSlideNum(-1);
  };

  const toggleAdd = () => {
    setSlideNum(0);
    setIsSlideOpen(true);
  };

  const toggleSearch = () => {
    setSlideNum(1);
    setIsSlideOpen(true);
  };

  const toggleEditAlias = (index: number) => {
    setIsSlideOpen(true);
    setUpdatingIndex(index);
    setSlideNum(3);
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
        setSlideNum(2);
        setIsSlideOpen(true);
      })
      .catch((error) => {
        console.log('위치를 얻는 도중 오류가 발생했습니다.');
      });
  };

  // 주소 추가하기
  const handleAddAddress = (newData: UserRegionPayload) => {
    addRegionMutation.mutate(newData, {
      onSuccess: (data: any) => {
        resetAddressData();
        closeSlide();
      },
    });
  };

  // 주소 별명 수정
  const handleUpdateAddress = (updatedData: UserRegionPayload) => {
    const payload = { aliasType: updatedData.aliasType, name: updatedData.name };
    updateAliasMutation.mutate(
      { id: addressDataList[updatingIndex].id, payload: payload },
      {
        onSuccess: (data: any) => {
          closeSlide();
        },
      },
    );
  };

  //주소 삭제하기
  const confirmDeleteTown = async (confirm: boolean) => {
    if (confirm) {
      try {
        await deleteRegionMutation.mutateAsync(updatingIndex);
      } catch (error) {
        console.log(error);
      }
    }
    setIsDeleteModalOpen(false);
  };

  const handleDeleteTown = (id: number) => {
    setUpdatingIndex(id);
    setIsDeleteModalOpen(true);
  };

  // 기본 주소로 설정하기
  const handleToggleDefault = async (id: number) => {
    try {
      await setDefaultMutation.mutateAsync(id);
      regions.refetch();
    } catch (error) {
      console.log(error);
    }
  };

  // 알림 설정
  const handleCheckAlarm = async (id: number) => {
    try {
      await setOnoffMutation.mutateAsync(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModalPress = useCallback((ref: React.RefObject<BottomSheetModal>) => {
    ref.current?.close();
  }, []);

  useEffect(() => {
    setAddressDataList(regions ? regions.results : []);
  }, [regions]);

  return (
    <View style={[styles.container, { height: viewHeight }]}>
      <Text style={styles.pageName}>우리동네</Text>
      {isEditable && (
        <View style={styles.buttonSection}>
          <TouchableOpacity onPress={toggleAdd} style={styles.addButton}>
            <EntypoIcon name="plus" size={16} />
            <Text style={styles.addButtonText}>우리동네 추가하기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEditTown} style={styles.editButton}>
            <Text style={styles.editButtonText}>{isEditMode ? '완료' : '편집'}</Text>
          </TouchableOpacity>
        </View>
      )}

      <Separator />
      <ScrollView style={isEditable ? styles.list : StyleSheet.compose(styles.list, styles.listMb)}>
        <View>
          {addressDataList &&
            addressDataList.map((data: UserRegion, index: number) => (
              <View key={data.id} style={styles.listItemContainer}>
                <View style={styles.listItem}>
                  <Text style={styles.listName}>{data.name}</Text>
                  <View style={styles.roadBox}>
                    <View style={styles.roadIcon}>
                      <Text style={styles.roadIconText}>도로명</Text>
                    </View>
                    <Text style={styles.roadText}>{data.roadAddress}</Text>
                  </View>
                </View>
                <View style={[styles.listButton, { gap: isEditMode ? 5 : 10 }]}>
                  {isEditMode ? (
                    <>
                      <TouchableOpacity
                        onPress={() => toggleEditAlias(index)}
                        style={styles.editDeleteButton}
                      >
                        <Text style={styles.editDeleteText}>수정</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleDeleteTown(data.id)}
                        style={styles.editDeleteButton}
                      >
                        <Text style={styles.editDeleteText}>삭제</Text>
                      </TouchableOpacity>
                      <DeleteConfirmModal
                        isModalOpen={isDeleteModalOpen}
                        handleConfirm={confirmDeleteTown}
                      />
                    </>
                  ) : (
                    <>
                      <TouchableOpacity onPress={() => handleToggleDefault(data.id)}>
                        <FeatherIcon
                          name="check-circle"
                          size={24}
                          style={[
                            styles.itemButtonUnchecked,
                            data.default && styles.itemButtonChecked,
                          ]}
                        />
                      </TouchableOpacity>
                      {isEditable && (
                        <TouchableOpacity
                          onPress={() => handleCheckAlarm(data.id)}
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
                              borderColor: data.onOff ? `${COLOR.primary}` : `${COLOR.lightGray}`,
                              borderRadius: 12,
                            }}
                          />
                          <FeatherIcon
                            name="bell"
                            size={16}
                            style={[
                              styles.itemButtonUnchecked,
                              data.onOff && styles.itemButtonChecked,
                              { position: 'absolute', top: 4, left: 4 },
                            ]}
                          />
                        </TouchableOpacity>
                      )}
                    </>
                  )}
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
      {!isEditable && (
        <Pressable
          style={styles.completeButton}
          onPress={() => handleCloseModalPress(bottomSheetModalRef)}
        >
          <Text style={styles.completeButtonText}>완료</Text>
        </Pressable>
      )}
      {isSlideOpen && (
        <>
          <View
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '100%',
              height: '100%',
              backgroundColor: '#fff',
            }}
          >
            {slideNum === 0 && (
              <AddAddress
                openSearch={toggleSearch}
                onCurrent={handleCurrentSelect}
                goBack={closeSlide}
              />
            )}
            {slideNum === 1 && <SearchPostcode goBack={closeSlide} onSelected={handleSelect} />}
            {slideNum === 2 && (
              <AliasPostcode
                addressData={data}
                updateAddress={handleAddAddress}
                goBack={() => setSlideNum(0)}
              />
            )}
            {slideNum === 3 && (
              <AliasPostcode
                addressData={{
                  address: addressDataList[updatingIndex].address,
                  roadAddress: addressDataList[updatingIndex].roadAddress,
                  zoneCode: addressDataList[updatingIndex].zoneCode,
                  xCoordinate: addressDataList[updatingIndex].xCoordinate,
                  yCoordinate: addressDataList[updatingIndex].yCoordinate,
                }}
                aliasData={{
                  aliasType: addressDataList[updatingIndex].aliasType,
                  name: addressDataList[updatingIndex].name,
                  default: addressDataList[updatingIndex].default,
                  onOff: addressDataList[updatingIndex].onOff,
                }}
                updateAddress={handleUpdateAddress}
                goBack={closeSlide}
              />
            )}
          </View>
          <View
            style={{
              position: 'absolute',
              width: '100%',
              top: 0,
              paddingBottom: 10,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: `${COLOR.darkGray}`, fontSize: 16, fontWeight: '700' }}>
              우리동네 추가하기
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export default TownList;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
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
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 24,
    alignItems: 'center',
    gap: 2,
  },
  addButtonText: {
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
    display: 'flex',
    paddingLeft: 22,
    paddingRight: 22,
    width: '100%',
  },
  listMb: {
    marginBottom: 20,
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
    width: '68%',
  },
  listButton: {
    width: '32%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
  editDeleteButton: {
    width: 50,
    height: 25,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${COLOR.lightGray}`,
    borderRadius: 15,
  },
  editDeleteText: {
    fontSize: 12,
    fontWeight: '500',
    color: `${COLOR.darkGray}`,
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
  completeButton: {
    width: '90%',
    height: 50,
    backgroundColor: `${COLOR.primary}`,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  completeButtonText: { color: `${COLOR.white}` },
});
