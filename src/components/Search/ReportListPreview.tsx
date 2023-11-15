import React from 'react';
import { View, StyleSheet, Text, Pressable, FlatList } from 'react-native';
import { ARTICLE_LIST } from '../../constants/DummyArticle';
import { ReportArticleType } from '../common/ReportArticle/ReportArticleCard/types';
import ReportArticleCard from '../common/ReportArticle/ReportArticleCard/ReportArticleCard';
import IonIcon from 'react-native-vector-icons/Ionicons';
import COLOR from '../../constants/colors';

interface ReportListPreviewProps {
  searchInput: string;
  selectedFilter: string;
  handleTabPress: (tabName: string) => void;
}

const ReportListPreview = ({
  searchInput,
  selectedFilter,
  handleTabPress,
}: ReportListPreviewProps) => {
  const [reports, setReports] = React.useState<ReportArticleType[]>(ARTICLE_LIST);

  // React.useEffect(() => {
  //   const loadReports = async () => {
  //     try {
  //       const response = await axios.get<Report[]>(`/reports?search=${searchInput}?filter=${selectedFilter}`);
  //       setReports(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   loadReports();
  // }, [searchInput, filter]);

  return (
    <View style={styles.container}>
      <View style={styles.tabNameContainer}>
        <Text style={styles.tabName}>제보</Text>
        <Pressable onPress={() => handleTabPress('제보')} style={styles.button}>
          <Text style={styles.buttonText}>더보기</Text>
          <IonIcon name="chevron-forward" size={12} color={`${COLOR.gray}`} />
        </Pressable>
      </View>
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
        contentContainerStyle={{ gap: 12 }}
        scrollEnabled={false}
      />
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
