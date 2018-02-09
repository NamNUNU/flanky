import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { StackNavigator } from 'react-navigation'

// model
import Router from './util/Router';

// screen
import HomeScreen from './screen/HomeScreen';
import SettingScreen from './screen/SettingScreen';

const RootStack = StackNavigator(
  {
    Setting: {
      screen: SettingScreen,
    },
    Home: {
      screen: HomeScreen,
    },
  },
  {
    initialRouteName: Router.SETTING,
  }
);

export default class App extends React.Component {

  render() {
    return <RootStack />;
  }
}

