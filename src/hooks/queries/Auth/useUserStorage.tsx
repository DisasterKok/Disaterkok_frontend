import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';
import { User } from './types';

const USER_NAME_STORAGE_KEY = 'USER_NAME';
const USER_LOC_STORAGE_KEY = 'USER_LOC';
const ACCESS_TOKEN = 'ACCESS_TOKEN';
const REFRESH_TOKEN = 'REFRESH_TOKEN';

const useUserStorage = {
  async getUserName() {
    try {
      const username = await AsyncStorage.getItem(USER_NAME_STORAGE_KEY);
      return username || '';
    } catch (error) {
      console.error('Error retrieving user:', error);
      return '';
    }
  },

  async getLocData() {
    try {
      const locData = await AsyncStorage.getItem(USER_LOC_STORAGE_KEY);
      return locData === 'true';
    } catch (error) {
      console.error('Error retrieving user:', error);
      return false;
    }
  },

  async getAccessToken() {
    try {
      const credentials = await Keychain.getGenericPassword({ service: ACCESS_TOKEN });
      console.log('credentials  :', credentials);
      return credentials ? credentials.password : '';
    } catch (error) {
      console.error('Error retrieving access token:', error);
      return '';
    }
  },

  async getRefreshToken() {
    try {
      const credentials = await Keychain.getGenericPassword({ service: REFRESH_TOKEN });

      return credentials ? credentials.password : '';
    } catch (error) {
      console.error('Error retrieving refresh token:', error);
      return '';
    }
  },

  async set(user: User) {
    try {
      await AsyncStorage.setItem(USER_NAME_STORAGE_KEY, user.username);
      await AsyncStorage.setItem(USER_LOC_STORAGE_KEY, JSON.stringify(user.locData.toString()));
      await Keychain.setGenericPassword(ACCESS_TOKEN, user.token.access, {
        service: ACCESS_TOKEN,
      });
      await Keychain.setGenericPassword(REFRESH_TOKEN, user.token.refresh, {
        service: REFRESH_TOKEN,
      });
    } catch (error) {
      console.error('Error saving user:', error);
    }
  },

  async remove() {
    try {
      await AsyncStorage.removeItem(USER_NAME_STORAGE_KEY);
      await AsyncStorage.removeItem(USER_LOC_STORAGE_KEY);
      await Keychain.resetGenericPassword({ service: ACCESS_TOKEN });
      await Keychain.resetGenericPassword({ service: REFRESH_TOKEN });
    } catch (error) {
      console.error('Error removing user:', error);
    }
  },
};

export default useUserStorage;
