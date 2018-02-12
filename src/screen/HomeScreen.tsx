import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

// utill
import Router from '../util/Router';
import LocalStorage from '../util/LocalStorage';
import { NavigationProps } from '../common/Model';

class HomeScreen extends Component<NavigationProps, {}> {
  componentDidMount() {
    LocalStorage.getItem(
      LocalStorage.KEY_exerciseLevel,
      this.fetchedLocalItem.bind(this)
    );
  }

  fetchedLocalItem(error: Error, result: string) {
    if (result === undefined) this.props.navigation.navigate(Router.SETTING);
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
