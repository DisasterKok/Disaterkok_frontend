import axios from 'axios';
import { REACT_APP_API_URL } from '@env';

// Axios 인스턴스 생성 함수
export function createInstance() {
  return axios.create({
    baseURL: `${REACT_APP_API_URL}`,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export const instance = createInstance();
