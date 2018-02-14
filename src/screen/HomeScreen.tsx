import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

// model
import { UserData } from '../common/Model'
import { NavigationProps } from '../common/Model';

// utill
import Router from '../util/Router';
import LocalStorage from '../util/LocalStorage';

interface HomeScreenState {
  userData: UserData;
}

class HomeScreen extends Component<NavigationProps, HomeScreenState> {
  constructor(props) {
    super(props)
    this.state = {
      userData: undefined,
    }
  }
  componentDidMount() {
    // 유저 정보가 바뀔때마다 정보를 업데이트 시켜주는 리스너 추가
    LocalStorage.setUserDataListener(this.fetchedLocalItem.bind(this));
  }

  fetchedLocalItem(result: UserData) {
    const userData: UserData = result;
    console.log('HomeScreen User Data:', userData);
    if (userData.exerciseLevel === undefined) this.props.navigation.navigate(Router.SETTING);
    else this.setState({ ...this.state, userData })
  }

  _onPressButton() {
    this.props.navigation.navigate(Router.EXERCISE);
  }

  render() {
    return (
      this.state.userData === undefined ?
        <View>
          <Text>you are first visitor!</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate(Router.SETTING)}>
            <Text>Set up user level</Text>
          </TouchableOpacity>
        </View>
        :
        <View>
          <Text>this is home view</Text>
          <TouchableOpacity onPress={this._onPressButton.bind(this)}>
            <Text>Exercise Start</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

export default HomeScreen;
