import React, { RefObject, useState } from 'react';
import { Pressable, StyleSheet, View, Text, FlatList } from 'react-native';
import COLOR from '../../../constants/colors';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

interface TabBarProps {
  tabList: string[];
}

export default function TabBar({ tabList }: TabBarProps) {
  const [selectedTab, setSelectedTab] = useState(tabList[0]);

  const handleTabPress = (tabName: string) => {
    setSelectedTab(tabName);
  };

  const renderTabBar = ({ item }: { item: string }) => (
    <Pressable
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
    </Pressable>
  );

  return (
    <View>
      <FlatList
        data={tabList}
        renderItem={renderTabBar}
        numColumns={1}
        contentContainerStyle={styles.tabContainer}
        horizontal={true}
      />

      {/* <Pressable
        style={
          selectedTab === '전국' ? StyleSheet.compose(styles.tab, styles.selectedTab) : styles.tab
        }
        onPress={() => handleTabPress('전국')}
      >
        <Text
          style={
            selectedTab === '전국'
              ? StyleSheet.compose(styles.tabText, styles.selectedTabText)
              : styles.tabText
          }
        >
          전국
        </Text>
      </Pressable>
      <Pressable
        style={
          selectedTab === '우리동네'
            ? StyleSheet.compose(styles.tab, styles.selectedTab)
            : styles.tab
        }
        onPress={() => handleTabPress('우리동네')}
      >
        <Text
          style={
            selectedTab === '우리동네'
              ? StyleSheet.compose(styles.tabText, styles.selectedTabText)
              : styles.tabText
          }
        >
          우리동네
        </Text>
        {selectedTab === '우리동네' && (
          <FaIcon
            name="angle-down"
            size={15}
            color={COLOR.black}
            onPress={() => handlePresentModalPress(selectAddressModalRef)}
          />
        )}
      </Pressable> */}
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  tab: {
    paddingBottom: 10,
    flexDirection: 'row',
    gap: 7,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: `${COLOR.middleGray}`,
  },
  selectedTab: {
    borderBottomWidth: 2,
  },
  selectedTabText: {
    color: `${COLOR.black}`,
  },
});
