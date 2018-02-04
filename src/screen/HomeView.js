import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

// view
import SettingView from "./SettingView";

class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGradeSetting: false
    };
  }

  onPressSetting() {
    this.setState({ ...this.state, isGradeSetting: true });
  }

  render() {
    return !this.state.isGradeSetting ? (
      <SettingView onPressSetting={this.onPressSetting.bind(this)} />
    ) : (
      <View>
        <Text>this is home view</Text>
      </View>
    );
  }
}

export default HomeView;
