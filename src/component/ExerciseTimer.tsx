import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

// model
import { UserData, NavigationProps, ExerciseMode } from '../common/Model';

interface ExerciseTimerProps {
  todaySeconds: number;
  currentSeconds: number;
}

class ExerciseTimer extends Component<ExerciseTimerProps, {}> {
  getTimerColor() {
    const remainTimeRate =
      this.props.currentSeconds / this.props.todaySeconds * 100;
    if (remainTimeRate > 50) return '#00e0ff';
    else if (remainTimeRate > 20) return '#fb8b24';
    else return '#d90368';
  }

  render() {
    const { todaySeconds, currentSeconds } = this.props;

    console.log('currentSeconds', currentSeconds);
    console.log('todaySeconds', todaySeconds);
    return (
      <AnimatedCircularProgress
        size={120}
        width={10}
        fill={currentSeconds / todaySeconds * 100}
        tintColor={this.getTimerColor()}
        onAnimationComplete={() => {
          console.log('onAnimationComplete');
        }}
        backgroundColor="#3d5875"
      >
        {() => {
          return <Text style={styles.second}>{currentSeconds}</Text>;
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
