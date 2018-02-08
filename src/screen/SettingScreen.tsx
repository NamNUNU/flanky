import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import PropTypes from 'prop-types';

// common
import Router from '../util/Router';
import LocalStorage from '../util/LocalStorage';

class SettingVC extends Component {
  constructor(props) {
    super(props);
  }

  _onPressButton(level) {
    LocalStorage.setItem(LocalStorage.KEY_exerciseLevel, level);
  }

  // renderBody(step) {
  //   console.log(step);
  //   switch (step) {
  //     case 0:
  //       return <ExerciseLevelView onPressButton={this._onPressButton} />;
  //     case 1:
  //       return;
  //     default:
  //       break;
  //   }
  // }

  render() {
    return (<View>
        <Text> TEST</Text> 
      </View>)
  }
}

export default SettingVC;
