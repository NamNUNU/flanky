import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StackNavigator } from 'react-navigation';

// model
import Router from './src/common/Router';

// screen
import SettingView from './src/screen/SettingView';

const RootStack = StackNavigator(
  {
    Setting: {
      screen: SettingView,
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

