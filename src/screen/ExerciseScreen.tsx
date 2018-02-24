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

  flackTimeList: number[];
  currentOrder: number;
  currentSeconds: number;

  mode: number;

  isRunning: boolean;
}

class ExerciseScreen extends Component<NavigationProps, ExerciseScreenState> {
  exerciseTimer: number;

  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      currentOrder: 0,
      currentSeconds: 0,
      isRunning: false
    };
  }

  componentDidMount() {
    // 유저 데이터를 가져옴
    LocalStorage.getItem((userData: UserData) => {
      console.log('ExerciseScreen User Data :', userData);
      this.setState({
        ...this.state,
        userData,
        currentSeconds: this.getTodaySeconds(userData)
      });
    });
  }

  // 현재 모드에 따라 운동/휴식 시간을 반환
  getTodaySeconds(userData: UserData) {
    const totalExercisePlan = Exercise.getExercisePlan(userData.exerciseLevel);
    return this.state.mode === ExerciseMode.MODE_REST
      ? totalExercisePlan[userData.todayStep] / 2 // 휴식은 운동 시간의 절반
      : totalExercisePlan[userData.todayStep];
  }

  // 시작 버튼 클릭 시
  _onPressStartButton() {
    let { isRunning } = this.state;
    // 시계가 동작하지 않을 때 시작시킴
    if (!isRunning) {
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
    this.setState({ isRunning: !isRunning });
  }

  // 리셋 버튼 클릭시
  _onPressResetButton() {
    clearInterval(this.exerciseTimer);
    const { userData } = this.state;
    const currentSeconds = this.getTodaySeconds(userData);
    this.setState({
      ...this.state,
      isRunning: false,
      currentSeconds
    });
  }

  // 시간이 다되었을 때
  _timeOut() {
    const mode =
      this.state.mode === ExerciseMode.MODE_EXERCISE
        ? ExerciseMode.MODE_REST
        : ExerciseMode.MODE_EXERCISE;
    clearInterval(this.exerciseTimer);
    const { userData, currentOrder } = this.state;
    const currentSeconds = this.getTodaySeconds(userData);

    console.log('timerSeconds:', currentSeconds);

    this.setState({
      ...this.state,
      currentOrder: currentOrder + 1,
      currentSeconds,
      mode
    });
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
    this.setState(
      { ...this.state, currentOrder: index },
      this._onPressResetButton.bind(this)
    );
  }

  render() {
    const {
      mode,
      currentSeconds,
      isRunning,
      userData,
      currentOrder
    } = this.state;

    return (
      <View style={CommonStyles.container}>
        {userData && (
          <View>
            <View>
              <ExerciseHeader
                todaySeconds={this.getTodaySeconds(userData)}
                currentOrder={currentOrder}
                onClickHeaderTimeListBtn={this.onClickHeaderTimeListBtn.bind(
                  this
                )}
              />
            </View>
            <Text style={styles.mode}>{this.getTitleText(mode)}</Text>
            <View style={styles.counter}>
              <ExerciseTimer
                todaySeconds={this.getTodaySeconds(userData)}
                currentSeconds={currentSeconds}
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
