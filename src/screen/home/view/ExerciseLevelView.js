import React, { Component } from "react";
import { StyleSheet, View, Text, Button, AsyncStorage } from "react-native";
import PropTypes from "prop-types";

// common
import Router from "../../../common/Router";
import StorageKeys from "../../../common/StorageKeys";

class ExerciseLevelView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0
    };
  }

  async _onPressButton(level) {
    try {
      await AsyncStorage.setItem(StorageKeys.exerciseLevel, level);
    } catch (error) {
      console.log("set error", error);
    }

    try {
      const value = await AsyncStorage.getItem(StorageKeys.exerciseLevel);
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      console.log("get error!", error);
    }
  }

  render() {
    const buttonName = [
      {
        title: "Easy",
        color: "#2196f3"
      },
      {
        title: "Normal",
        color: "#8ac24a"
      },
      {
        title: "Hard",
        color: "#ff5723"
      }
    ];
    return (
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>운동 수준을 선택해주세요</Text>
        </View>
        <View>
          {buttonName.map((item, index) => {
            return (
              <View key={index} style={styles.buttonView}>
                <Button
                  onPress={() => this._onPressButton(item.title)}
                  title={item.title}
                  color={item.color}
                />
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  titleView: {
    marginBottom: 10,
    alignItems: "center"
  },
  titleText: {
    fontSize: 24
  },
  buttonView: {
    marginBottom: 10
  }
});

export default ExerciseLevelView;
