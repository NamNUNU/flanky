import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

// model
import Exercise from '../common/Exercise';
import { UserData, NavigationProps, ExerciseMode } from '../common/Model';
import { CommonStyles } from '../common/CommonStyles';

// util
import LocalStorage from '../util/LocalStorage';
import Router from '../util/Router';

// view
import ExerciseHeader from '../component/ExerciseHeader';
import ExerciseTimer from '../component/ExerciseTimer';

interface ExerciseScreenState {
  userData: UserData;

  flackTimeList: number[];
  goalSeconds: number;
  currentOrder: number;
  currentSeconds: number;

  isExerciseMode: boolean;
  isRunning: boolean;
}

class ExerciseScreen extends Component<NavigationProps, ExerciseScreenState> {
  exerciseTimer: number;
  todaySeconds: number;

  ORDER_EXERCISE: number = 0;
  ORDER_REST: number = 1;

  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      currentOrder: 0,
      currentSeconds: 0,
      isRunning: false,
      isExerciseMode: false
    };
  }

  componentDidMount() {
    // 유저 데이터를 가져옴
    LocalStorage.getItem((userData: UserData) => {
      console.log('ExerciseScreen User Data :', userData);
      this.todaySeconds = Exercise.getExercisePlan(userData.exerciseLevel)[
        userData.todayStep
      ];
      this.setState({
        ...this.state,
        userData,
        goalSeconds: this.todaySeconds,
        currentSeconds: this.todaySeconds
      });
    });
  }

  // 현재 모드에 따라 운동/휴식 시간을 반환
  getTodaySeconds(currentOrder: number) {
    return currentOrder % 2 === this.ORDER_EXERCISE
      ? this.todaySeconds
      : this.todaySeconds / 2; // 휴식은 운동 시간의 절반
  }

  // 시작 버튼 클릭 시
  _onPressStartButton() {
    console.log('this.state.isRunning', this.state.isRunning);
    // 시계가 동작하지 않을 때 시작시킴
    if (!this.state.isRunning) {
      this.exerciseTimer = setInterval(() => {
        const currentSeconds = this.state.currentSeconds - 1;
        currentSeconds < 0
          ? this._timeOut()
          : this.setState({ currentSeconds });
      }, 1000);
    } else {
      // 시계가 동작하고 있을 때 정지 시킴
      clearInterval(this.exerciseTimer);
    }
    const isExerciseMode = !this.state.isExerciseMode;
    this.setState({ isRunning: !this.state.isRunning, isExerciseMode });
  }

  _reset() {
    clearInterval(this.exerciseTimer);
    const goalSeconds = this.getTodaySeconds(this.state.currentOrder);
    this.setState({
      ...this.state,
      isRunning: false,
      goalSeconds,
      currentSeconds: goalSeconds
    });
  }

  // 시간이 다되었을 때
  _timeOut() {
    let currentOrder = this.state.currentOrder + 1;
    const goalSeconds = this.getTodaySeconds(currentOrder);

    clearInterval(this.exerciseTimer);

    if (currentOrder > 4) {
      return this.props.navigation.navigate(Router.FINISH);
    }

    this.setState(
      {
        ...this.state,
        currentOrder,
        goalSeconds,
        currentSeconds: goalSeconds,
        isRunning: false
      },
      this._onPressStartButton.bind(this)
    );
  }

  _onPressAddSeconds() {
    this.setState({
      ...this.state,
      goalSeconds: this.state.goalSeconds + 10,
      currentSeconds: this.state.currentSeconds + 10
    });
  }

  getTitleText() {
    if (!this.state.isRunning) return '운동을 시작해볼까요?';
    return this.state.currentOrder % 2 === this.ORDER_EXERCISE
      ? '운동 중입니다. 힘내세요'
      : '휴식을 취하세요';
  }

  onClickHeaderTimeListBtn(index: number) {
    this.setState(
      { ...this.state, currentOrder: index },
      this._reset.bind(this)
    );
  }

  render() {
    const {
      isExerciseMode,
      currentSeconds,
      isRunning,
      userData,
      currentOrder,
      goalSeconds
    } = this.state;

    return (
      <View style={CommonStyles.container}>
        {userData && (
          <View>
            <View>
              <ExerciseHeader
                todaySeconds={this.todaySeconds}
                currentOrder={currentOrder}
              />
            </View>
            <Text style={styles.mode}>{this.getTitleText()}</Text>
            <View style={styles.counter}>
              <ExerciseTimer
                todaySeconds={goalSeconds}
                currentSeconds={currentSeconds}
                isStart={(!isRunning && !isExerciseMode) || isExerciseMode}
              />
            </View>
          </View>
        )}
        {!isRunning ? (
          <TouchableOpacity
            style={CommonStyles.blueBtn}
            onPress={this._onPressStartButton.bind(this)}
          >
            <Text style={CommonStyles.blueBtnTxt}>{'Start'}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={CommonStyles.blueBtn}
            onPress={this._onPressAddSeconds.bind(this)}
          >
            <Text style={CommonStyles.blueBtnTxt}>+10 seconds</Text>
          </TouchableOpacity>
        )}
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
