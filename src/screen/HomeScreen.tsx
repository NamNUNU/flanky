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

class HomeScreen extends Component<NavigationProps, {}> {
  componentDidMount() {
    LocalStorage.setUserDataListener(this.fetchedLocalItem.bind(this));
  }
  
  fetchedLocalItem(result: UserData) {
    const userData: UserData = result;
    console.log('HomeScreen User Data:', userData);
    if (userData.exerciseLevel === undefined) this.props.navigation.navigate(Router.SETTING);
    else this.setState({...this.state, userData})
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
