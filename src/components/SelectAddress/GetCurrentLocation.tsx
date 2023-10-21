import Geolocation from '@react-native-community/geolocation';
import { KAKAO_REST_API_KEY } from '@env';

const getCurrentLocation = () => {
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
            const address = data.documents[0].address.address_name;
            const roadAddress = data.documents[0].road_address.address_name;
            const zoneCode = data.documents[0].road_address.zone_no;

            const locationData = {
              address,
              roadAddress,
              zoneCode,
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
