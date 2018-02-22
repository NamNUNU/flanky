import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

// model
import { UserData, NavigationProps, ExerciseMode } from '../common/Model';

interface ExerciseTimerProps {
  flankTime: number;
  timerSeconds: number;
  mode: number;
}

interface ExerciseTimerState {
  standardTime: number;
}

class ExerciseTimer extends Component<ExerciseTimerProps, ExerciseTimerState> {
  constructor(props) {
    super(props);
    this.state = {
      standardTime: this.getStandardTime()
    };
  }

  getStandardTime() {
    const { mode, flankTime } = this.props;
    return mode === ExerciseMode.MODE_REST ? flankTime / 2 : flankTime;
  }

  setStandardTime() {
    const { mode, flankTime } = this.props;
    const standardTime =
      mode === ExerciseMode.MODE_REST ? flankTime / 2 : flankTime;
    this.setState({ ...this.state, standardTime });
  }

  getTimerColor() {
    const remainTimeRate =
      this.props.timerSeconds / this.state.standardTime * 100;
    if (remainTimeRate > 50) return '#00e0ff';
    else if (remainTimeRate > 20) return '#fb8b24';
    else return '#d90368'
  }

  render() {
    const { flankTime, timerSeconds, mode } = this.props;
    const { standardTime } = this.state;

    return (
      <AnimatedCircularProgress
        size={120}
        width={10}
        fill={timerSeconds / standardTime * 100}
        tintColor={this.getTimerColor()}
        onAnimationComplete={this.setStandardTime.bind(this)}
        backgroundColor="#3d5875"
      >
        {() => {
          return <Text style={styles.second}>{timerSeconds}</Text>;
        }}
      </AnimatedCircularProgress>
    );
  }
}

const styles = StyleSheet.create({
  second: {
    textAlign: 'center',
    fontSize: 24
  }
});

export default ExerciseTimer;
