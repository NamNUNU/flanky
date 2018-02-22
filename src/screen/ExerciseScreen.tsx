import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

// model
import Exercise from '../common/Exercise';
import { UserData, NavigationProps, ExerciseMode } from '../common/Model';
import { CommonStyles } from '../common/CommonStyles';

// util
import LocalStorage from '../util/LocalStorage';

// view
import ExerciseHeader from '../component/ExerciseHeader';
import ExerciseTimer from '../component/ExerciseTimer';

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

  getTitleText(mode: number) {
    if (mode === ExerciseMode.MODE_EXERCISE) {
      return '운동 중입니다. 힘내세요';
    } else if (mode === ExerciseMode.MODE_REST) {
      return '휴식을 취하세요';
    } else {
      return '운동을 시작해볼까요';
    }
  }

  onClickHeaderTimeListBtn(index: number) {
    this.setState({ ...this.state, currentStep: index });
  }

  render() {
    const {
      exercisePlan,
      mode,
      seconds,
      isRunning,
      userData,
      currentStep
    } = this.state;

    return (
      <View style={CommonStyles.container}>
        {userData && (
          <View>
            <View>
              <ExerciseHeader
                flankTime={exercisePlan[userData.step]}
                currentStep={currentStep}
                onClickHeaderTimeListBtn={this.onClickHeaderTimeListBtn.bind(
                  this
                )}
              />
            </View>
            <Text style={styles.mode}>{this.getTitleText(mode)}</Text>
            <View style={styles.counter}>
              <ExerciseTimer
                flankTime={exercisePlan[userData.step]}
                seconds={seconds}
                mode={mode}
              />
            </View>
          </View>
        )}
        <TouchableOpacity
          style={CommonStyles.blueBtn}
          onPress={this._onPressStartButton.bind(this)}
        >
          <Text style={CommonStyles.blueBtnTxt}>
            {isRunning ? 'Pause' : 'Start'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={CommonStyles.blueBtn}
          onPress={this._onPressResetButton.bind(this)}
        >
          <Text style={CommonStyles.blueBtnTxt}>Reset</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  counter: {
    alignItems: 'center'
  },
  mode: {
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 30
  }
});

export default ExerciseScreen;

// TODO: 디자인 및. 5개의 운동 칸 표기
