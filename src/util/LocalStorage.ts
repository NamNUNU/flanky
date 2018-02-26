import { AsyncStorage } from 'react-native';

// model
import { UserData } from '../common/Model';

class LocalStorage {
  public KEY_userData = 'userData';

  constructor() {
    // 로컬 정보를 리셋 하고 세팅 화면부터 시작할 때
    AsyncStorage.clear();
    // 리셋 없이 저장된 정보를 쓸 때
    // this._fetchUserData();
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

  public isSetup(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(this.KEY_userData)
        .then(res => {
          console.log('res2', res);
          if (res !== null) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(err => reject(err));
    });
  }
}

export default new LocalStorage();
