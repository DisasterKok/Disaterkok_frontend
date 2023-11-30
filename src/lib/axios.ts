import axios from 'axios';
import { API_URL } from '@env';

// Axios 인스턴스 생성 함수
export function createInstance() {
  return axios.create({
    baseURL: `${API_URL}`,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export const instance = createInstance();
