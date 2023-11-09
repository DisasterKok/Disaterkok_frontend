import axios from 'axios';
import { USER_API } from '../config/api';

const userAPI = {
  login: async (id: string, password: string) => {
    const response = await axios.post(USER_API.LOGIN, {
      username: id,
      password: password,
    });
    return response.data;
  },
  //   logout: async () => {
  //     const response = await axios.post(USER_API.LOGOUT);
  //     return response.data;
  //   },
  register: async (id: string, email: string, password: string, nickname: string) => {
    console.log(USER_API.REGISTER);
    const response = await axios.post(USER_API.REGISTER, {
      username: id,
      email: email,
      password: password,
      //nickname: nickname,
    });
    return response.data;
  },
};

export default userAPI;
