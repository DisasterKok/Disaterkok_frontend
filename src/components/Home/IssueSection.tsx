import React from 'react';
import { LinearGradient } from 'react-native-linear-gradient';
import { View, Text, StyleSheet, Platform, ScrollView, TouchableOpacity } from 'react-native';
import COLOR from '../../constants/colors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { HomeStackParamList } from '../../navigation/types';

const CommonIssue = {
  location: '대구',
  issue: ['산사태', '팔공산', '달서구'],
};

const LocalKeyword = {
  keyword: ['#지진', '#폭설', '#한파', '#교통사고', '#산불'],
};

const IssueSection = ({ isLocalSelected }: { isLocalSelected: boolean }) => {
  const navigation: NavigationProp<HomeStackParamList> = useNavigation();

  const handleKeywordSearch = (keyword: string) => {
    navigation.navigate('Search', { keywordInput: keyword });
  };

  return (
    <View style={styles.sectionCard}>
      {isLocalSelected ? (
        <View>
          <Text style={styles.title}>우리동네 키워드</Text>
          <Text style={styles.content}>
            현재 우리동네 실시간 이슈가 되는 키워드는 무엇인지 확인해요
          </Text>
          <ScrollView horizontal style={styles.keywordContainer}>
            {LocalKeyword.keyword.map((keyword, index) => (
              <TouchableOpacity
                key={index}
                style={styles.keywordBox}
                onPress={() => handleKeywordSearch(keyword)}
              >
                <Text style={styles.keywordText}>{keyword}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ) : (
        <View>
          <Text style={styles.title}>실슈체크</Text>
          <Text style={styles.content}>현재 실시간 이슈, 어떤 실슈가 있는지 확인해요</Text>
          <View style={styles.issueContainer}>
            <View style={{ transform: [{ scaleX: -1 }], marginRight: 10 }}>
              <Text style={{ fontSize: 10 }}>📢</Text>
            </View>
            <Text style={styles.issueText}>{CommonIssue.location} </Text>
            {CommonIssue.issue.map((issue, index) => (
              <TouchableOpacity key={index} onPress={() => handleKeywordSearch(issue)}>
                <Text style={styles.issueText}>#{issue} </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default IssueSection;

const styles = StyleSheet.create({
  sectionCard: {
    position: 'relative',
    display: 'flex',
    paddingVertical: 17,
    paddingHorizontal: 15,
    width: '100%',
    height: 110,
    backgroundColor: `${COLOR.grayBackground}`,
    borderRadius: 20,
    alignItems: 'stretch',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.05)',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
    marginBottom: 30,
  },
  title: {
    color: `${COLOR.darkGray}`,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 22,
  },
  content: {
    color: `${COLOR.gray}`,
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 20,
  },
  issueContainer: {
    position: 'absolute',
    top: 48,
    width: '100%',
    height: 30,
    backgroundColor: `${COLOR.white}`,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  issueText: {
    color: `${COLOR.alert}`,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 22,
  },
  keywordContainer: {
    position: 'absolute',
    top: 48,
    width: '100%',
    flexDirection: 'row',
    height: 30,
  },
  keywordBox: {
    height: 25,
    borderRadius: 50,
    marginRight: 10,
    backgroundColor: `${COLOR.white}`,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keywordText: {
    color: `${COLOR.alert}`,
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 22,
  },
});
