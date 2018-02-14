import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// model
import Exercise from '../common/Exercise';
import { UserData, NavigationProps } from '../common/Model';

// util
import LocalStorage from '../util/LocalStorage';

interface ExerciseScreenState {
  second: number;
  isRunning: boolean;
  exercisePlan: number[];
  currentStep: number;
  userData: UserData;
}

class ExerciseScreen extends Component<
  NavigationProps,
  ExerciseScreenState
  > {
  stopwatch: number;
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      second: 0,
      currentStep: 0,
      isRunning: false,
    };
  }

  componentDidMount() {
    LocalStorage.getItem((userData: UserData) => {
      console.log('ExerciseScreen User Data :', userData);
      const exercisePlan = Exercise.getExercisePlan(userData.exerciseLevel);
      this.setState({ ...this.state, userData, exercisePlan });
    })
  }

  _onPressStartButton() {
    this.setState(
      { isRunning: !this.state.isRunning },
      this._onStartTime.bind(this)
    );
  }

  _onPressResetButton() {
    clearInterval(this.stopwatch);
    this.setState({
      ...this.state,
      isRunning: false,
      second: 0
    });
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
    const { exercisePlan } = this.state;
    return (
      <View>
        <Text>{this.state.second}</Text>
        <TouchableOpacity onPress={this._onPressStartButton.bind(this)}>
          <Text>{this.state.isRunning ? 'Stop' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._onPressResetButton.bind(this)}>
          <Text>Reset</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ExerciseScreen;
