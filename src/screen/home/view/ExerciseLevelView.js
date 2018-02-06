import React, { Component } from "react";
import { StyleSheet, View, Text, Button, AsyncStorage } from "react-native";
import PropTypes from "prop-types";

// common
import Router from "../../../common/Router";

class ExerciseLevelView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0
    };
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
                  onPress={() => this.props.onPressButton(item.title)}
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

ExerciseLevelView.propTypes = {
  onPressButton: PropTypes.func.isRequired
};

export default ExerciseLevelView;
