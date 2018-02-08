import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

// model
import Router from './src/util/Router';

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

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

