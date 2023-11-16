import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ReportArticleCard from '../ReportArticleCard/ReportArticleCard';
import { ReportArticleType } from '../ReportArticleCard/types';

export default function ReportArticleList({ reportList }: { reportList: ReportArticleType[] }) {
  return (
    <FlatList
      data={reportList}
      renderItem={({ item }) => (
        <ReportArticleCard
          id={item.id}
          elapsedTime={item.elapsedTime}
          viewCount={item.viewCount}
          likeCount={item.likeCount}
          title={item.title}
          tags={item.tags}
        />
      )}
      numColumns={1}
      contentContainerStyle={styles.articleList}
      scrollEnabled={false}
    />
  );
}

const styles = StyleSheet.create({
  articleList: {
    gap: 10,
  },
});
