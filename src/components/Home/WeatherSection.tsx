import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import COLOR from '../../constants/colors';
import axios from 'axios';
import { WEATHER_API_KEY } from '@env';
import getCurrentLocation from '../SelectAddress/GetCurrentLocation';
import dfs_xy_conv from '../../apis/weatherAPI/CoordinateConv';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import TemperatureCard from './WeatherCards/TemperatureCard';
import DustCard from './WeatherCards/DustCard';
import RainyCard from './WeatherCards/RainyCard';
import HumidCard from './WeatherCards/HumidCard';
import UVCard from './WeatherCards/UVCard';
import getTMCoords from '../../apis/weatherAPI/getTMCoords';
import getDustStation from '../../apis/weatherAPI/getDustStation';
import getDustInfo from '../../apis/weatherAPI/getDustInfo';
import getUvInfo from '../../apis/weatherAPI/getUvInfo';

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
      //console.log(infoResult);
      setLocation(infoResult);
    } catch (error) {
      console.error(error);
    }
  };

  const getCurrentDateTime = (): {
    base_date: string;
    base_time: string;
    fcst_date: string;
    fcst_time: string;
  } => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - 10);

    const currentHour = now.getHours();
    // 가장 가까운 Basetime 찾기
    const basetimes = [23, 2, 5, 8, 11, 14, 17, 20];
    const nearestBasetime = basetimes.reduce((prev, curr) =>
      curr <= now.getHours() ? curr : prev,
    );
    if (currentHour < 2) now.setDate(now.getDate() - 1);
    // 현재 시간의 base_date, base_time 계산
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const base_date = `${year}${month}${day}`;
    const base_time = nearestBasetime.toString().padStart(2, '0') + '00';

    const newNow = new Date();
    if (newNow.getHours() >= 23) now.setDate(now.getDate() + 1);
    newNow.setHours(newNow.getHours() + 1);

    const fcstyear = newNow.getFullYear();
    const fcstmonth = (newNow.getMonth() + 1).toString().padStart(2, '0');
    const fcstday = newNow.getDate().toString().padStart(2, '0');
    const fcst_date = `${fcstyear}${fcstmonth}${fcstday}`;
    const fcst_time = newNow.getHours().toString().padStart(2, '0') + '00';

    return { base_date, base_time, fcst_date, fcst_time };
  };

  React.useEffect(() => {
    const fetchWeatherData = async () => {
      const { base_date, base_time, fcst_date, fcst_time } = getCurrentDateTime();
      //console.log(location);
      const { x, y, lat, lon } = dfs_xy_conv('toXY', location.latitude, location.longitude);
      //console.log('격자', x, y);
      //console.log(x, y, lat, lon);
      //console.log(base_date, base_time, fcst_date, fcst_time);
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
          if (item.fcstDate === fcst_date && item.fcstTime === fcst_time) {
            if (item.category === 'POP' && item.fcstValue > -90) {
              res.rain_pos = item.fcstValue;
              //console.log('pos_rain:', item.fcstValue);
            } else if (item.category === 'REH' && item.fcstValue > -90) {
              res.humid = item.fcstValue;
              //console.log('humid:', item.fcstValue);
            } else if (item.category === 'TMP' && item.fcstValue > -90) {
              res.tmp = item.fcstValue;
              //console.log('tmp:', item.fcstValue);
            }
          }
        });
        setWeatherData({
          rain_pos: Number(res.rain_pos),
          humid: Number(res.humid),
          tmp: Number(res.tmp),
        });
        console.log('rain_pos', res.rain_pos, 'humid', res.humid, 'tmp', res.tmp);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }

      try {
        const { tmX, tmY } = await getTMCoords(location.latitude, location.longitude);
        //console.log('tmX, tmY', tmX, tmY);
        const nearestDustStation = await getDustStation({ tmX, tmY });
        //console.log('nearestDustStation', nearestDustStation);
        const dustInfo = await getDustInfo(nearestDustStation);
        const uvInfo = await getUvInfo();
        //console.log('dust', dustInfo);
        //console.log('uv', uvInfo);

        setDustUvData({
          dust: Number(dustInfo),
          uv: Number(uvInfo),
        });
        console.log('dust', dustInfo, 'uv', uvInfo);
      } catch (error) {
        console.log('Error fetching dust, uv data:', error);
      }
    };
    fetchWeatherData();
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
