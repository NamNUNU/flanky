import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// model
import Exercise from '../common/Exercise';
import { UserData, NavigationProps, ExerciseMode } from '../common/Model';

// util
import LocalStorage from '../util/LocalStorage';

interface ExerciseScreenState {
  userData: UserData;
  exercisePlan: number[];
  currentStep: number;

  mode: number;
  seconds: number;
  isRunning: boolean;
}

class ExerciseScreen extends Component<NavigationProps, ExerciseScreenState> {
  exerciseTimer: number;

  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      seconds: 0,
      currentStep: 0,
      isRunning: false
    };
  }

  componentDidMount() {
    LocalStorage.getItem((userData: UserData) => {
      console.log('ExerciseScreen User Data :', userData);
      let { exercisePlan, seconds } = this.state;
      exercisePlan = Exercise.getExercisePlan(userData.exerciseLevel);
      seconds = exercisePlan[userData.step];
      this.setState({ ...this.state, seconds, userData, exercisePlan });
    });
  }

  // 시작 버튼 클릭 시
  _onPressStartButton() {
    let { isRunning, mode } = this.state;
    // 제일 처음 진입시 mode를 운동 모드로 변경
    if (mode === undefined) {
      mode = ExerciseMode.MODE_EXERCISE;
    }
    this.setState(
      { isRunning: !isRunning, mode },
      this._onStartTime.bind(this)
    );
  }

  // 리셋 버튼 클릭시
  _onPressResetButton() {
    clearInterval(this.exerciseTimer);
    this.setState({
      ...this.state,
      isRunning: false,
      seconds: this.state.exercisePlan[this.state.userData.step]
    });
  }

  // 타이머 동작
  _onStartTime() {
    // 시계가 동작하지 않을 때 시작시킴
    if (this.state.isRunning) {
      this.exerciseTimer = setInterval(() => {
        const seconds = this.state.seconds - 1;
        seconds < 0 ? this._timeOut() : this.setState({ seconds });
      }, 1000);
    } else {
      // 시계가 동작하고 있을 때 정지 시킴
      clearInterval(this.exerciseTimer);
    }
  }

  // 시간이 다되었을 때
  _timeOut() {
    clearInterval(this.exerciseTimer);
    const { exercisePlan, userData, currentStep } = this.state;
    let seconds, mode;
    if (this.state.mode === ExerciseMode.MODE_EXERCISE) {
      seconds = exercisePlan[userData.step] / 2;
      mode = ExerciseMode.MODE_REST;
      console.log('exercise seconds:', seconds);
    } else if (this.state.mode === ExerciseMode.MODE_REST) {
      seconds = exercisePlan[userData.step];
      mode = ExerciseMode.MODE_EXERCISE;
      console.log('rest seconds:', seconds);
    }
    this.setState(
      {
        ...this.state,
        currentStep: currentStep + 1,
        seconds,
        mode
      },
      this._onStartTime.bind(this)
    );
  }

  render() {
    const { exercisePlan, mode, isRunning } = this.state;

    return (
      <View>
        <Text>{this.state.seconds}</Text>
        <TouchableOpacity onPress={this._onPressStartButton.bind(this)}>
          <Text>{isRunning ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._onPressResetButton.bind(this)}>
          <Text>Reset</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ExerciseScreen;
