import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

// model
import { UserData } from '../common/Model'

// utill
import Router from '../util/Router';
import LocalStorage from '../util/LocalStorage';
import { NavigationProps } from '../common/Model';

class HomeScreen extends Component<NavigationProps, {}> {
  componentDidMount() {
    LocalStorage.getItem(
      this.fetchedLocalItem.bind(this)
    );
  }

  fetchedLocalItem(error: Error, result: string) {
    const userData: UserData = JSON.parse(result);
    console.log('HomeScreen User Data:', userData);
    if (userData === null || userData.exerciseLevel === null) this.props.navigation.navigate(Router.SETTING);
  }

  _onPressButton() {
    this.props.navigation.navigate(Router.EXERCISE);
  }

  render() {
    return (
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
