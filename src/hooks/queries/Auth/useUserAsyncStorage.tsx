import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from './types';

const USER_LOCAL_STORAGE_KEY = 'USER';

const useUserAsyncStorage = {
  async get() {
    try {
      const user = await AsyncStorage.getItem(USER_LOCAL_STORAGE_KEY);
      return user ? JSON.parse(user) : undefined;
    } catch (error) {
      console.error('Error retrieving user:', error);
      return null;
    }
  },

  async set(user: User) {
    try {
      await AsyncStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user:', error);
    }
  },

  async remove() {
    try {
      await AsyncStorage.removeItem(USER_LOCAL_STORAGE_KEY);
    } catch (error) {
      console.error('Error removing user:', error);
    }
  },
};

export default useUserAsyncStorage;
