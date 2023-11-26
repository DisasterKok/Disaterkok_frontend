import { KAKAO_REST_API_KEY } from '@env';

interface Coordinates {
  latitude: number;
  longitude: number;
}

const getAddressCoords = (address: string): Promise<Coordinates> => {
  return new Promise<Coordinates>((resolve, reject) => {
    const REST_API_KEY = KAKAO_REST_API_KEY;
    const query = encodeURIComponent(address);
    const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${query}`;

    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `KakaoAK ${REST_API_KEY}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.documents.length === 0) reject(new Error('주소를 찾을 수 없습니다.'));

        const latitude = Number(data.documents[0].y);
        const longitude = Number(data.documents[0].x);

        const coordinates: Coordinates = {
          latitude,
          longitude,
        };

        resolve(coordinates);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default getAddressCoords;
