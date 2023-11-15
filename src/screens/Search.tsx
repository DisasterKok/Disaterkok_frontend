import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import COLOR from '../constants/colors';
import SearchBar from '../components/Search/SearchBar';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { HomeStackParamList } from '../navigation/types';
import KeywordList from '../components/Search/KeywordsList';

const Search = () => {
  const insets = useSafeAreaInsets();
  const [searchHistory, setSearchHistory] = React.useState<string[]>([]);
  const [searchInput, setSearchInput] = React.useState<string>('');
  const [isSearched, setIsSearched] = React.useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = React.useState<string>('');

  const navigation = useNavigation() as NavigationProp<HomeStackParamList, 'ReportList'>;

  React.useEffect(() => {
    loadSearchHistory();
    console.log('searchHistory:', searchHistory);
  }, []);

  const onSearching = () => {
    if (isSearched) {
      setIsSearched(false);
    }
  };
  const handleKeywordSearch = (keyword: string) => {
    setSearchKeyword(keyword);
    handleSearch(keyword);
  };

  const handleSearch = (searchInput: string) => {
    saveSearchHistory(searchInput);
    setSearchInput(searchInput);
    setIsSearched(true);
  };

  const saveSearchHistory = async (searchText: string) => {
    try {
      const existingIndex = searchHistory.indexOf(searchText);

      if (existingIndex !== -1) {
        searchHistory.splice(existingIndex, 1);
      }
      const newSearchHistory = [searchText, ...searchHistory.slice(0, 4)];
      await AsyncStorage.setItem('searchHistory', JSON.stringify(newSearchHistory));
      setSearchHistory(newSearchHistory);
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  };

  const loadSearchHistory = async () => {
    try {
      const savedSearchHistory = await AsyncStorage.getItem('searchHistory');
      if (savedSearchHistory) {
        setSearchHistory(JSON.parse(savedSearchHistory));
      }
    } catch (error) {
      console.error('Error loading search history:', error);
    }
  };

  return (
    <SafeAreaView style={styles.layout}>
      <View style={{ width: '100%', height: insets.top }}></View>
      <SearchBar
        onSearch={handleSearch}
        onSearching={onSearching}
        keyword={searchKeyword ? searchKeyword : ''}
      />
      {isSearched ? (
        <View>
          <Text>검색 결과</Text>
        </View>
      ) : (
        <KeywordList history={searchHistory} onKeywordClick={handleKeywordSearch} />
      )}
    </SafeAreaView>
  );
};
export default Search;

const styles = StyleSheet.create({
  layout: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    backgroundColor: `${COLOR.whiteBackground}`,
  },
});
