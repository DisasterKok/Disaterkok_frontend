import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import COLOR from '../../constants/colors';
import ReportArticleList from '../ReportArticle/ReportArticleList';

export default function ReportSection() {
  return (
    <View style={styles.reportWrapper}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>실시간 제보</Text>
        <Text style={styles.subTitle}>시민들의 실시간 제보를 통해 재난을 확인해요</Text>
      </View>
      <ReportArticleList />
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
});
