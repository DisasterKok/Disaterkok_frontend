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
import IonIcon from 'react-native-vector-icons/Ionicons';
import COLOR from '../../../../constants/colors';
import { ReportArticleType } from './types';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { HomeStackParamList } from '../../../../navigation/types';
import SharedModal from './SharedModal';
import getElapsedTime from '../../../../utils/getElapsedTime';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';

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
        <ImageBackground source={{ uri: `${images[0].image}` }} imageStyle={styles.img}>
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.5)', 'rgba(217, 217, 217, 0)']}
            style={{ position: 'absolute', top: 0, width: '100%', height: '50%', borderRadius: 10 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          />
          <LinearGradient
            colors={['rgba(217, 217, 217, 0)', 'rgba(0, 0, 0, 0.5)']}
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              height: '50%',
              borderRadius: 10,
            }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          />
          <View style={styles.topContainer}>
            <View style={styles.topLeftContainer}>
              <View style={styles.topLeftItem}>
                <Text style={styles.topLeftItemText}>{getElapsedTime(created_at)}</Text>
              </View>
            </View>
            <View style={styles.topLeftItem}>
              <IonIcon name="eye-outline" size={12} color={COLOR.white} />
              <Text style={styles.topLeftItemText}>{view}</Text>
            </View>
          </View>
        </ImageBackground>
      ) : (
        <View style={styles.img}>
          <View style={styles.topContainer}>
            <View style={styles.topLeftContainer}>
              <View style={styles.topLeftItem}>
                <Text style={styles.topLeftItemText}>{getElapsedTime(created_at)}</Text>
              </View>
            </View>
            <View style={styles.topLeftItem}>
              <IonIcon name="eye-outline" size={12} color={COLOR.white} />
              <Text style={styles.topLeftItemText}>{view}</Text>
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.topLeftContainer}>
              <View style={styles.topLeftItem}>
                <Text style={styles.topLeftItemText}>{getElapsedTime(created_at)}</Text>
              </View>
            </View>
            <View style={styles.topLeftItem}>
              <FoundationIcon name="eye" size={15} color={COLOR.white} />
              <Text style={styles.topLeftItemText}>{view}</Text>
            </View>
          </View>
        </View>
      )}
      <View style={styles.bottomContainer}>
        <View style={styles.tagContainer}>
          <ScrollView horizontal>
            {tags.map((tag, index) => (
              <View style={styles.tag} key={index}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        <EntypoIcon
          name="share-alternative"
          size={15}
          color={COLOR.white}
          onPress={handleSharedModal}
        />
      </View>

      {/* <LinearGradient/> */}
      <SharedModal isModalOpen={isSharedOpen} handleModal={handleSharedModal} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardLayout: {
    width: 138,
    height: 248,
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
    borderRadius: 10,
  },
  img: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: `${COLOR.middleGray}`,
    borderRadius: 10,
    objectFit: 'cover',
  },
  topContainer: {
    width: '100%',
    position: 'absolute',
    top: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
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
    width: '100%',
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 7,
  },
  title: {
    marginBottom: 15,
  },
  titleText: {
    fontSize: 14,
  },
  tagContainer: {
    width: '70%',
  },
  tag: {
    height: 16,
    backgroundColor: `${COLOR.white}`,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 7,
    borderRadius: 10,
    marginRight: 5,
  },
  tagText: {
    fontSize: 8,
    fontWeight: '700',
    color: `${COLOR.primary}`,
  },
});
