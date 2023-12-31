import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  FlatList,
  Pressable,
  ImageBackground,
} from 'react-native';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import COLOR from '../../../../constants/colors';
import { ReportArticleType } from './types';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { HomeStackParamList } from '../../../../navigation/types';
import SharedModal from './SharedModal';
import getElapsedTime from '../../../../utils/getElapsedTime';

export default function ReportArticleCard({ data }: { data: ReportArticleType }) {
  const navigation: NavigationProp<HomeStackParamList> = useNavigation();
  const { created_at, view, like, title, tags, images, id } = data;

  const [isSharedOpen, setIsSharedOpen] = React.useState<boolean>(false);

  const handleSharedModal = () => {
    setIsSharedOpen(!isSharedOpen);
  };

  const navigateToReportDetail = () => {
    navigation.navigate('ReportArticleDetail', {
      id,
    });
  };

  return (
    <Pressable style={styles.cardLayout} onPress={navigateToReportDetail}>
      {images.length > 0 ? (
        <ImageBackground source={{ uri: `${images[0].image}` }} style={styles.img}>
          <View style={styles.topContainer}>
            <View style={styles.topLeftContainer}>
              <View style={styles.topLeftItem}>
                <Text style={styles.topLeftItemText}>{getElapsedTime(created_at)}</Text>
              </View>
              <View style={styles.topLeftItem}>
                <Text style={styles.topLeftItemText}>|</Text>
              </View>
              <View style={styles.topLeftItem}>
                <FoundationIcon name="eye" size={15} color={COLOR.white} />
                <Text style={styles.topLeftItemText}>{view}</Text>
              </View>
              <View style={styles.topLeftItem}>
                <AntDesignIcon name="like2" size={10} color={COLOR.white} />
                <Text style={styles.topLeftItemText}>{like}</Text>
              </View>
            </View>
            <EntypoIcon
              name="dots-three-vertical"
              size={15}
              color={COLOR.white}
              onPress={handleSharedModal}
            />
          </View>
        </ImageBackground>
      ) : (
        <View style={styles.img}>
          <View style={styles.topContainer}>
            <View style={styles.topLeftContainer}>
              <View style={styles.topLeftItem}>
                <Text style={styles.topLeftItemText}>{getElapsedTime(created_at)}</Text>
              </View>
              <View style={styles.topLeftItem}>
                <Text style={styles.topLeftItemText}>|</Text>
              </View>
              <View style={styles.topLeftItem}>
                <FoundationIcon name="eye" size={15} color={COLOR.white} />
                <Text style={styles.topLeftItemText}>{view}</Text>
              </View>
              <View style={styles.topLeftItem}>
                <AntDesignIcon name="like2" size={10} color={COLOR.white} />
                <Text style={styles.topLeftItemText}>{like}</Text>
              </View>
            </View>
            <EntypoIcon
              name="dots-three-vertical"
              size={15}
              color={COLOR.white}
              onPress={handleSharedModal}
            />
          </View>
        </View>
      )}
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
      <SharedModal isModalOpen={isSharedOpen} handleModal={handleSharedModal} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardLayout: {
    width: '100%',
    height: 300,
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
    height: 220,
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
