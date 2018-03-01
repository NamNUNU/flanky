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
import Container from '../component/common/Container';

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
      <Container>
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
              style={
                userData.todayStep !== currentStep
                  ? CommonStyles.grayBtn
                  : CommonStyles.blueBtn
              }
              onPress={this._onPressStartButton.bind(this)}
              disabled={userData.todayStep !== currentStep}
            >
              <Text
                style={
                  userData.todayStep !== currentStep
                    ? CommonStyles.grayBtnTxt
                    : CommonStyles.blueBtnTxt
                }
              >
                Exercise Start
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Container>
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
