import React from 'react';
import TabBar from '../common/TabBar/TabBar';
import useTabBar from '../../hooks/useTabBar';
import { View, StyleSheet, ScrollView } from 'react-native';
import ReportListPreview from './ReportListPreview';
import SolutionListPreview from './SolutionListPreview';
import ReportArticleList from '../common/ReportArticle/ReportArticleList/ReportArticleList';
import useReportListQuery from '../../hooks/queries/Reports/useReportListQuery';

const SearchResult = ({ searchInput }: { searchInput: string }) => {
  const { tabList, selectedTab, handleTabPress } = useTabBar({
    tabList: ['전체', '제보', '솔루션'],
  });

  const {
    tabList: filterList,
    selectedTab: selectedFilter,
    handleTabPress: handleFilterPress,
  } = useTabBar({
    tabList: ['정확도순', '최신순', '인기순', '가까운순'],
  });

  const {
    reportListQuery: { data: reports },
  } = useReportListQuery();

  return (
    <View style={styles.layout}>
      <TabBar
        tabList={tabList}
        selectedTab={selectedTab}
        handleTabPress={handleTabPress}
        gap={30}
      />
      <TabBar
        tabList={filterList}
        selectedTab={selectedFilter}
        handleTabPress={handleFilterPress}
        gap={6}
        renderType="button"
      />
      <ScrollView style={{ marginBottom: 130 }}>
        {selectedTab === '전체' && (
          <>
            <ReportListPreview
              searchInput={searchInput}
              selectedFilter={selectedFilter}
              handleTabPress={handleTabPress}
            />
            <SolutionListPreview
              searchInput={searchInput}
              selectedFilter={selectedFilter}
              handleTabPress={handleTabPress}
            />
          </>
        )}
        {selectedTab === '제보' && <ReportArticleList reportList={reports} />}
        {selectedTab === '솔루션' && <></>}
      </ScrollView>
    </View>
  );
};

export default SearchResult;

const styles = StyleSheet.create({
  layout: {
    width: '100%',
    paddingHorizontal: 22,
    paddingVertical: 10,
    gap: 2,
  },
});
