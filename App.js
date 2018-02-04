import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StackNavigator } from 'react-navigation';

// model
import Router from './src/common/Router';

// screen
import SettingView from './src/screen/SettingView';
import HomeView from './src/screen/HomeView';

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeView,
    },
  },
  {
    initialRouteName: Router.HOME,
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

