import React from 'react';
import { Pressable, StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import COLOR from '../../../constants/colors';

interface TabBarProps {
  tabList: string[];
  selectedTab: string;
  handleTabPress: (tabName: string) => void;
  gap?: number;
  renderType?: 'default' | 'button';
}

export default function TabBar({
  tabList,
  selectedTab,
  handleTabPress,
  gap,
  renderType,
}: TabBarProps) {
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

  const renderButton = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={
        selectedTab === item
          ? StyleSheet.compose(styles.button, styles.selectedButton)
          : styles.button
      }
      onPress={() => handleTabPress(item)}
    >
      <Text
        style={
          selectedTab === item
            ? StyleSheet.compose(styles.buttonText, styles.selectedButtonText)
            : styles.buttonText
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
        renderItem={
          renderType ? (renderType == 'button' ? renderButton : renderTabBar) : renderTabBar
        }
        numColumns={1}
        contentContainerStyle={StyleSheet.compose(styles.tabContainer, { gap: gap || 10 })}
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
  button: {
    height: 30,
    paddingHorizontal: 15,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${COLOR.whiteBackground}`,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: `${COLOR.deactivated}`,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '500',
    color: `${COLOR.gray}`,
  },
  selectedButton: {
    backgroundColor: `${COLOR.blue}`,
    borderColor: `${COLOR.blue}`,
  },
  selectedButtonText: {
    color: `${COLOR.white}`,
  },
});
