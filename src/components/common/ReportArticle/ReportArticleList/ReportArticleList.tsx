import React from 'react';
import { FlatList, StyleSheet, Pressable, Text, View } from 'react-native';
import ReportArticleCard from '../ReportArticleCard/ReportArticleCard';
import { ReportArticleType } from '../ReportArticleCard/types';
import AntIcon from 'react-native-vector-icons/AntDesign';
import COLOR from '../../../../constants/colors';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { HomeStackParamList } from '../../../../navigation/types';

export default function ReportArticleList({ reportList }: { reportList: ReportArticleType[] }) {
  const navigation: NavigationProp<HomeStackParamList, 'ReportList'> = useNavigation();

  const navigateToReportList = () => {
    navigation.navigate('ReportList');
  };

  return (
    <FlatList
      data={reportList}
      renderItem={({ item }) => <ReportArticleCard data={item} />}
      numColumns={1}
      contentContainerStyle={styles.articleList}
      horizontal={true}
      ListFooterComponent={
        <View style={styles.moreContainer}>
          <Pressable style={styles.moreView} onPress={navigateToReportList}>
            <Text style={styles.moreViewText}>더보기</Text>
            <AntIcon name="right" size={12} color={COLOR.gray} />
          </Pressable>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  articleList: {
    gap: 12,
  },
  moreContainer: {
    width: 80,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
  },
  moreViewText: {
    fontSize: 12,
    color: `${COLOR.gray}`,
  },
});
