import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

interface ExercisePlanViewProps {
  exercisePlan: number[];
  currentStep: number;
}

interface ExercisePlanViewState {
  viewStep: number;
}

class ExercisePlanView extends Component<
  ExercisePlanViewProps,
  ExercisePlanViewState
> {
  constructor(props) {
    super(props);
    this.state = {
      viewStep: this.props.currentStep
    };
  }

  _onPressRightButton() {
    this.setState({ viewStep: this.state.viewStep + 1 });
  }

  _onPressLeftButton() {
    this.setState({ viewStep: this.state.viewStep - 1 });
  }

  render() {
    const { exercisePlan, currentStep } = this.props;
    const { viewStep } = this.state;
    return (
      <View style={styles.planContainer}>
        <View style={styles.planLeftBtn}>
          <Text
            onPress={this._onPressLeftButton.bind(this)}
            style={styles.leftBtnTxt}
          >
            {viewStep !== 0 && '<'}
          </Text>
        </View>
        <View style={styles.planText}>
          <Text style={styles.dayTxt}>{viewStep + 1}</Text>
          <Text style={styles.second}>
            {exercisePlan[viewStep] < 0 ? 'Rest' : exercisePlan[viewStep]}
          </Text>
        </View>
        <View style={styles.planRightBtn}>
          <Text
            onPress={this._onPressRightButton.bind(this)}
            style={styles.rightBtnTxt}
          >
            {viewStep !== exercisePlan.length && '>'}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // 운동 게획 화면
  planContainer: {
    flexDirection: 'row'
  },
  planLeftBtn: {
    flex: 1
  },
  planRightBtn: {
    flex: 1
  },
  planText: {
    flex: 4
  },
  leftBtnTxt: {
    textAlign: 'center'
  },
  rightBtnTxt: {
    textAlign: 'center'
  },
  dayTxt: {
    textAlign: 'center'
  },
  second: {
    textAlign: 'center',
    fontSize: 20
  }
});

export default ExercisePlanView;
