import { AsyncStorage } from 'react-native';

class LocalStorage {
  static KEY_exerciseLevel = 'exerciseLevel';

  static async setItem(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log('set error:', error);
    }
  }

  static async getItem(key, func: (error: Error, result: string) => void) {
    try {
      const value = await AsyncStorage.getItem(key, func);
    } catch (error) {
      console.log('get error:', error);
    }
  }
}

export default LocalStorage;
