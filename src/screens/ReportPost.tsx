import React, { useCallback, useRef, useState } from 'react';
import {
  Alert,
  Image,
  ImageURISource,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';
import { View, Text } from 'react-native';
import COLOR from '../constants/colors';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import useInput from '../hooks/useInput';
import usePostReport from '../hooks/queries/Reports/usePostReport';
import { HomeStackParamList } from '../navigation/types';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import getCurrentLocation from '../components/SelectAddress/GetCurrentLocation';
import SelectAllDisasterBottomSheet from '../components/DisasterNotiSettings/SelectAllDisaster/SelectAllDisasterBottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { launchCamera, CameraOptions, ImagePickerResponse } from 'react-native-image-picker';

interface LocationInfo {
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
}

export default function ReportPost() {
  const [title, onChangeTitle] = useInput();
  const [content, onChangeContent] = useInput();

  const [imgList, setImgList] = useState<ImageURISource[]>([]);

  const [location, setLocation] = useState<LocationInfo>({
    region_1depth_name: '',
    region_2depth_name: '',
    region_3depth_name: '',
  });
  const [disasterType, setDisasterType] = useState<string>('');

  const disasterModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback((ref: React.RefObject<BottomSheetModal>) => {
    ref.current?.present();
  }, []);

  const [isAnonymous, setIsAnoymous] = useState(false);

  const navigation: NavigationProp<HomeStackParamList> = useNavigation();

  const { reportMutation } = usePostReport();

  const showCamera = () => {
    //1. launchCamera 하기 위한 옵션 객체
    const options: CameraOptions = {
      //Property 'mediaType' is missing in type '{}' but required in type 'CameraOptions'
      mediaType: 'photo', //필수 속성
      cameraType: 'back',
      saveToPhotos: true,
      quality: 1,
      videoQuality: 'high',
    };

    //2. 촬영 결과를 받아오는 callback 메소드 등록
    launchCamera(options, (response: ImagePickerResponse) => {
      if (response.didCancel) Alert.alert('촬영취소');
      else if (response.errorMessage) Alert.alert('Error : ' + response.errorMessage);
      else {
        //이곳에 왔다면 이미지가 잘 촬영된 것
        //촬용된 이미지는 response 객체의 assets 라는 속성으로 전달됨
        if (response.assets != null) {
          const uri = response.assets[0].uri;
          const source = { uri: uri };

          // 현재 imgList 상태를 가져와서 새로운 이미지를 추가한 후 상태를 업데이트합니다.
          setImgList((prevImgList) => [...prevImgList, source]);
        }
      }
    }); //파라미터로 응답객체 받음
  };

  const getCurrentLocationOnClick = async () => {
    const locationData = await getCurrentLocation();
    const locationInfo: LocationInfo = {
      region_1depth_name: locationData.region_1depth_name,
      region_2depth_name: locationData.region_2depth_name,
      region_3depth_name: locationData.region_3depth_name,
    };
    setLocation(locationInfo);
  };

  const submitReportForm = () => {
    console.log({
      title,
      content,
      images: imgList,
      tags: [
        location.region_1depth_name,
        location.region_2depth_name,
        location.region_3depth_name,
        disasterType,
      ],
      is_anoymous: isAnonymous,
    });
    reportMutation.mutate(
      {
        title,
        content,
        images: imgList,
        tags: [
          location.region_1depth_name,
          location.region_2depth_name,
          location.region_3depth_name,
          disasterType,
        ],
        is_anoymous: isAnonymous,
      },
      {
        onSuccess: (data) => {
          console.log('Report mutation successful!', data);
          navigation.navigate('CompleteReportPost', { id: data.id });
        },
      },
    );
  };

  return (
    <ScrollView style={styles.layout}>
      <View style={styles.titleWrapper}>
        <Text style={styles.titleText}>제목을 입력해주세요</Text>
        <View style={styles.titleInputContainer}>
          <TextInput
            style={styles.titleInput}
            placeholder="여기에 입력해주세요"
            onChangeText={onChangeTitle}
            maxLength={30}
          />
          <View style={styles.titleLen}>
            <Text style={styles.titleLenText}>{title.length}/30</Text>
          </View>
        </View>
      </View>

      <View style={styles.imgWrapper}>
        <Text style={styles.titleText}>사진이나 영상을 올려주세요</Text>
        <Text style={styles.subTitleText}>최대 5개까지 업로드 가능합니다</Text>
        <ScrollView horizontal style={styles.imgContainer}>
          {imgList.length < 5 && (
            <Pressable onPress={showCamera} style={styles.imgItemFirst}>
              <AntDesignIcon name="plus" size={30} color={COLOR.blue} />
            </Pressable>
          )}
          <View style={styles.imgPreviewContainer}>
            {imgList.map((img, index) => (
              <Image key={index} source={img} style={styles.imgPreview}></Image>
            ))}
          </View>

          {/* {Array.from({ length: Math.max(5 - imgList.length, 0) }).map((_, index) => (
            <Pressable onPress={showCamera} key={index} style={styles.imgItem}>
              <AntDesignIcon name="plus" size={30} color={COLOR.middleGray} />
            </Pressable>
          ))} */}
        </ScrollView>
      </View>

      <View style={styles.tagWrapper}>
        <View style={styles.tagTopContainer}>
          <Text style={styles.titleText}>태그를 입력해주세요</Text>
          <Pressable onPress={getCurrentLocationOnClick} style={styles.locationContainer}>
            <MaterialCommunityIcon name="target" size={10} color={COLOR.blue} />
            <Text style={styles.locationText}>내위치</Text>
          </Pressable>
        </View>
        <View style={styles.tagContainer}>
          {location.region_1depth_name === '' ? (
            <View style={styles.tagItem}>
              <Text style={styles.tagItemText}>시,도</Text>
            </View>
          ) : (
            <View style={StyleSheet.compose(styles.tagItem, styles.tagItemActive)}>
              <Text style={StyleSheet.compose(styles.tagItemText, styles.tagItemTextActive)}>
                {location.region_1depth_name}
              </Text>
            </View>
          )}
          {location.region_2depth_name === '' ? (
            <View style={styles.tagItem}>
              <Text style={styles.tagItemText}>시,군,구</Text>
            </View>
          ) : (
            <View style={StyleSheet.compose(styles.tagItem, styles.tagItemActive)}>
              <Text style={StyleSheet.compose(styles.tagItemText, styles.tagItemTextActive)}>
                {location.region_2depth_name}
              </Text>
            </View>
          )}
          {location.region_3depth_name === '' ? (
            <View style={styles.tagItem}>
              <Text style={styles.tagItemText}>동,읍,면</Text>
            </View>
          ) : (
            <View style={StyleSheet.compose(styles.tagItem, styles.tagItemActive)}>
              <Text style={StyleSheet.compose(styles.tagItemText, styles.tagItemTextActive)}>
                {location.region_3depth_name}
              </Text>
            </View>
          )}
          {disasterType === '' ? (
            <Pressable
              onPress={() => handlePresentModalPress(disasterModalRef)}
              style={styles.tagItem}
            >
              <Text style={styles.tagItemText}>재난유형</Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={() => handlePresentModalPress(disasterModalRef)}
              style={StyleSheet.compose(styles.tagItem, styles.tagItemActive)}
            >
              <Text style={styles.tagItemTextActive}>{disasterType}</Text>
            </Pressable>
          )}
        </View>
      </View>

      <View style={styles.contentWrapper}>
        <Text style={styles.titleText}>어떤 상황인가요?</Text>
        <View style={styles.contentInputContainer}>
          <TextInput
            style={styles.contentInput}
            placeholder="재난 상황을 설명해주세요"
            multiline={true}
            onChangeText={onChangeContent}
            maxLength={100}
          />
          <View style={styles.contentLen}>
            <Text style={styles.contentLenText}>{content.length}/100</Text>
          </View>
        </View>
      </View>

      <View style={styles.submitWrapper}>
        <Pressable style={styles.anonymousContainer} onPress={() => setIsAnoymous(!isAnonymous)}>
          {isAnonymous ? (
            <MaterialCommunityIcon name="checkbox-marked" size={16} color={COLOR.blue} />
          ) : (
            <MaterialCommunityIcon name="checkbox-blank-outline" size={16} color={COLOR.gray} />
          )}

          <Text
            style={
              isAnonymous
                ? StyleSheet.compose(styles.anonymousText, styles.anonymousTextActive)
                : styles.anonymousText
            }
          >
            익명으로 올리기
          </Text>
        </Pressable>
        <Pressable
          onPress={submitReportForm}
          style={
            title === ''
              ? styles.submitBtn
              : StyleSheet.compose(styles.submitBtn, styles.submitBtnActive)
          }
        >
          <Text
            style={
              title === ''
                ? styles.submitBtnText
                : StyleSheet.compose(styles.submitBtnText, styles.submitBtnTextActive)
            }
          >
            제보하기
          </Text>
        </Pressable>
      </View>

      {/* 모달 */}
      <SelectAllDisasterBottomSheet
        bottomSheetModalRef={disasterModalRef}
        selectedTag={disasterType}
        setSelectedTag={setDisasterType}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  layout: {
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  titleWrapper: {
    gap: 10,
    marginBottom: 30,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '500',
  },
  titleInputContainer: {
    position: 'relative',
  },
  titleInput: {
    width: '100%',
    borderRadius: 5,
    padding: 10,
    backgroundColor: `${COLOR.white}`,
    fontSize: 12,
    color: `${COLOR.black}`,
    paddingRight: 50,
  },
  titleLen: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  titleLenText: {
    fontSize: 12,
    color: `${COLOR.middleGray}`,
  },
  imgWrapper: {
    marginBottom: 30,
  },
  subTitleText: {
    fontSize: 10,
    color: `${COLOR.gray}`,
  },
  imgContainer: {
    marginTop: 15,
    flexDirection: 'row',
  },
  imgItemFirst: {
    width: 100,
    height: 100,
    backgroundColor: `${COLOR.lightBlue}`,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 10,
  },
  imgPreviewContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  imgPreview: {
    width: 100,
    height: 100,
  },
  imgItem: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: `${COLOR.middleGray}`,
  },

  tagWrapper: {
    marginBottom: 30,
    gap: 10,
  },
  tagTopContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    borderWidth: 1,
    borderColor: `${COLOR.blue}`,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  locationText: {
    fontSize: 10,
    color: `${COLOR.blue}`,
  },
  tagContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  tagItem: {
    width: 81,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${COLOR.white}`,
    borderRadius: 20,
  },
  tagItemActive: {
    backgroundColor: `${COLOR.primary}`,
  },
  tagItemText: {
    fontSize: 12,
    color: `${COLOR.gray}`,
  },
  tagItemTextActive: {
    color: `${COLOR.white}`,
  },
  contentWrapper: {
    gap: 10,
    marginBottom: 10,
  },
  contentInputContainer: {
    position: 'relative',
  },
  contentInput: {
    width: '100%',
    height: 120,
    backgroundColor: `${COLOR.white}`,
    borderRadius: 5,
    padding: 10,
    paddingTop: 10,
  },
  contentLen: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  contentLenText: {
    fontSize: 12,
    color: `${COLOR.middleGray}`,
  },
  submitWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 100,
  },
  anonymousContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  anonymousText: {
    fontSize: 12,
    color: `${COLOR.gray}`,
  },
  anonymousTextActive: {
    color: `${COLOR.blue}`,
  },
  submitBtn: {
    width: 120,
    height: 50,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${COLOR.lightGray}`,
  },
  submitBtnActive: {
    backgroundColor: `${COLOR.primary}`,
  },
  submitBtnText: {
    fontSize: 14,
    color: `${COLOR.white}`,
  },
  submitBtnTextActive: {
    color: `${COLOR.white}`,
  },
});
