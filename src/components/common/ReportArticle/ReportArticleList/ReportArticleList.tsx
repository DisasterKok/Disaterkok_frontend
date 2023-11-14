import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ARTICLE_LIST } from '../../../../constants/DummyArticle';
import ReportArticleCard from '../ReportArticleCard/ReportArticleCard';

export default function ReportArticleList() {
  return (
    <FlatList
      data={ARTICLE_LIST}
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
