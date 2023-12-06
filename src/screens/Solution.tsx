import React from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, FlatList, Image } from 'react-native';
import COLOR from '../constants/colors';
import AntIcon from 'react-native-vector-icons/AntDesign';

type DisasterType = {
  id: number;
  text: string;
  imageSource: ReturnType<typeof require>;
};

const DISASTER: DisasterType[] = [
  {
    id: 1,
    text: '태풍',
    imageSource: require('../assets/disasterIcons/typhoon/typhoon.png'),
  },

  {
    id: 2,
    text: '전력',
    imageSource: require('../assets/disasterIcons/electrical/electrical.png'),
  },
  {
    id: 3,
    text: '지진',
    imageSource: require('../assets/disasterIcons/earthquake/earthquake.png'),
  },
  {
    id: 4,
    text: '산사태',
    imageSource: require('../assets/disasterIcons/landslide/landslide.png'),
  },
  {
    id: 5,
    text: '홍수',
    imageSource: require('../assets/disasterIcons/flood/flood.png'),
  },
  {
    id: 6,
    text: '호우',
    imageSource: require('../assets/disasterIcons/downpour/downpour.png'),
  },
  {
    id: 7,
    text: '대기오염',
    imageSource: require('../assets/disasterIcons/airpollution/airpollution.png'),
  },
  {
    id: 8,
    text: '감염병',
    imageSource: require('../assets/disasterIcons/Infectiousdiseases/Infectiousdiseases.png'),
  },
  {
    id: 9,
    text: '대설',
    imageSource: require('../assets/disasterIcons/heavysnow/heavysnow.png'),
  },
  {
    id: 10,
    text: '산불',
    imageSource: require('../assets/disasterIcons/forestfires/forestfires.png'),
  },
  {
    id: 11,
    text: '폭염',
    imageSource: require('../assets/disasterIcons/heatwave/heatwave.png'),
  },
];

export default function Solution() {
  const renderItem = ({ item }: { item: DisasterType }) => (
    <Pressable style={styles.catecoryCard}>
      <Image source={item.imageSource} style={{ width: 48, height: 48 }} />
      <Text style={styles.catecoryText}>{item.text}</Text>
    </Pressable>
  );

  return (
    <View style={styles.layout}>
      <View style={styles.topContainer}>
        <View style={styles.introduceContainer}>
          <Text style={styles.introuduceTitle}>확인해요, 재난 솔루션!</Text>
          <Text style={styles.introduceSubTitle}>궁금한 재난 안전요령을 눌러 확인해보세요</Text>
        </View>

        <View style={styles.selectContainer}>
          <View style={styles.tabContainer}>
            <Pressable style={styles.tab}>
              <Text style={styles.tabText}>전체</Text>
            </Pressable>
            <Pressable style={styles.tab}>
              <Text style={styles.tabText}>최근 발생한</Text>
            </Pressable>
            <Pressable style={styles.tab}>
              <Text style={styles.tabText}>내가 설정한</Text>
            </Pressable>
          </View>
          <ScrollView horizontal style={styles.catecoryContainer}>
            <FlatList data={DISASTER} renderItem={renderItem} numColumns={1} horizontal />
          </ScrollView>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.disasterTitle}>지진 발생 시 이렇게 행동하세요!</Text>
        <View style={styles.swipper}>
          <Text>스와이프 영역</Text>
        </View>
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsText}>이 재난에 대한 상세 행동요령이 궁금해요</Text>
          <AntIcon name="right" size={10} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    width: '100%',
    height: '100%',
    backgroundColor: `${COLOR.whiteBackground}`,
  },
  topContainer: {
    backgroundColor: `${COLOR.primary}`,
    borderBottomLeftRadius: 20,
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 15,
    gap: 30,
  },
  introduceContainer: {
    gap: 3,
  },
  introuduceTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: `${COLOR.white}`,
  },
  introduceSubTitle: {
    fontSize: 10,
    fontWeight: '500',
    color: `${COLOR.white}`,
  },
  selectContainer: {
    gap: 15,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  tab: {
    width: 80,
    height: 30,
    borderRadius: 20,
    borderColor: `${COLOR.white}`,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '500',
    color: `${COLOR.white}`,
  },
  catecoryContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  catecoryCard: {
    width: 85,
    height: 112,
    borderRadius: 7,
    backgroundColor: `${COLOR.white}`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    gap: 10,
  },
  catecoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: `${COLOR.gray}`,
  },
  bottomContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
    gap: 8,
  },
  disasterTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  swipper: {
    width: '100%',
    height: 230,
    borderRadius: 10,
    backgroundColor: `${COLOR.white}`,
  },
  tipsContainer: {
    width: '100%',
    height: 38,
    borderRadius: 10,
    backgroundColor: `${COLOR.white}`,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tipsText: {
    fontSize: 12,
    fontWeight: '500',
    color: `${COLOR.primary}`,
  },
});
