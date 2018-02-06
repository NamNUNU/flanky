import React, { Component } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import PropTypes from "prop-types";

// model
import Router from "../../../common/Router";

// view
import ExerciseLevelView from "../view/ExerciseLevelView";

class SettingVC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0
    };
  }

  renderBody(step) {
    console.log(step);
    switch (step) {
      case 0:
        return <ExerciseLevelView />;
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
