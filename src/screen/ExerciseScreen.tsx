import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

// model
import Exercise from '../common/Exercise';
import { UserData, NavigationProps, ExerciseMode } from '../common/Model';
import CommonStyles from '../common/CommonStyle';

// util
import LocalStorage from '../util/LocalStorage';
import Router from '../util/Router';

// component
import AddTimeBtn from '../component/exercise/AddTimeBtn';
import ExerciseTimer from '../component/exercise/ExerciseTimer';
import TimeControlBtn from '../component/exercise/TimeControlBtn';
import ExerciseHeader from '../component/exercise/ExerciseHeader';

interface ExerciseScreenState {
  userData: UserData;

  flackTimeList: number[];
  goalSeconds: number;
  currentStep: number;
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
      currentStep: 0,
      currentSeconds: 0,
      isRunning: false,
      isExerciseMode: false
    };
  }

  componentWillMount() {
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
  getTodaySeconds(currentStep: number) {
    return currentStep % 2 === this.ORDER_EXERCISE
      ? this.todaySeconds
      : this.todaySeconds / 2; // 휴식은 운동 시간의 절반
  }

  // 시작 버튼 클릭 시
  onPressTimeControlBtn() {
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

  onPressEndBtn() {
    this._timeOut();
  }

  // 시간이 다되었을 때
  _timeOut() {
    let currentStep = this.state.currentStep + 1;
    const goalSeconds = this.getTodaySeconds(currentStep);

    clearInterval(this.exerciseTimer);

    // 마지막 라운드 over
    if (currentStep > 4) {
      // 다음 단계로 올림
      const { userData } = this.state;
      userData.todayStep += 1;
      LocalStorage.setItem(userData);
      return this.props.navigation.navigate(Router.FINISH);
    }

    this.setState(
      {
        ...this.state,
        currentStep,
        goalSeconds,
        currentSeconds: goalSeconds,
        isRunning: false
      },
      this.onPressTimeControlBtn.bind(this)
    );
  }

  onPressAddSeconds() {
    this.setState({
      ...this.state,
      goalSeconds: this.state.goalSeconds + 10,
      currentSeconds: this.state.currentSeconds + 10
    });
  }

  getTitleText() {
    if (!this.state.isRunning) return '운동을 시작해볼까요?';
    return this.state.currentStep % 2 === this.ORDER_EXERCISE
      ? '운동 중입니다. 힘내세요'
      : '휴식을 취하세요';
  }

  render() {
    const {
      isExerciseMode,
      currentSeconds,
      isRunning,
      userData,
      currentStep,
      goalSeconds
    } = this.state;

    return (
      <CommonStyles>
        {userData && (
          <View>
            <View>
              <ExerciseHeader
                currentStep={currentStep}
                todaySeconds={this.todaySeconds}
              />
            </View>
            <View>
              <Text style={styles.roundText}>
                {currentStep % 2 === 1
                  ? 'Rest'
                  : (currentStep + 2) / 2 + 'Round'}
              </Text>
            </View>
            <View style={styles.counter}>
              <ExerciseTimer
                todaySeconds={goalSeconds}
                currentSeconds={currentSeconds}
                isStart={(!isRunning && !isExerciseMode) || isExerciseMode}
              />
            </View>
            <Text style={styles.titleText}>{this.getTitleText()}</Text>
          </View>
        )}
        <View style={styles.addTime}>
          <AddTimeBtn
            onPressAddSeconds={this.onPressAddSeconds.bind(this)}
            isRunning={isRunning}
          />
        </View>
        <View style={styles.timeControlBtn}>
          <TimeControlBtn
            onPressTimeControlBtn={this.onPressTimeControlBtn.bind(this)}
            onPressEndBtn={this.onPressEndBtn.bind(this)}
            isRunning={isRunning}
          />
        </View>
        </CommonStyles>
    );
  }
}

const styles = StyleSheet.create({
  roundText: {
    paddingVertical: 20,
    textAlign: 'center',
    fontSize: 36,
    color: 'white'
  },
  titleText: {
    paddingVertical: 20,
    textAlign: 'center',
    fontSize: 20,
    color: 'white'
  },
  counter: {
    alignItems: 'center'
  },
  addTime: {
    alignItems: 'center'
  },
  timeControlBtn: {
    marginTop: 30
  }
});

export default ExerciseScreen;
