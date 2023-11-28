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
      console.log(payload);
      const response = await instance.post('/users/login/', payload);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  //   logout: async () => {
  //     const response = await instance.post(USER_API.LOGOUT);
  //     return response.data;
  //   },
  register: async (payload: registerPayload) => {
    try {
      console.log(payload);
      const response = await instance.post('/users/register/', payload);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default userAPI;
