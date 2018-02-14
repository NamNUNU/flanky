import { AsyncStorage } from 'react-native';

// model
import { UserData } from '../common/Model'

class LocalStorage {
  public KEY_userData = 'userData'
  private userData: UserData;
  private userDatalistener: (userData: UserData) => void;

  constructor() {
    // 로컬 정보를 리셋 하고 세팅 화면부터 시작할 때
    AsyncStorage.clear(this._fetchUserData.bind(this))
    // 리셋 없이 저장된 정보를 쓸 때
    // this._fetchUserData();
  }

  public getUserData() {
    return this.userData;
  }

  public setUserDataListener(userDatalistener: (userData: UserData) => void) {
    this.userDatalistener = userDatalistener;
  }

  public async _fetchUserData() {
    await AsyncStorage.getItem(this.KEY_userData, this._callFetchedUserData.bind(this))
  }

  private _callFetchedUserData(error, result) {
    // 저장된 정보가 없을 경우(처음 사용)
    if (result === null) {
      console.log('fetched userdata no result :', result)
      this.userData = new UserData();
      this.setItem(this.userData);
    } else {
      console.log('fetched userdata :', result)
      this.userData = JSON.parse(result);
    }
  }

  public async setItem(userData: UserData) {
    try {
      await AsyncStorage.mergeItem(this.KEY_userData, JSON.stringify(userData), () => {
        this.userData = userData;
        // 유저 정보가 바뀔때마다 등록된 리스너를 통해 홈 화면도 업데이트 시켜 줌
        if (this.userDatalistener !== undefined) this.userDatalistener(userData);
      });

    } catch (error) {
      console.log('set LocalStorage error:', error);
    }
  }

  public async getItem(func: (userData:UserData) => void) {
    try {
      await AsyncStorage.getItem(this.KEY_userData, (error, result) => {
        func(JSON.parse(result)) 
      });
    } catch (error) {
      console.log('get LocalStorage error:', error);
    }
  }


}

export default new LocalStorage();
