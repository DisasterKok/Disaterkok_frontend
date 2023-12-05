import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput } from 'react-native';
import { View, Text } from 'react-native';
import COLOR from '../constants/colors';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import useInput from '../hooks/useInput';
import usePostReport from '../hooks/queries/Reports/usePostReport';
import useUser from '../hooks/queries/Auth/useUser';
import { HomeStackParamList } from '../navigation/types';
import { NavigationProp, useNavigation } from '@react-navigation/native';

export default function ReportPost() {
  const { user } = useUser();
  const [title, onChangeTitle] = useInput();
  const [content, onChangeContent] = useInput();

  const [isAnonymous, setIsAnoymous] = useState(false);

  const navigation: NavigationProp<HomeStackParamList> = useNavigation();

  const { reportMutation } = usePostReport();

  const submitReportForm = () => {
    reportMutation.mutate(
      { user: user.username, title, content, is_anoymous: isAnonymous },
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
        <View style={styles.imgContainer}>
          <View style={styles.imgItemFirst}>
            <AntDesignIcon name="plus" size={30} color={COLOR.blue} />
          </View>
          <View style={styles.imgItem}>
            <AntDesignIcon name="plus" size={30} color={COLOR.middleGray} />
          </View>
          <View style={styles.imgItem}>
            <AntDesignIcon name="plus" size={30} color={COLOR.middleGray} />
          </View>
        </View>
      </View>

      <View style={styles.tagWrapper}>
        <View style={styles.tagTopContainer}>
          <Text style={styles.titleText}>태그를 입력해주세요</Text>
          <View style={styles.locationContainer}>
            <MaterialCommunityIcon name="target" size={10} color={COLOR.blue} />
            <Text style={styles.locationText}>내위치</Text>
          </View>
        </View>
        <View style={styles.tagContainer}>
          <View style={styles.tagItem}>
            <Text style={styles.tagItemText}>시,도</Text>
          </View>
          <View style={styles.tagItem}>
            <Text style={styles.tagItemText}>시,군,구</Text>
          </View>
          <View style={styles.tagItem}>
            <Text style={styles.tagItemText}>동,읍,면</Text>
          </View>
          <View style={styles.tagItem}>
            <Text style={styles.tagItemText}>재난유형</Text>
          </View>
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
        <Pressable onPress={submitReportForm} style={styles.submitBtn}>
          <Text style={styles.submitBtnText}>제보하기</Text>
        </Pressable>
      </View>
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
    gap: 10,
  },
  imgItemFirst: {
    width: 100,
    height: 100,
    backgroundColor: `${COLOR.lightBlue}`,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
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
  tagItemText: {
    fontSize: 12,
    color: `${COLOR.gray}`,
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
  submitBtnText: {
    fontSize: 14,
    color: `${COLOR.white}`,
  },
});
