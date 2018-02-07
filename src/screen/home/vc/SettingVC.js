import React, { Component } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import PropTypes from "prop-types";

// common
import Router from "../../../util/Router";
import LocalStorage from "../../../util/LocalStorage";

// view
import ExerciseLevelView from "../view/ExerciseLevelView";

class SettingVC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0
    };
  }

  _onPressButton(level) {
    LocalStorage.setItem(LocalStorage.KEY_exerciseLevel, level);
  }

  renderBody(step) {
    console.log(step);
    switch (step) {
      case 0:
        return <ExerciseLevelView onPressButton={this._onPressButton} />;
      case 1:
        return;
      default:
        break;
    }
  }

  render() {
    return this.renderBody(this.state.step);
  }
}

SettingVC.propTypes = {
  onCompleteSetup: PropTypes.func.isRequired
};

export default SettingVC;
