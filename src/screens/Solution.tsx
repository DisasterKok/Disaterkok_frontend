import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, FlatList, Image, Dimensions } from 'react-native';
import COLOR from '../constants/colors';
import AntIcon from 'react-native-vector-icons/AntDesign';
import SwiperFlatList from 'react-native-swiper-flatlist';
import Swiper from 'react-native-swiper';

type DisasterType = {
  id: number;
  text: string;
  imageSource: ReturnType<typeof require>;
  solution: [];
};

const DISASTER: DisasterType[] = [
  {
    id: 1,
    text: '태풍',
    imageSource: require('../assets/disasterIcons/typhoon/typhoon.png'),
    solution: [
      {
        solutionImageSoucre: require('../assets/disasterIcons/earthquake/solution/earthquake.png'),
        solutionText: '탁자 안으로 들어가\n다리를 잡고 몸을 보호하세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/earthquake/solution/earthquake.png'),
        solutionText: '탁자 안으로 들어가\n다리를 잡고 몸을 보호하세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/earthquake/solution/earthquake.png'),
        solutionText: '탁자 안으로 들어가\n다리를 잡고 몸을 보호하세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/earthquake/solution/earthquake.png'),
        solutionText: '탁자 안으로 들어가\n다리를 잡고 몸을 보호하세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/earthquake/solution/earthquake.png'),
        solutionText: '탁자 안으로 들어가\n다리를 잡고 몸을 보호하세요',
      },
    ],
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
  const [selectedCatecory, setSelectedCatecory] = useState('전체');
  const [selectedDisaster, setSelectedDisaster] = useState('태풍');

  const selectedDisasterObject = DISASTER.find((disaster) => disaster.text === selectedDisaster);
  const selectedDisasterSolutions = selectedDisasterObject?.solution || [];

  const { width } = Dimensions.get('window');

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCatecory(categoryName);
  };

  const handleDisasterClick = (disasterName: string) => {
    setSelectedDisaster(disasterName);
  };

  const renderCatecory = ({ item }: { item: string }) => (
    <Pressable
      style={
        selectedCatecory === item ? StyleSheet.compose(styles.tab, styles.activeTab) : styles.tab
      }
      onPress={() => handleCategoryClick(item)}
    >
      <Text style={styles.tabText}>{item}</Text>
    </Pressable>
  );

  const renderDisasterCard = ({ item }: { item: DisasterType }) => (
    <Pressable
      style={
        selectedDisaster === item.text
          ? StyleSheet.compose(styles.catecoryCard, styles.activeCatecoryCard)
          : styles.catecoryCard
      }
      onPress={() => handleDisasterClick(item.text)}
    >
      <Image
        source={item.imageSource}
        style={{
          width: 48,
          height: 48,
          tintColor: selectedDisaster === item.text ? COLOR.white : COLOR.middleGray,
        }}
      />
      <Text
        style={
          selectedDisaster === item.text
            ? StyleSheet.compose(styles.catecoryText, styles.activeCatecoryText)
            : styles.catecoryText
        }
      >
        {item.text}
      </Text>
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
          <FlatList
            data={['전체', '최근 발생한', '내가 설정한']}
            renderItem={renderCatecory}
            numColumns={1}
            horizontal
            contentContainerStyle={styles.tabContainer}
          />
          <FlatList data={DISASTER} renderItem={renderDisasterCard} numColumns={1} horizontal />
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.disasterTitle}>{selectedDisaster} 발생 시 이렇게 행동하세요!</Text>
        <View style={styles.swipperContainer}>
          <SwiperFlatList
            // autoplay
            // autoplayDelay={5}
            // autoplayLoop
            index={0}
            showPagination
            data={selectedDisasterSolutions}
            renderItem={({ item }) => {
              console.log(item);
              return (
                <View style={[styles.swipper, { width }]}>
                  <Image
                    source={item.solutionImageSoucre}
                    style={{
                      width: 161,
                      height: 128,
                    }}
                  />
                  <Text style={styles.solutionText}>{item.solutionText}</Text>
                </View>
              );
            }}
            paginationStyleItem={{ width: 4, height: 4 }}
            paginationStyleItemInactive={{ backgroundColor: COLOR.darkGray }}
          />
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
  activeTab: {
    backgroundColor: `${COLOR.skyBlue}`,
    borderColor: `${COLOR.skyBlue}`,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '500',
    color: `${COLOR.white}`,
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
  activeCatecoryCard: {
    backgroundColor: `${COLOR.skyBlue}`,
  },
  catecoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: `${COLOR.gray}`,
  },
  activeCatecoryText: {
    color: `${COLOR.white}`,
  },
  bottomContainer: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 15,
    gap: 8,
  },
  disasterTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  swipperContainer: {
    width: '100%',
  },
  swipper: {
    height: 230,
    borderRadius: 10,
    backgroundColor: `${COLOR.white}`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  solutionText: {
    fontSize: 14,
    color: `${COLOR.gray}`,
    textAlign: 'center',
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

  //
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  lastSlide: {
    justifyContent: 'flex-end',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    alignItems: 'center',
  },
  lastTitle: {
    marginBottom: 110,
  },
  titleText: {
    fontSize: 14,
    marginBottom: 4,
  },
  dot: {
    backgroundColor: `${COLOR.middleGray}`,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    marginBottom: 100,
  },
  activeDot: {
    backgroundColor: `${COLOR.black}`,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    marginBottom: 100,
  },
});
