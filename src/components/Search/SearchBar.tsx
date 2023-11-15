import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import COLOR from '../../constants/colors';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import HeaderLeftGoBack from '../common/Header/HeadrLeftGoBack';

const SearchBar = ({
  onSearch,
  onSearching,
  keyword,
}: {
  onSearch: (searchText: string) => void;
  onSearching: () => void;
  keyword?: string;
}) => {
  const [searchText, setSearchText] = React.useState<string>('');
  const [isFocused, setIsFocused] = React.useState<boolean>(false);
  const [hashtagActive, setHashtagActive] = React.useState<boolean>(false);

  const handleSearch = () => {
    if (!searchText) return;
    // 검색하기
    onSearch(searchText);
  };

  React.useEffect(() => {
    if (keyword) {
      setSearchText(keyword);
    }
  }, [keyword]);

  const addHashtag = () => {
    setSearchText(`#${searchText}`);
  };

  const deleteHashtag = () => {
    setSearchText(searchText.replace(/^#/, ''));
  };

  const handleHashtag = () => {
    if (hashtagActive) {
      deleteHashtag();
    } else {
      addHashtag();
    }
    setHashtagActive(!hashtagActive);
  };

  const handleChangeText = (text: string) => {
    onSearching();
    setSearchText(text);
    if (text.startsWith('#')) {
      setHashtagActive(true);
    } else {
      setHashtagActive(false);
    }
  };

  return (
    <View style={styles.layout}>
      <View style={{ position: 'absolute', left: 10, top: 8 }}>
        <HeaderLeftGoBack />
      </View>
      <TextInput
        style={[
          styles.searchBar,
          isFocused && { borderColor: `${COLOR.skyBlue}` },
          hashtagActive && { color: `${COLOR.activated}`, fontWeight: '500' },
        ]}
        placeholder="검색어를 입력해주세요"
        value={searchText}
        onChangeText={handleChangeText}
        onFocus={() => {
          onSearching();
          setIsFocused(true);
        }}
        onBlur={() => setIsFocused(false)}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        onSubmitEditing={handleSearch}
        selectionColor={COLOR.skyBlue}
      />
      <TouchableOpacity
        onPress={handleHashtag}
        style={[styles.hashtagButton, hashtagActive && { backgroundColor: `${COLOR.activated}` }]}
      >
        <Text style={{ fontSize: 18, color: '#fff' }}>#</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
        <AntIcon name="search1" size={22} color={COLOR.deactivated} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  layout: {
    position: 'relative',
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 38,
    paddingRight: 22,
    alignItems: 'center',
    marginBottom: 15,
  },
  searchBar: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    borderColor: `${COLOR.deactivated}`,
    borderWidth: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  hashtagButton: {
    position: 'absolute',
    right: 62,
    backgroundColor: `${COLOR.skyBlue}`,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButton: {
    position: 'absolute',
    right: 32,
  },
});
