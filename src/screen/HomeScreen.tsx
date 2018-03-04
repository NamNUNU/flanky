import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

// common
import Exercise from '../common/Exercise';
import { UserData } from '../common/Model';
import { NavigationProps } from '../common/Model';
import CommonStyle from '../common/CommonStyle';

// utill
import Router from '../util/Router';
import LocalStorage from '../util/LocalStorage';

// component
import HomePlanView from '../component/home/HomePlanView';
import HomeEmptySetup from '../component/home/HomeEmptySetup';
import Calendar from '../component/home/Calendar';
import DarkGreenButton from '../component/common/DarkGreenButton';

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
      <CommonStyle>
        {userData === undefined ? (
          <HomeEmptySetup onPressSetup={this.onPressSetup.bind(this)} />
        ) : (
          <View style={styles.home}>
            <View style={styles.upperSection}>
              <Text style={styles.title}>오늘의 운동</Text>
              {userData && (
                <HomePlanView
                  exercisePlan={exercisePlan}
                  currentStep={currentStep}
                  onPressRightButton={this.onPressRightButton.bind(this)}
                  onPressLeftButton={this.onPressLeftButton.bind(this)}
                />
              )}
                <View style={styles.btnWrap}>
                  <DarkGreenButton
                    disabled={userData.todayStep !== currentStep}
                    onPress={this._onPressStartButton.bind(this)}
                    text={'Start'}
                  />
                </View>
            </View>

            <Calendar
              style={styles.lowerSection}
              userData={userData}
              exercisePlan={exercisePlan}
            />
          </View>
        )}
      </CommonStyle>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    flexDirection: 'column'
  },
  upperSection: {
    flex: 1,
    justifyContent: 'center'
  },
  lowerSection: {
    flex: 1
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 36,
    color: 'white'
  },
  btnWrap: {
    alignItems: 'center'
  }
});

export default HomeScreen;
