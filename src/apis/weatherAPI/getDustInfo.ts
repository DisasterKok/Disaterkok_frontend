import axios from 'axios';
import { WEATHER_API_KEY } from '@env';

const getDustInfo = async (stationName: string) => {
  try {
    const response = await axios.get(
      `http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty`,
      {
        params: {
          serviceKey: WEATHER_API_KEY,
          returnType: 'json',
          numOfRows: 100,
          pageNo: 1,
          stationName: stationName,
          dataTerm: 'DAILY',
          ver: '1.3',
        },
      },
    );

    const pm10 = Number(response.data.response.body.items[0].pm10Grade1h);
    const pm25 = Number(response.data.response.body.items[0].pm25Grade1h);

    return Math.max(pm10, pm25);
  } catch (error) {
    throw error;
  }
};

export default getDustInfo;
