import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

// common
import Exercise from '../common/Exercise';
import { UserData } from '../common/Model';
import { NavigationProps } from '../common/Model';
import { CommonStyles } from '../common/CommonStyles';

// utill
import Router from '../util/Router';
import LocalStorage from '../util/LocalStorage';

// component
import HomePlanView from '../component/home/HomePlanView';
import HomeEmptySetup from '../component/home/HomeEmptySetup';
import Calendar from '../component/home/Calendar';

interface HomeScreenState {
  userData: UserData;
  exercisePlan: number[];
  currentStep: number;
}

class HomeScreen extends Component<NavigationProps, HomeScreenState> {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      exercisePlan: []
    };
  }

  componentWillMount() {
    LocalStorage.getItem((userData: UserData) => {
      if (userData === null) return;
      this.setState({
        userData: userData,
        exercisePlan: Exercise.getExercisePlan(userData.exerciseLevel),
        currentStep: userData.todayStep
      });
    });
  }

  _onPressStartButton() {
    this.props.navigation.navigate(Router.EXERCISE);
  }

  onPressSetup() {
    this.props.navigation.navigate(Router.SETTING);
  }

  onPressRightButton() {
    this.setState({ currentStep: this.state.currentStep + 1 });
  }

  onPressLeftButton() {
    this.setState({ currentStep: this.state.currentStep - 1 });
  }

  render() {
    const { exercisePlan, currentStep, userData } = this.state;
    const isDisable = userData && userData.todayStep !== currentStep;

    console.log('isDisable', isDisable);

    return (
      <View style={styles.container}>
        {userData === undefined ? (
          <HomeEmptySetup onPressSetup={this.onPressSetup.bind(this)} />
        ) : (
          <View style={CommonStyles.container}>
            <Text style={styles.title}>오늘의 운동</Text>
            {userData && (
              <HomePlanView
                exercisePlan={exercisePlan}
                currentStep={currentStep}
                onPressRightButton={this.onPressRightButton.bind(this)}
                onPressLeftButton={this.onPressLeftButton.bind(this)}
              />
            )}
            <TouchableOpacity
              style={styles.startBtnWrap}
              onPress={this._onPressStartButton.bind(this)}
              disabled={userData.todayStep !== currentStep}
            >
              {userData.todayStep === currentStep && (
                <Text style={styles.startBtn}>Exercise Start</Text>
              )}
            </TouchableOpacity>
            <Calendar userData={userData} exercisePlan={exercisePlan} />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#29a2d9'
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 36,
    color: 'white'
  },
  startBtnWrap: {
    marginTop: 20,
    backgroundColor: '#237BA1',
    borderRadius: 30
  },
  startBtn: {
    paddingVertical: 10,
    textAlign: 'center',
    color: 'white',
    fontSize: 24
  }
});

export default HomeScreen;
