import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import COLOR from '../../constants/colors';

const DummyKeywords = [
  '키워드1',
  '키워드22222222',
  '키워드3333',
  '키워드44',
  '키워드555555555555',
  '키워드66666666',
  '키워드777',
  '키워드888888',
  '키워드9',
];

const KeywordList = ({
  history,
  onKeywordClick,
}: {
  history: string[];
  onKeywordClick: (keyword: string) => void;
}) => {
  const [formattedDate, setFormattedDate] = React.useState('');
  const [popularKeywords, setPopularKeywords] = React.useState<string[]>(DummyKeywords);

  React.useEffect(() => {
    const updateDate = () => {
      const now = new Date(); // 2023년 9월 27일 3시로 설정
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        hour12: false,
      };
      const formattedDateString = now.toLocaleString('ko-KR', options);
      setFormattedDate(formattedDateString);
    };
    // 초기화 및 60초마다 업데이트
    updateDate();
    const intervalId = setInterval(updateDate, 60000);
    // 컴포넌트가 언마운트되면 clearInterval 호출하여 interval 정리
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.keywordTypeContainer}>
          <Text style={styles.keywordType}>최근 검색어</Text>
        </View>
        <View style={styles.keywordsContainer}>
          {history.map((keyword) => (
            <TouchableOpacity
              key={keyword}
              onPress={() => onKeywordClick(keyword)}
              style={styles.keywordButton}
            >
              <Text style={styles.keywordText}>{keyword}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View>
        <View style={styles.keywordTypeContainer}>
          <Text style={styles.keywordType}>인기 검색어</Text>
          <Text style={styles.time}>{formattedDate} 기준</Text>
        </View>
        <View style={styles.keywordsContainer}>
          {popularKeywords.map((keyword) => (
            <TouchableOpacity
              key={keyword}
              onPress={() => onKeywordClick(keyword)}
              style={styles.keywordButton}
            >
              <Text style={styles.keywordText}>{keyword}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default KeywordList;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingVertical: 10,
    gap: 14,
  },
  keywordType: {
    fontSize: 14,
    fontWeight: '500',
    color: `${COLOR.darkGray}`,
  },
  keywordTypeContainer: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  time: {
    fontSize: 10,
    fontWeight: '400',
    color: `${COLOR.gray}`,
  },
  keywordsContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 10,
  },
  keywordButton: {
    height: 30,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${COLOR.lightBlue}`,
  },
  keywordText: {
    color: `${COLOR.darkGray}`,
    fontSize: 10,
    fontWeight: '400',
  },
});
