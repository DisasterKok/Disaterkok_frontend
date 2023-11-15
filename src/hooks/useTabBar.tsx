import { useState } from 'react';

interface TabBarProps {
  tabList: string[];
}

const useTabBar = ({ tabList }: TabBarProps) => {
  const [selectedTab, setSelectedTab] = useState(tabList[0]);

  const handleTabPress = (tabName: string) => {
    setSelectedTab(tabName);
  };

  return { tabList, selectedTab, handleTabPress };
};
export default useTabBar;
