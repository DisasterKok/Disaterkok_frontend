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
                style={styles.keywordBoxContainer}
                onPress={() => handleKeywordSearch(keyword)}
              >
                <LinearGradient
                  colors={[
                    '#FFF',
                    '#FFF',
                    'rgba(252, 252, 252, 0.80)',
                    'rgba(247, 247, 247, 0.50)',
                    'rgba(245, 245, 245, 0.80)',
                  ]}
                  style={styles.keywordBox}
                >
                  <Text style={styles.keywordText}>{keyword}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ) : (
        <View>
          <Text style={styles.title}>실슈체크</Text>
          <Text style={styles.content}>현재 실시간 이슈, 어떤 실슈가 있는지 확인해요</Text>
          <View style={styles.issueContainer}>
            <LinearGradient
              colors={[
                '#FFF',
                '#FFF',
                'rgba(252, 252, 252, 0.80)',
                'rgba(247, 247, 247, 0.50)',
                'rgba(245, 245, 245, 0.80)',
              ]}
              style={styles.issueBox}
            >
              <View style={{ transform: [{ scaleX: -1 }], marginRight: 10 }}>
                <Text style={{ fontSize: 10 }}>📢</Text>
              </View>
              <Text style={styles.issueText}>{CommonIssue.location} </Text>
              {CommonIssue.issue.map((issue, index) => (
                <TouchableOpacity key={index} onPress={() => handleKeywordSearch(issue)}>
                  <Text style={styles.issueText}>#{issue} </Text>
                </TouchableOpacity>
              ))}
            </LinearGradient>
          </View>
        </View>
      )}
    </View>
  );
};

export default IssueSection;

const styles = StyleSheet.create({
  sectionCard: {
    display: 'flex',
    padding: 15,
    justifyContent: 'center',
    width: '100%',
    height: 120,
    backgroundColor: `${COLOR.white}`,
    borderRadius: 20,
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
    width: '100%',
    height: 30,
    backgroundColor: `${COLOR.white}`,
    borderRadius: 50,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.05)',
        shadowOffset: {
          width: 1,
          height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
    marginTop: 5,
  },
  issueBox: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  issueText: {
    color: `${COLOR.primary}`,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 22,
  },
  keywordContainer: {
    width: '100%',
    flexDirection: 'row',
    height: 30,
  },
  keywordBoxContainer: {
    height: 25,
    borderRadius: 50,
    marginRight: 10,
    backgroundColor: `${COLOR.white}`,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.05)',
        shadowOffset: {
          width: 1,
          height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  keywordBox: {
    height: '100%',
    marginTop: 5,
    backgroundColor: `${COLOR.white}`,
    borderRadius: 50,
    paddingHorizontal: 15,
  },
  keywordText: {
    color: `${COLOR.primary}`,
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 22,
  },
});
