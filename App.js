import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

// model
import Router from './src/util/Router';

// screen
import HomeVC from './src/screen/HomeScreen';
import SettingVC from './src/screen/SettingScreen';

const RootStack = StackNavigator(
  {
    Setting: {
      screen: SettingVC,
    },
    Home: {
      screen: HomeVC,
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

