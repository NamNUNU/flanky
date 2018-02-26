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

interface AppState {
  isSetup: boolean;
}

export default class App extends React.Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      isSetup: undefined
    };
  }
  componentWillMount() {
    LocalStorage.getItem((userData: UserData) => {
      this.setState({ isSetup: userData !== null });
    });
  }

  createRootNavigator() {
    const { isSetup } = this.state;
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
        initialRouteName: !isSetup ? Router.SETTING : Router.HOME
      }
    );
  }

  render() {
    const RootStack = this.createRootNavigator();
    return this.state.isSetup === undefined ? null : <RootStack />;
  }
}
