import { AsyncStorage } from 'react-native';

// model
import { UserData } from '../common/Model'

class LocalStorage {
  public KEY_exerciseLevel = 'exerciseLevel';
  public KEY_userData = 'userData'
  private userData: UserData;

  constructor() {
    // 정보를 클리어 하고 세팅 화면부터 시작할 때 사용
    // AsyncStorage.clear(this._fetchUserData.bind(this))
    this._fetchUserData();
  }

  private async _fetchUserData() {
    await AsyncStorage.getItem(this.KEY_userData, this._callFetchedUserData.bind(this))
  }

  private _callFetchedUserData(error, result) {
    if (result === null) {
      console.log('fetched userdata no result :',result)
      this.userData = new UserData();
      this.setItem(this.userData);
    } else {
      console.log('fetched userdata :',result)
      this.userData = JSON.parse(result);
    }
  }

  public getUserData(){
    return this.userData;
  }

  public async setItem(userData:UserData) {
    try {
      await AsyncStorage.mergeItem(this.KEY_userData, JSON.stringify(userData));
    } catch (error) {
      console.log('set LocalStorage error:', error);
    }
  }

  public async getItem(func: (error: Error, result: string) => void) {
    try {
      await AsyncStorage.getItem(this.KEY_userData, func);
    } catch (error) {
      console.log('get LocalStorage error:', error);
    }
  }


}

export default new LocalStorage();
