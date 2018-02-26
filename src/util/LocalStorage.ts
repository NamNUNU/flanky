import { AsyncStorage } from 'react-native';

// model
import { UserData } from '../common/Model';

class LocalStorage {
  public KEY_userData = 'userData';

  constructor() {
    // 로컬 정보를 리셋 하고 세팅 화면부터 시작할 때
    // AsyncStorage.clear();
  }

  public async setItem(userData: UserData) {
    try {
      AsyncStorage.mergeItem(this.KEY_userData, JSON.stringify(userData));
    } catch (error) {
      console.log('set LocalStorage error:', error);
    }
  }

  public async getItem(func: (userData: UserData) => void) {
    try {
      await AsyncStorage.getItem(this.KEY_userData, (error, result) => {
        func(JSON.parse(result));
      });
    } catch (error) {
      console.log('get LocalStorage error:', error);
    }
  }
}

export default new LocalStorage();
