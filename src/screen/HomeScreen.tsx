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
import ExercisePlanView from '../component/ExercisePlanView';
import HomeEmptySetup from '../component/HomeEmptySetup';

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

  onPressSetup(){
    this.props.navigation.navigate(Router.SETTING);
  }

  render() {
    const { exercisePlan, currentStep, userData } = this.state;
    return userData === undefined ? (
      <HomeEmptySetup 
        onPressSetup={this.onPressSetup.bind(this)}
      />
    ) : (
      <View style={CommonStyles.container}>
        <Text style={styles.title}>오늘의 운동</Text>
        {userData && (
          <ExercisePlanView
            exercisePlan={exercisePlan}
            currentStep={userData.todayStep}
          />
        )}
        <TouchableOpacity
          style={CommonStyles.blueBtn}
          onPress={this._onPressStartButton.bind(this)}
        >
          <Text style={CommonStyles.blueBtnTxt}>Exercise Start</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 20
  }
});

export default HomeScreen;
