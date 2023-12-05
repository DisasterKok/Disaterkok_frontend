import { KAKAO_REST_API_KEY } from '@env';

export interface TMData {
  tmX: number;
  tmY: number;
}

const getTMCoords = async (latitude: number, longitude: number): Promise<TMData> => {
  try {
    const REST_API_KEY = KAKAO_REST_API_KEY;
    const input_coord = 'WGS84';
    const output_coord = 'TM';

    const url = `https://dapi.kakao.com/v2/local/geo/transcoord?x=${longitude}&y=${latitude}&input_coord=${input_coord}&output_coord=${output_coord}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `KakaoAK ${REST_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!data.documents || data.documents.length === 0) {
      throw new Error('위치를 얻는 도중 오류가 발생했습니다.');
    }

    const tmCoords: TMData = {
      tmX: Number(data.documents[0].x),
      tmY: Number(data.documents[0].y),
    };

    return tmCoords;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getTMCoords;
