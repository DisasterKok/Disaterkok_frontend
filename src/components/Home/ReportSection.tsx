import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import COLOR from '../../constants/colors';
import ReportArticleList from '../common/ReportArticle/ReportArticleList/ReportArticleList';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { HomeStackParamList } from '../../navigation/types';
import useReportListQuery from '../../hooks/queries/Reports/useReportListQuery';
import useUser from '../../hooks/queries/Auth/useUser';
import { ReportArticleType } from '../common/ReportArticle/ReportArticleCard/types';
import { ScrollView } from 'react-native-gesture-handler';

const reportArticles: ReportArticleType[] = [
  {
    id: 1,
    user: 'user1',
    title: '대구 달서구 현재 폭설',
    content:
      'This is the content of report article 1. Here you can add more details about the report.',
    created_at: '2024-02-15 / 09:00:00',
    images: [
      {
        id: 101,
        image:
          'https://s3-alpha-sig.figma.com/img/13a6/cc1a/c809174b4a26523fee0b1f8902988a10?Expires=1708905600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qrwjGa0AkBTQkztVNevJCAwpnBim5bBlBKBPRuyxXjY6xlLErKcobYwgEsm3Pg5Rh-6rgh-XDXGr80IOxngRwOrc0K9xcOMrCK4k8~fX6w9fMtkswQnIiQplc-dfU1s5lFHhbna0AGKxb~QMEBKf-8GFiRFElNtwFoyCj6pNt7yRid~vDKoDCyMOGdydOMVdwhkcTUvvfSvhBH0Q5eD8-sGBD4CWaR5dgq-O2LTq1UEsY1ELCZWkHSvidQxigJ4aU9NfsetOaoyPNOlKJyBcp3beNA67hciKsVP7aN4ehnIj2A6YvV2xPNzXUWHK2-uLSm0YvQ-ZsCF3uK36Fbkwzw__',
      },
      { id: 102, image: 'image-url-2.jpg' },
    ],
    view: 150,
    like: 25,
    tags: ['대구', '폭설'],
  },
  {
    id: 2,
    user: 'user2',
    title: '대구 달서구 현재 폭설',
    content:
      'This is the content of report article 1. Here you can add more details about the report.',
    created_at: '2024-02-15 / 09:00:00',
    images: [
      {
        id: 101,
        image:
          'https://s3-alpha-sig.figma.com/img/13a6/cc1a/c809174b4a26523fee0b1f8902988a10?Expires=1708905600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qrwjGa0AkBTQkztVNevJCAwpnBim5bBlBKBPRuyxXjY6xlLErKcobYwgEsm3Pg5Rh-6rgh-XDXGr80IOxngRwOrc0K9xcOMrCK4k8~fX6w9fMtkswQnIiQplc-dfU1s5lFHhbna0AGKxb~QMEBKf-8GFiRFElNtwFoyCj6pNt7yRid~vDKoDCyMOGdydOMVdwhkcTUvvfSvhBH0Q5eD8-sGBD4CWaR5dgq-O2LTq1UEsY1ELCZWkHSvidQxigJ4aU9NfsetOaoyPNOlKJyBcp3beNA67hciKsVP7aN4ehnIj2A6YvV2xPNzXUWHK2-uLSm0YvQ-ZsCF3uK36Fbkwzw__',
      },
      { id: 102, image: 'image-url-2.jpg' },
    ],
    view: 150,
    like: 25,
    tags: ['대구', '폭설', '한파', '추위'],
  },
  {
    id: 3,
    user: 'user3',
    title: '대구 달서구 현재 폭설',
    content:
      'This is the content of report article 1. Here you can add more details about the report.',
    created_at: '2024-02-15 / 09:00:00',
    images: [
      {
        id: 101,
        image:
          'https://s3-alpha-sig.figma.com/img/13a6/cc1a/c809174b4a26523fee0b1f8902988a10?Expires=1708905600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qrwjGa0AkBTQkztVNevJCAwpnBim5bBlBKBPRuyxXjY6xlLErKcobYwgEsm3Pg5Rh-6rgh-XDXGr80IOxngRwOrc0K9xcOMrCK4k8~fX6w9fMtkswQnIiQplc-dfU1s5lFHhbna0AGKxb~QMEBKf-8GFiRFElNtwFoyCj6pNt7yRid~vDKoDCyMOGdydOMVdwhkcTUvvfSvhBH0Q5eD8-sGBD4CWaR5dgq-O2LTq1UEsY1ELCZWkHSvidQxigJ4aU9NfsetOaoyPNOlKJyBcp3beNA67hciKsVP7aN4ehnIj2A6YvV2xPNzXUWHK2-uLSm0YvQ-ZsCF3uK36Fbkwzw__',
      },
      { id: 102, image: 'image-url-2.jpg' },
    ],
    view: 150,
    like: 25,
    tags: ['대구', '폭설', '교통사고'],
  },
];

export default function ReportSection() {
  const navigation: NavigationProp<HomeStackParamList, 'ReportList'> = useNavigation();
  const { user } = useUser();

  const {
    reportListQuery: { data: reports },
  } = useReportListQuery(user.token);

  const navigateToReportList = () => {
    navigation.navigate('ReportList');
  };

  return (
    <ScrollView style={styles.reportWrapper}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>실시간 제보</Text>
        <Text style={styles.subTitle}>시민들의 실시간 제보를 통해 재난을 확인해요</Text>
      </View>
      {reportArticles && <ReportArticleList reportList={reportArticles} />}

      {/* <Pressable style={styles.moreView} onPress={navigateToReportList}>
        <Text style={styles.moreViewText}>더보기</Text>
        <AntIcon name="right" size={12} color={COLOR.gray} />
      </Pressable> */}
    </ScrollView>
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
