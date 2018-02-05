import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';

// config
import { firebaseConfig } from './configuration';

// model
import Router from './src/common/Router';

// screen
import HomeVC from './src/screen/home/vc/HomeVC';

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeVC,
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

