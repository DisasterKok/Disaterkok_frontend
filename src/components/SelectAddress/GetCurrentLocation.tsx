import Geolocation from '@react-native-community/geolocation';
import { KAKAO_REST_API_KEY } from '@env';

export interface LocationData {
  address: string;
  regionName: string;
  roadAddress: string;
  zoneCode: string;
  xCoordinate: number;
  yCoordinate: number;
}

const getCurrentLocation = (): Promise<LocationData> => {
  return new Promise((resolve, reject) => {
    const REST_API_KEY = KAKAO_REST_API_KEY;
    const input_coord = 'WGS84';

    Geolocation.getCurrentPosition(
      (position: any) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}&input_coord=${input_coord}`;

        //console.log(position);
        fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `KakaoAK ${REST_API_KEY}`,
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((data: any) => {
            if (data.documents.length === 0) reject('위치를 얻는 도중 오류가 발생했습니다.');
            //console.log(data);
            const address = data.documents[0].address.address_name;
            const regionName = `${data.documents[0].address.region_1depth_name} ${data.documents[0].address.region_2depth_name}`;
            const roadAddress = data.documents[0].road_address
              ? data.documents[0].road_address.address_name
              : '';
            const zoneCode = data.documents[0].road_address
              ? data.documents[0].road_address.zone_no
              : '';

            const locationData: LocationData = {
              address,
              regionName,
              roadAddress,
              zoneCode,
              xCoordinate: latitude,
              yCoordinate: longitude,
            };

            resolve(locationData);
          })
          .catch((error) => {
            //console.error(error);
            reject(error);
          });
      },
      (error: any) => {
        //console.error(error);
        reject(error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  });
};

export default getCurrentLocation;
