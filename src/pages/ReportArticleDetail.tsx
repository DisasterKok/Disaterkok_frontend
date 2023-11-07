import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { ARTICLE_LIST } from '../constants/DummyArticle';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import COLOR from '../constants/colors';
import { FlatList } from 'react-native-gesture-handler';
import { CustomNavigationOptions } from './Report';
import { useNavigation } from '@react-navigation/native';

export default function ReportArticleDetail() {
  //   const { postId, parms } = route.params; // 게시글 ID
  //   // 추후에 게시글 ID에 기반하여 해당 게시글의 상세 정보를 표시하도록 작업하기

  const { id, elapsedTime, viewCount, likeCount, title, tags } = ARTICLE_LIST[0];

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    } as CustomNavigationOptions);
  }, []);

  return (
    <ScrollView style={styles.layout}>
      <View style={styles.countContainer}>
        <View style={styles.countItem}>
          <FoundationIcon name="eye" size={15} color={COLOR.middleGray} />
          <Text style={styles.countItemText}>{viewCount}</Text>
        </View>
        <View style={styles.countItem}>
          <AntDesignIcon name="like2" size={10} color={COLOR.middleGray} />
          <Text style={styles.countItemText}>{likeCount}</Text>
        </View>
      </View>
      <View style={styles.title}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.time}>
        <Text style={styles.timeText}>2023년 9월 17일 16시 32분 58초</Text>
      </View>

      <View style={styles.contentTop}>
        <View style={styles.user}>
          <AntDesignIcon name="user" size={20} color={COLOR.middleGray} />
          <Text style={styles.userText}>익명 37</Text>
        </View>
        <View style={styles.solutionGuide}>
          <FeatherIcon name="info" size={10} color={COLOR.blue} />
          <Text style={styles.solutionGuideText}>이 재난과 관련된 솔루션이 궁금해요</Text>
        </View>
      </View>
      <View style={styles.imgContainer}>{/* img */}</View>

      <FlatList
        data={tags}
        renderItem={({ item }) => (
          <View style={styles.tag}>
            <Text style={styles.tagText}>{item}</Text>
          </View>
        )}
        numColumns={1}
        horizontal
        contentContainerStyle={styles.tagContainer}
      />

      <View style={styles.content}>
        <Text style={styles.contentText}>내용입니다내용입니다내용입니다내용입니다내용입니다</Text>
      </View>

      <View style={styles.likeWrapper}>
        <View style={styles.likeContainer}>
          <AntDesignIcon name="like2" size={20} color={COLOR.blue} />
          <Text style={styles.likeText}>도움이 됐어요</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  layout: {
    padding: 15,
    backgroundColor: `${COLOR.white}`,
  },
  countContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  countItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  title: {
    marginVertical: 7,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
  },
  time: {
    marginBottom: 15,
  },
  timeText: {
    fontSize: 10,
    color: `${COLOR.gray}`,
  },
  countItemText: {
    fontSize: 10,
    color: `${COLOR.middleGray}`,
  },
  contentTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  userText: {
    fontSize: 12,
    color: `${COLOR.gray}`,
  },
  solutionGuide: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    width: 178,
    height: 22,
    borderRadius: 30,
    backgroundColor: `${COLOR.lightBlue}`,
  },
  solutionGuideText: {
    fontSize: 10,
    color: `${COLOR.blue}`,
  },
  imgContainer: {
    width: 346,
    height: 346,
    borderRadius: 5,
    backgroundColor: `${COLOR.lightGray}`,
    marginBottom: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    gap: 5,
    marginBottom: 10,
  },
  tag: {
    height: 25,
    backgroundColor: `${COLOR.lightBlue}`,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  tagText: {
    fontSize: 12,
  },
  content: {
    width: 346,
    height: 120,
    borderRadius: 5,
    backgroundColor: `${COLOR.lightGray}`,
    padding: 10,
    marginBottom: 10,
  },
  contentText: {
    fontSize: 12,
  },
  likeWrapper: {
    alignItems: 'center',
    marginBottom: 50,
  },
  likeContainer: {
    width: 124,
    height: 48,
    borderRadius: 50,
    backgroundColor: `${COLOR.lightBlue}`,
    borderWidth: 1,
    borderColor: `${COLOR.middleBlue}`,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    ...Platform.select({
      ios: {
        shadowColor: `${COLOR.black}`,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: {
          width: 0,
          height: 1,
        },
      },
      android: {
        elevation: 3,
      },
    }),
  },
  likeText: {
    fontSize: 12,
    fontWeight: '600',
    color: `${COLOR.blue}`,
  },
});
