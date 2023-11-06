import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import COLOR from '../../constants/colors';

export default function ReportArticleCard() {
  return (
    <View style={styles.cardLayout}>
      <View style={styles.img}>
        <View style={styles.topContainer}>
          <View style={styles.topLeftContainer}>
            <View style={styles.topLeftItem}>
              <Text style={styles.topLeftItemText}>12초 전</Text>
            </View>
            <View style={styles.topLeftItem}>
              <Text style={styles.topLeftItemText}>|</Text>
            </View>
            <View style={styles.topLeftItem}>
              <FoundationIcon name="eye" size={15} color={COLOR.white} />
              <Text style={styles.topLeftItemText}>1,234</Text>
            </View>
            <View style={styles.topLeftItem}>
              <AntDesignIcon name="like2" size={10} color={COLOR.white} />
              <Text style={styles.topLeftItemText}>1,234</Text>
            </View>
          </View>
          <EntypoIcon name="dots-three-vertical" size={15} color={COLOR.white} />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.title}>
          <Text style={styles.titleText}>제목입니다제목입니다제목입니다</Text>
        </View>
        <View style={styles.tagContainer}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>태그1</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>태그1123123</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>태그11111</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardLayout: {
    width: 346,
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
