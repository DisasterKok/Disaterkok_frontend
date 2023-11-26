import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import COLOR from '../../constants/colors';
import axios from 'axios';
import { WEATHER_API_KEY } from '@env';
import getCurrentLocation from '../SelectAddress/GetCurrentLocation';
import dfs_xy_conv from '../SelectAddress/CoordinateConv';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import TemperatureCard from './WeatherCards/TemperatureCard';
import DustCard from './WeatherCards/DustCard';
import RainyCard from './WeatherCards/RainyCard';
import HumidCard from './WeatherCards/HumidCard';
import UVCard from './WeatherCards/UVCard';

interface LocationInfo {
  addressName: string;
  latitude: number;
  longitude: number;
}

interface WeatherData {
  rain_pos: number;
  humid: number;
  tmp: number;
}

interface DustUvData {
  dust: number;
  uv: number;
}

const WeatherSection = () => {
  const [weatherData, setWeatherData] = React.useState<WeatherData>({
    rain_pos: 0,
    humid: 0,
    tmp: 0,
  });
  const [dustUvData, setDustUvData] = React.useState<DustUvData>({
    dust: 0,
    uv: 0,
  });
  const [location, setLocation] = React.useState<LocationInfo>({
    addressName: '중구 을지로 1가',
    latitude: 37,
    longitude: 126,
  });

  const handleCurrentLocation = async () => {
    try {
      const locationData = await getCurrentLocation();
      const infoResult: LocationInfo = {
        addressName: locationData.regionName,
        latitude: locationData.xCoordinate,
        longitude: locationData.yCoordinate,
      };
      console.log(infoResult);
      setLocation(infoResult);
    } catch (error) {
      console.error(error);
    }
  };

  const getCurrentDateTime = (): { base_date: string; base_time: string } => {
    const now = new Date();

    now.setMinutes(now.getMinutes() - 10);

    const hours = now.getHours();

    // 가장 가까운 Basetime 찾기
    const basetimes = [2, 5, 8, 11, 14, 17, 20, 23];
    const nearestBasetime = basetimes.reduce((prev, curr) =>
      curr <= now.getHours() ? curr : prev,
    );

    const base_date = now.toISOString().slice(0, 10).replace(/-/g, '');
    const base_time = nearestBasetime.toString().padStart(2, '0') + '00';

    return { base_date, base_time };
  };

  React.useEffect(() => {
    const fetchWeatherData = async () => {
      const { base_date, base_time } = getCurrentDateTime();
      console.log(location);
      const { x, y, lat, lon } = dfs_xy_conv('toXY', location.latitude, location.longitude);
      console.log(x, y, lat, lon);
      console.log(base_date, base_time);
      try {
        const response = await axios.get(
          'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst',
          {
            params: {
              serviceKey: `${WEATHER_API_KEY}`,
              pageNo: '1',
              numOfRows: '1000',
              dataType: 'JSON',
              base_date,
              base_time,
              nx: x?.toString(),
              ny: y?.toString(),
            },
          },
        );
        const responseObj = response.data.response;
        const bodyObj = responseObj.body;
        const itemsObj = bodyObj.items;
        const jsonArray = itemsObj.item;
        //console.log(jsonArray);
        const res = {
          rain_pos: '',
          humid: '',
          tmp: '',
        };
        jsonArray.forEach((item: any) => {
          if (item.category === 'POP' && res.rain_pos == '' && item.fcstValue > -90) {
            res.rain_pos = item.fcstValue;
          } else if (item.category === 'REH' && res.humid == '' && item.fcstValue > -90) {
            res.humid = item.fcstValue;
          } else if (item.category === 'TMP' && res.tmp == '' && item.fcstValue > -90) {
            res.tmp = item.fcstValue;
          }
        });
        setWeatherData({
          rain_pos: Number(res.rain_pos),
          humid: Number(res.humid),
          tmp: Number(res.tmp),
        });
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
    fetchWeatherData();
    console.log(weatherData);
  }, [location]);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>{location.addressName}의 현재 날씨는요,</Text>
        <TouchableOpacity onPress={handleCurrentLocation} style={styles.myLocationButton}>
          <MaterialIcon name="my-location" size={12} color={`${COLOR.white}`} />
          <Text style={styles.myLocationText}>내위치</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal style={styles.cardContainer}>
        <TemperatureCard temperature={weatherData.tmp} />
        <DustCard dust={dustUvData.dust} />
        <RainyCard rainPos={weatherData.rain_pos} />
        <HumidCard humid={weatherData.humid} />
        <UVCard uv={dustUvData.uv} />
      </ScrollView>
    </View>
  );
};

export default WeatherSection;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 22,
    paddingVertical: 20,
    height: 156,
    backgroundColor: `${COLOR.primary}`,
  },
  top: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: `${COLOR.white}`,
  },
  myLocationButton: {
    flexDirection: 'row',
    gap: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: `${COLOR.white}`,
  },
  myLocationText: {
    fontSize: 10,
    fontWeight: '500',
    color: `${COLOR.white}`,
    lineHeight: 17,
  },
  cardContainer: {
    width: '100%',
    paddingHorizontal: 3,
    flexDirection: 'row',
  },
});
