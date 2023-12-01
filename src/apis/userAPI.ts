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
    try {
      const response = await instance.post('/users/login/', payload);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  register: async (payload: registerPayload) => {
    try {
      const response = await instance.post('/users/register/', payload);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default userAPI;
