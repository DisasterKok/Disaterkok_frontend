import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import COLOR from '../../constants/colors';
import ReportArticleList from '../common/ReportArticle/ReportArticleList/ReportArticleList';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { HomeStackParamList } from '../../navigation/types';
import useReportListQuery from '../../hooks/queries/Reports/useReportListQuery';

export default function ReportSection() {
  const navigation: NavigationProp<HomeStackParamList, 'ReportList'> = useNavigation();

  const {
    reportListQuery: { data: reports },
  } = useReportListQuery();

  const navigateToReportList = () => {
    navigation.navigate('ReportList');
  };

  return (
    <View style={styles.reportWrapper}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>실시간 제보</Text>
        <Text style={styles.subTitle}>시민들의 실시간 제보를 통해 재난을 확인해요</Text>
      </View>
      {/* {reports && <ReportArticleList reportList={reports.results} />} */}
      {reports && <ReportArticleList reportList={reports} />}

      <Pressable style={styles.moreView} onPress={navigateToReportList}>
        <Text style={styles.moreViewText}>더보기</Text>
        <AntIcon name="right" size={12} color={COLOR.gray} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  reportWrapper: {},
  titleContainer: {
    gap: 5,
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  subTitle: {
    fontSize: 10,
    color: `${COLOR.gray}`,
  },
  moreView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
    marginTop: 50,
  },
  moreViewText: {
    fontSize: 12,
    color: `${COLOR.gray}`,
  },
});
