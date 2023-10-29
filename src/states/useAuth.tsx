import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IAuthStore {
  isLoggedIn: boolean;
  accessToken: string | null;
  login: (accessToken: string) => void;
  logout: () => void;
}

const useAuth = create<IAuthStore>((set) => {
  const loadAuthData = async () => {
    try {
      const authDataJSON = await AsyncStorage.getItem('authData');
      if (authDataJSON) {
        const authData = JSON.parse(authDataJSON);
        set(() => ({
          isLoggedIn: true,
          accessToken: authData.accessToken,
        }));
      }
    } catch (error) {
      set(() => ({
        isLoggedIn: false,
        accessToken: null,
      }));
    }
  };

  loadAuthData();

  return {
    isLoggedIn: false, // Initialize as false
    userId: null,
    accessToken: null,
    login: async (accessToken) => {
      // save accessToken to AsyncStorage
      const authDataToSave = { accessToken };
      try {
        await AsyncStorage.setItem('authData', JSON.stringify(authDataToSave));
        // set state
        set(() => ({
          isLoggedIn: true,
          accessToken,
        }));
      } catch (error) {
        console.error('Error saving auth data:', error);
      }
    },
    logout: async () => {
      try {
        // logout 요청 필요할 수도
        await AsyncStorage.removeItem('authData');
        set(() => ({
          isLoggedIn: false,
          accessToken: null,
        }));
      } catch (error) {
        console.error('Error removing auth data:', error);
      }
    },
  };
});

export default useAuth;
