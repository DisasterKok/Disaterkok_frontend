import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_LOCAL_STORAGE_KEY = 'USER';

export async function saveUser(user) {
  try {
    await AsyncStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user:', error);
  }
}

export async function getUser() {
  try {
    const user = await AsyncStorage.getItem(USER_LOCAL_STORAGE_KEY);
    return user ? JSON.parse(user) : undefined;
  } catch (error) {
    console.error('Error retrieving user:', error);
    return undefined;
  }
}

export async function removeUser() {
  try {
    await AsyncStorage.removeItem(USER_LOCAL_STORAGE_KEY);
  } catch (error) {
    console.error('Error removing user:', error);
  }
}
