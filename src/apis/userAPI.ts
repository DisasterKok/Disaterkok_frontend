import { instance } from '../lib/axios';

export interface loginPayload {
  username: string;
  password: string;
}

export interface registerPayload {
  username: string;
  email: string;
  password: string;
  nickname: string;
}

const userAPI = {
  login: async (payload: loginPayload) => {
    const response = await instance.post('/users/login/', payload);
    return response.data;
  },

  register: async (payload: registerPayload) => {
    const response = await instance.post('/users/register/', payload);
    return response.data;
  },
};

export default userAPI;
