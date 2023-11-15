import React from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  Text,
  FlatList,
  Touchable,
  TouchableOpacity,
} from 'react-native';

const SearchFilter = (tabList, selectedTab, handleTabPress) => {
  const renderTabBar = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={selectedTab === item ? StyleSheet.compose(styles.tab, styles.selectedTab) : styles.tab}
      onPress={() => handleTabPress(item)}
    >
      <Text
        style={
          selectedTab === item
            ? StyleSheet.compose(styles.tabText, styles.selectedTabText)
            : styles.tabText
        }
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={tabList}
        renderItem={renderTabBar}
        numColumns={1}
        contentContainerStyle={StyleSheet.compose(styles.tabContainer, { gap: gap || 10 })}
        horizontal={true}
      />
    </View>
  );
};

export default SearchFilter;
