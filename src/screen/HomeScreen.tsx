import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

// model
import { UserData } from '../common/Model';
import { NavigationProps } from '../common/Model';
import Exercise from '../common/Exercise';

// utill
import Router from '../util/Router';
import LocalStorage from '../util/LocalStorage';

// component
import ExercisePlanView from '../component/ExercisePlanView';

interface HomeScreenState {
  userData: UserData;
  exercisePlan: number[];
  currentStep: number;
}

class HomeScreen extends Component<NavigationProps, HomeScreenState> {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state
    };
  }
  componentDidMount() {
    // 유저 정보가 바뀔때마다 정보를 업데이트 시켜주는 리스너 추가
    LocalStorage.setUserDataListener(this.fetchedLocalItem.bind(this));
  }

  fetchedLocalItem(userData: UserData) {
    console.log('HomeScreen User Data:', userData);
    if (userData.exerciseLevel === undefined)
      this.props.navigation.navigate(Router.SETTING);
    else {
      const exercisePlan: number[] = Exercise.getExercisePlan(
        userData.exerciseLevel
      );
      const currentStep: number = userData.step;
      this.setState({ ...this.state, currentStep, userData, exercisePlan });
    }
  }

  _onPressStartButton() {
    this.props.navigation.navigate(Router.EXERCISE);
  }

  render() {
    const { exercisePlan, currentStep } = this.state;
    return this.state.userData === undefined ? (
      <View>
        <Text>you are first visitor!</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate(Router.SETTING)}
        >
          <Text>Set up user level</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <View style={styles.container}>
        <Text style={styles.title}>오늘의 운동</Text>
        <ExercisePlanView
          exercisePlan={exercisePlan}
          currentStep={this.state.userData.step}
        />
        <TouchableOpacity
          style={styles.startBtn}
          onPress={this._onPressStartButton.bind(this)}
        >
          <Text style={styles.startBtnTxt}>Exercise Start</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 20
  },
  
  // 스타트 버튼
  startBtn: {
    backgroundColor: '#0084dd',
    borderRadius: 6,
  },
  startBtnTxt: {
    textAlign:'center',
    color: 'white',
    paddingVertical: 10,
    fontSize:30,
  }
});

export default HomeScreen;
