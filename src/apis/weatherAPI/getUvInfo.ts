import axios from 'axios';
import { WEATHER_API_KEY } from '@env';

const getUvInfo = async () => {
  try {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const basetimes = [0, 3, 6, 9, 12, 15, 18, 21];
    const nearestBasetime = basetimes.reduce((prev, curr) =>
      curr <= now.getHours() ? curr : prev,
    );

    const base_time = nearestBasetime.toString().padStart(2, '0');
    const response = await axios.get(
      `http://apis.data.go.kr/1360000/LivingWthrIdxServiceV4/getUVIdxV4`,
      {
        params: {
          serviceKey: WEATHER_API_KEY,
          dataType: 'json',
          areaNo: '1100000000',
          time: `${year}${month}${day}${base_time}`,
        },
      },
    );

    const uv = response.data.response.body.items.item[0].h0;
    return Number(uv);
  } catch (error) {
    throw error;
  }
};

export default getUvInfo;
