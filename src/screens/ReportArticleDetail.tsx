import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import COLOR from '../constants/colors';
import { FlatList } from 'react-native-gesture-handler';
import SharedModal from '../components/common/ReportArticle/ReportArticleCard/SharedModal';
import convertDataFormat from '../utils/convertDataFormat';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigation/types';

type ReportArticleDetailScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  'ReportArticleDetail'
>;

export default function ReportArticleDetail({ route }: ReportArticleDetailScreenProps) {
  const { user, created_at, view, like, title, tags, content, isLike } = route.params;

  const [isSharedOpen, setIsSharedOpen] = React.useState<boolean>(false);

  const handleSharedModal = () => {
    setIsSharedOpen(!isSharedOpen);
  };

  return (
    <ScrollView style={styles.layout}>
      <View style={styles.countContainer}>
        <View style={styles.countItem}>
          <FoundationIcon name="eye" size={15} color={COLOR.middleGray} />
          <Text style={styles.countItemText}>{view}</Text>
        </View>
        <View style={styles.countItem}>
          <AntDesignIcon name="like2" size={10} color={COLOR.middleGray} />
          <Text style={styles.countItemText}>{like}</Text>
        </View>
      </View>
      <View style={styles.title}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.time}>
        <Text style={styles.timeText}>{convertDataFormat(created_at)}</Text>
      </View>

      <View style={styles.contentTop}>
        <View style={styles.user}>
          <AntDesignIcon name="user" size={20} color={COLOR.middleGray} />
          <Text style={styles.userText}>{user}</Text>
        </View>
        <View style={styles.solutionGuide}>
          <FeatherIcon name="info" size={10} color={COLOR.blue} />
          <Text style={styles.solutionGuideText}>이 재난과 관련된 솔루션이 궁금해요</Text>
        </View>
      </View>
      <View style={styles.imgContainer}>
        {/* img */}
        <EntypoIcon
          name="dots-three-vertical"
          size={18}
          color={COLOR.gray}
          style={styles.shareDotBtn}
          onPress={handleSharedModal}
        />
      </View>

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
        <Text style={styles.contentText}>{content}</Text>
      </View>

      <View style={styles.likeWrapper}>
        <View
          style={
            isLike
              ? StyleSheet.compose(styles.likeContainer, styles.likeContainerActive)
              : styles.likeContainer
          }
        >
          <AntDesignIcon name="like2" size={20} color={isLike ? COLOR.white : COLOR.blue} />
          <Text
            style={
              isLike ? StyleSheet.compose(styles.likeText, styles.likeTextActive) : styles.likeText
            }
          >
            도움이 됐어요
          </Text>
        </View>
      </View>
      <SharedModal isModalOpen={isSharedOpen} handleModal={handleSharedModal} />
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
    position: 'relative',
    width: 346,
    height: 346,
    borderRadius: 5,
    backgroundColor: `${COLOR.lightGray}`,
    marginBottom: 10,
  },
  shareDotBtn: {
    position: 'absolute',
    top: 7,
    right: 7,
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
  likeContainerActive: {
    backgroundColor: `${COLOR.blue}`,
    borderWidth: 0,
  },
  likeText: {
    fontSize: 12,
    fontWeight: '600',
    color: `${COLOR.blue}`,
  },
  likeTextActive: {
    color: `${COLOR.white}`,
  },
});
