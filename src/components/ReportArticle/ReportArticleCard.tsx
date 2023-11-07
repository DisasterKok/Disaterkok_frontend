import React from 'react';
import { StyleSheet, View, Text, Platform, FlatList, Pressable } from 'react-native';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import COLOR from '../../constants/colors';
import { ReportArticleType } from './types';

export default function ReportArticleCard({
  id,
  elapsedTime,
  viewCount,
  likeCount,
  title,
  tags,
}: ReportArticleType) {
  return (
    <Pressable style={styles.cardLayout}>
      <View style={styles.img}>
        <View style={styles.topContainer}>
          <View style={styles.topLeftContainer}>
            <View style={styles.topLeftItem}>
              <Text style={styles.topLeftItemText}>{elapsedTime}초 전</Text>
            </View>
            <View style={styles.topLeftItem}>
              <Text style={styles.topLeftItemText}>|</Text>
            </View>
            <View style={styles.topLeftItem}>
              <FoundationIcon name="eye" size={15} color={COLOR.white} />
              <Text style={styles.topLeftItemText}>{viewCount}</Text>
            </View>
            <View style={styles.topLeftItem}>
              <AntDesignIcon name="like2" size={10} color={COLOR.white} />
              <Text style={styles.topLeftItemText}>{likeCount}</Text>
            </View>
          </View>
          <EntypoIcon name="dots-three-vertical" size={15} color={COLOR.white} />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.title}>
          <Text style={styles.titleText}>{title}</Text>
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
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardLayout: {
    width: 335,
    height: 280,
    backgroundColor: `${COLOR.white}`,
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
    borderRadius: 5,
  },
  img: {
    position: 'relative',
    width: '100%',
    height: 200,
    backgroundColor: `${COLOR.middleGray}`,
    borderTopLeftRadius: 5,
    borderTopEndRadius: 5,
  },
  topContainer: {
    width: '100%',
    position: 'absolute',
    top: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  topLeftContainer: {
    flexDirection: 'row',
    gap: 7,
  },
  topLeftItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  topLeftItemText: {
    fontSize: 10,
    color: `${COLOR.white}`,
  },
  bottomContainer: {
    padding: 10,
  },
  title: {
    marginBottom: 15,
  },
  titleText: {
    fontSize: 14,
  },
  tagContainer: {
    flexDirection: 'row',
    gap: 5,
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
    fontSize: 10,
  },
});
