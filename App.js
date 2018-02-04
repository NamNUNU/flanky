import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StackNavigator } from 'react-navigation';

// screen
import SettingView from './src/screen/SettingView';

const RootStack = StackNavigator(
  {
    Setting: {
      screen: SettingView,
    },
  },
  {
    initialRouteName: 'Setting',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

