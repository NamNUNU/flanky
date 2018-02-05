import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

// view
import SettingVC from "./SettingVC";

class HomeVC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGradeSetting: false
    };
  }

  onCompleteSetup() {
    this.setState({ ...this.state, isGradeSetting: true });
  }

  render() {
    return !this.state.isGradeSetting ? (
      <SettingVC onCompleteSetup={this.onCompleteSetup.bind(this)} />
    ) : (
      <View>
        <Text>this is home view</Text>
      </View>
    );
  }
}

export default HomeVC;
