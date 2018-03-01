import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { StackNavigator } from 'react-navigation';

// model
import Router from './util/Router';
import { UserData } from './common/Model';

// util
import LocalStorage from './util/LocalStorage';

// screen
import HomeScreen from './screen/HomeScreen';
import SettingScreen from './screen/SettingScreen';
import ExerciseScreen from './screen/ExerciseScreen';
import FinishScreen from './screen/FinishScreen';


export default class App extends React.Component<{}, {}> {

  createRootNavigator() {
    return StackNavigator(
      {
        Setting: {
          screen: SettingScreen
        },
        Home: {
          screen: HomeScreen
        },
        Exercise: {
          screen: ExerciseScreen
        },
        Finish: {
          screen: FinishScreen
        }
      },
      {
        initialRouteName: Router.HOME
      }
    );
  }

  render() {
    const RootStack = this.createRootNavigator();
    return <RootStack />;
  }
}
