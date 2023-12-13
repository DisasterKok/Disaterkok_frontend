import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import COLOR from '../../constants/colors';
import ReportArticleList from '../common/ReportArticle/ReportArticleList/ReportArticleList';
import useReportListQuery from '../../hooks/queries/Reports/useReportListQuery';
import { ReportArticleType } from '../common/ReportArticle/ReportArticleCard/types';

interface ReportListPreviewProps {
  searchInput: string;
  selectedFilter: string;
  handleTabPress: (tabName: string) => void;
  reportList: ReportArticleType[];
}

const ReportListPreview = ({
  searchInput,
  selectedFilter,
  handleTabPress,
  reportList,
}: ReportListPreviewProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.tabNameContainer}>
        <Text style={styles.tabName}>제보</Text>
        <Pressable onPress={() => handleTabPress('제보')} style={styles.button}>
          <Text style={styles.buttonText}>더보기</Text>
          <IonIcon name="chevron-forward" size={12} color={`${COLOR.gray}`} />
        </Pressable>
      </View>
      <ReportArticleList reportList={reportList} />
    </View>
  );
};

export default ReportListPreview;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 10,
    marginBottom: 30,
  },
  tabNameContainer: {
    flexDirection: 'row',
    height: 27,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: `${COLOR.lightGray}`,
  },
  tabName: {
    color: `${COLOR.black}`,
    fontSize: 16,
    fontWeight: '600',
  },
  button: {
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonText: {
    color: `${COLOR.gray}`,
    fontSize: 12,
    fontWeight: '600',
  },
});
