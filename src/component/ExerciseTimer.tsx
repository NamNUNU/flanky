import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

// model
import { UserData, NavigationProps, ExerciseMode } from '../common/Model';

interface ExerciseTimerProps {
  flankTime: number;
  seconds: number;
  mode: number;
}

class ExerciseTimer extends Component<ExerciseTimerProps, {}> {
  render() {
    const { flankTime, seconds, mode } = this.props;
    return (
      <AnimatedCircularProgress
        size={120}
        width={10}
        fill={
          mode === ExerciseMode.MODE_REST
            ? seconds / (flankTime / 2) * 100
            : seconds / flankTime * 100
        }
        tintColor="#00e0ff"
        onAnimationComplete={() => console.log('onAnimationComplete')}
        backgroundColor="#3d5875"
      >
        {() => {
          return <Text style={styles.second}>{seconds}</Text>;
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
