import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface ExerciseScreenProps {
  navigation: any;
}

interface ExerciseScreenState {
  second: number;
  isRunning: boolean;
}

class ExerciseScreen extends Component<
  ExerciseScreenProps,
  ExerciseScreenState
> {
  stopwatch: number;
  constructor(props) {
    super(props);
    this.state = {
      second: 0,
      isRunning: false
    };
  }

  _onPressButton() {
    this.setState(
      { isRunning: !this.state.isRunning },
      this._onStartTime.bind(this)
    );
  }

  _onStartTime() {
    // 시계가 동작하지 않을 때 시작시킴
    if (this.state.isRunning) {
      this.stopwatch = setInterval(() => {
        const second = this.state.second + 1;
        this.setState({ second });
      }, 1000);
    } else {
      // 시계가 동작하고 있을 때 정지 시킴
      clearInterval(this.stopwatch);
    }
  }

  render() {
    return (
      <View>
        <Text>{this.state.second}</Text>
        <TouchableOpacity onPress={this._onPressButton.bind(this)}>
          <Text>{this.state.isRunning ? 'Stop' : 'Start'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ExerciseScreen;
