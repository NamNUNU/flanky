import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

// model
import Router from './util/Router';

// screen
import HomeScreen from './screen/HomeScreen';
import SettingScreen from './screen/SettingScreen';
import ExerciseScreen from './screen/ExerciseScreen';

const RootStack = StackNavigator(
  {
    Setting: {
      screen: SettingScreen,
    },
    Home: {
      screen: HomeScreen,
    },
    Exercise: {
      screen: ExerciseScreen,
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

