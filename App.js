import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';

// config
import { firebaseConfig } from './configuration';

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

firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

