import axios from 'axios';
import { WEATHER_API_KEY } from '@env';
import { TMData } from './getTMCoords';

const getDustStation = async ({ tmX, tmY }: TMData) => {
  //console.log(WEATHER_API_KEY);
  try {
    const response = await axios.get(
      `http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getNearbyMsrstnList`,
      {
        params: {
          serviceKey: WEATHER_API_KEY,
          returnType: 'json',
          tmX: tmX,
          tmY: tmY,
          ver: '1.1',
        },
      },
    );

    const closestStationName = response.data.response.body.items[0].stationName;
    return closestStationName;
  } catch (error) {
    throw error;
  }
};

export default getDustStation;
