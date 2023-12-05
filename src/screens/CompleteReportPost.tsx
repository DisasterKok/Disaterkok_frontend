import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import COLOR from '../constants/colors';
import { HomeStackParamList } from '../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type ReportArticleDetailScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  'CompleteReportPost'
>;

export default function CompleteReportPost({ route }: ReportArticleDetailScreenProps) {
  const { id } = route.params;

  return (
    <View style={styles.layout}>
      <View style={styles.illustratorWrapper}>
        <Text>일러스트</Text>
      </View>

      <View style={styles.completeWrapper}>
        <Text style={styles.completeText}>업로드가 완료되었습니다</Text>
        <Text style={styles.completeText}>user 님의 소중한 제보 감사합니다!</Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonFirst}>
          <Text style={styles.buttonFirstText}>내가 쓴 글 확인하기</Text>
        </View>
        <View style={styles.buttonSecond}>
          <Text style={styles.buttonSecondText}>게시글 목록</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    gap: 40,
  },
  illustratorWrapper: {
    width: 150,
    height: 150,
    backgroundColor: `${COLOR.gray}`,
  },
  completeWrapper: {
    gap: 5,
    alignItems: 'center',
  },
  completeText: {
    fontSize: 14,
  },
  buttonContainer: {
    gap: 10,
  },
  buttonFirst: {
    width: 170,
    height: 50,
    backgroundColor: `${COLOR.blue}`,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonFirstText: {
    fontSize: 14,
    fontWeight: '500',
    color: `${COLOR.white}`,
  },
  buttonSecond: {
    width: 170,
    height: 50,
    backgroundColor: `${COLOR.white}`,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSecondText: {
    fontSize: 14,
    fontWeight: '500',
    color: `${COLOR.gray}`,
  },
});
