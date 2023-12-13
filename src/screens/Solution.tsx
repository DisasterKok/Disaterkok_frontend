import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, FlatList, Image, Dimensions } from 'react-native';
import COLOR from '../constants/colors';
import AntIcon from 'react-native-vector-icons/AntDesign';
import SwiperFlatList from 'react-native-swiper-flatlist';

interface SolutionType {
  solutionImageSoucre: ReturnType<typeof require>;
  solutionText: string;
}

interface DisasterType {
  id: number;
  text: string;
  imageSource: ReturnType<typeof require>;
  solution: SolutionType[];
}

const DISASTER: DisasterType[] = [
  {
    id: 1,
    text: '지진',
    imageSource: require('../assets/disasterIcons/earthquake/earthquake.png'),
    solution: [
      {
        solutionImageSoucre: require('../assets/disasterIcons/earthquake/solution/earthquake_1.png'),
        solutionText: '탁자 안으로 들어가\n다리를 잡고 몸을 보호하세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/earthquake/solution/earthquake_2.png'),
        solutionText: '가스와 전기를 차단 후\n신속히 밖으로 대피하세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/earthquake/solution/earthquake_3.png'),
        solutionText: '운동장이나 공원 등\n넓은 곳으로 대피하세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/earthquake/solution/earthquake_4.png'),
        solutionText: '실내가 넓은 공간에선\n계단이나 기둥 근처로 피하세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/earthquake/solution/earthquake_5.png'),
        solutionText: '엘레베이터가 아닌\n계단을 이용해 이동하세요',
      },
    ],
  },

  {
    id: 2,
    text: '태풍',
    imageSource: require('../assets/disasterIcons/typhoon/typhoon.png'),
    solution: [
      {
        solutionImageSoucre: require('../assets/disasterIcons/typhoon/solution/typhoon_1.png'),
        solutionText: '외출을 자제하고\n실내에 머무르세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/typhoon/solution/typhoon_2.png'),
        solutionText: '강풍에 날리는 간판 및\n건물 외부 구조물에 주의하세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/typhoon/solution/typhoon_3.png'),
        solutionText: '실내에서 창문을\n창틀에 단단하게 고정하세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/typhoon/solution/typhoon_4.png'),
        solutionText: '해안도로, 해안가, 백사장\n근처에 가지 마세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/typhoon/solution/typhoon_5.png'),
        solutionText: '운전은 가급적 자제하며\n속도를 줄여주세요',
      },
    ],
  },
  {
    id: 3,
    text: '호우',
    imageSource: require('../assets/disasterIcons/flood/flood.png'),
    solution: [
      {
        solutionImageSoucre: require('../assets/disasterIcons/flood/solution/flood_1.png'),
        solutionText: '외출을 자제하고\n실내에 머무르세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/flood/solution/flood_2.png'),
        solutionText: '가로등이나 신호등,\n공사장 근처는 가지 마세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/flood/solution/flood_3.png'),
        solutionText: '물에 잠긴 도로 및\n하천은 건너지 마세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/flood/solution/flood_4.png'),
        solutionText: '위혐지역의 주민들은\n대피할 수 있도록 준비하세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/flood/solution/flood_5.png'),
        solutionText: '야영하는 경우 기상예보에 따라\n미리 대피해주세요',
      },
    ],
  },
  {
    id: 4,
    text: '산사태',
    imageSource: require('../assets/disasterIcons/landslide/landslide.png'),
    solution: [
      {
        solutionImageSoucre: require('../assets/disasterIcons/landslide/solution/landslide_1.png'),
        solutionText: '기상 예보와 산사태\n위험 정보를 확인하세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/landslide/solution/landslide_2.png'),
        solutionText: '등산 및 캠핑을 중단하세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/landslide/solution/landslide_3.png'),
        solutionText: '산사태 취약지역에서는\n미리 대피하세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/landslide/solution/landslide_4.png'),
        solutionText: '2차 피해 예방 위해\n가스와 전기를 차단하세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/landslide/solution/landslide_5.png'),
        solutionText: '옆집에도 상황을 알려\n함께 대피하세요',
      },
    ],
  },
  {
    id: 5,
    text: '홍수',
    imageSource: require('../assets/disasterIcons/flood/flood.png'),
    solution: [
      {
        solutionImageSoucre: require('../assets/disasterIcons/flood/solution/flood_1.png'),
        solutionText: '기상변화를 확인하세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/flood/solution/flood_2.png'),
        solutionText: '피난 장소를 사전에 파악하세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/flood/solution/flood_3.png'),
        solutionText: '홍수 발생 시\n높은 곳으로 대피하세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/flood/solution/flood_4.png'),
        solutionText: '대피 시 전기와 가스를 차단하세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/flood/solution/flood_5.png'),
        solutionText: '침수된 지역에서\n자동차 운행을 금지하세요',
      },
    ],
  },
  {
    id: 6,
    text: '폭염',
    imageSource: require('../assets/disasterIcons/heatwave/heatwave.png'),
    solution: [
      {
        solutionImageSoucre: require('../assets/disasterIcons/heatwave/solution/heatwave_1.png'),
        solutionText: '야외활동을 자제하고\n외출 시 모자를 준비하세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/heatwave/solution/heatwave_2.png'),
        solutionText: '물을 많이 마시고\n카페인 음료와 술은 자제하세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/heatwave/solution/heatwave_3.png'),
        solutionText: '현기증이 일어나면\n시원한 곳으로 이동하세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/heatwave/solution/heatwave_4.png'),
        solutionText: '혼자 농사일 및\n야외 작업을 자제하세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/heatwave/solution/heatwave_5.png'),
        solutionText: '오후 2~5시 사이에 무더위\n휴식 시간제를 적극 시행하세요',
      },
    ],
  },
  {
    id: 7,
    text: '대기오염',
    imageSource: require('../assets/disasterIcons/airpollution/airpollution.png'),
    solution: [
      {
        solutionImageSoucre: require('../assets/disasterIcons/airpollution/solution/airpollution_1.png'),
        solutionText: '마스크를 꼭 착용해주세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/airpollution/solution/airpollution_2.png'),
        solutionText: '교통량이 많은\n지역을 피해주세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/airpollution/solution/airpollution_3.png'),
        solutionText: '노약자 및 폐&심장 질환자는\n실외활동을 금지해주세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/airpollution/solution/airpollution_4.png'),
        solutionText: '외출 후에는 씻고\n물과 비타민C를 섭취해주세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/airpollution/solution/airpollution_5.png'),
        solutionText: '환기 및 물청소를 자주해주세요',
      },
    ],
  },
  {
    id: 8,
    text: '감염병',
    imageSource: require('../assets/disasterIcons/Infectiousdiseases/Infectiousdiseases.png'),
    solution: [
      {
        solutionImageSoucre: require('../assets/disasterIcons/Infectiousdiseases/solution/Infectiousdiseases_1.png'),
        solutionText: '사람과 사람 사이\n거리는 2m 이상 유지해주세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/Infectiousdiseases/solution/Infectiousdiseases_2.png'),
        solutionText: '30초 동안 손 씻고\n기침을 옷소매에 해주세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/Infectiousdiseases/solution/Infectiousdiseases_3.png'),
        solutionText: '매일 2번 이상 환기하고\n주기적으로 소독해주세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/Infectiousdiseases/solution/Infectiousdiseases_4.png'),
        solutionText: '아프면 3~4일 동안\n집에 머물러주세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/Infectiousdiseases/solution/Infectiousdiseases_5.png'),
        solutionText: '실내에서는 마스크를 꼭 착용하세요',
      },
    ],
  },
  {
    id: 9,
    text: '대설',
    imageSource: require('../assets/disasterIcons/heavysnow/heavysnow.png'),
    solution: [
      {
        solutionImageSoucre: require('../assets/disasterIcons/heavysnow/solution/heavysnow_1.png'),
        solutionText: '어린이와 노약자는\n외출을 자제하세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/heavysnow/solution/heavysnow_2.png'),
        solutionText: '내 집 앞이나\n내 점포 앞 눈을 치워주세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/heavysnow/solution/heavysnow_3.png'),
        solutionText: '지붕 및 비닐하우스\n눈을 치워주세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/heavysnow/solution/heavysnow_4.png'),
        solutionText: '대중교통을 이용하고\n차량 운행시엔 서행해주세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/heavysnow/solution/heavysnow_5.png'),
        solutionText: '차량 운행 시 서행해주세요',
      },
    ],
  },
  {
    id: 10,
    text: '산불',
    imageSource: require('../assets/disasterIcons/forestfires/forestfires.png'),
    solution: [
      {
        solutionImageSoucre: require('../assets/disasterIcons/forestfires/solution/forestfires_1.png'),
        solutionText: '산에서 흡연 및\n불 피우기를 금지해주세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/forestfires/solution/forestfires_2.png'),
        solutionText: '산 주변에서\n쓰레기를 태우지 말아주세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/forestfires/solution/forestfires_3.png'),
        solutionText: '초기 작은 산불은\n외투 등으로 끌 수 있어요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/forestfires/solution/forestfires_4.png'),
        solutionText: '산불이 커지면 안전지대로 대피하세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/forestfires/solution/forestfires_5.png'),
        solutionText: '대피 시 집 주위에\n물을 뿌리고 가스통을 제거하세요',
      },
    ],
  },
  {
    id: 11,
    text: '전력',
    imageSource: require('../assets/disasterIcons/electrical/electrical.png'),
    solution: [
      {
        solutionImageSoucre: require('../assets/disasterIcons/electrical/solution/electrical_1.png'),
        solutionText: '전력 상황에 관심을 가지세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/electrical/solution/electrical_2.png'),
        solutionText: '겨울철 오전, 여름철은\n오후 전기 사용을 자제하세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/electrical/solution/electrical_3.png'),
        solutionText: '비상 조명기구를 준비하세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/electrical/solution/electrical_4.png'),
        solutionText: '엘리베리터 이용을 자제하세요',
      },
      {
        solutionImageSoucre: require('../assets/disasterIcons/electrical/solution/electrical_5.png'),
        solutionText: '사전 예비 전원을 확보하세요',
      },
    ],
  },
];

export default function Solution() {
  const [selectedCatecory, setSelectedCatecory] = useState('전체');
  const [selectedDisaster, setSelectedDisaster] = useState('태풍');

  const selectedDisasterObject = DISASTER.find((disaster) => disaster.text === selectedDisaster);
  const selectedDisasterSolutions = selectedDisasterObject?.solution || [];

  const { width } = Dimensions.get('window');
  const cardWidth = width - 30;

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
            autoplay
            autoplayDelay={2}
            autoplayLoop
            index={2}
            showPagination
            data={selectedDisasterSolutions}
            renderItem={({ item }) => {
              return (
                <View style={[styles.swipper, { width: cardWidth }]}>
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
            paginationStyleItem={{ width: 4, height: 4, marginHorizontal: 2 }}
            paginationStyleItemInactive={{ backgroundColor: COLOR.lightGray }}
            paginationStyleItemActive={{ backgroundColor: COLOR.gray }}
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
    flex: 0.55,
    backgroundColor: `${COLOR.primary}`,
    borderBottomLeftRadius: 20,
    paddingTop: 70,
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
    flex: 1,
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
    width: '100%',
    height: 270,
    borderRadius: 10,
    backgroundColor: `${COLOR.white}`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 30,
    gap: 20,
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
});
