import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

// model
import { UserData, NavigationProps, ExerciseMode } from '../../common/Model';

interface ExerciseTimerProps {
  todaySeconds: number;
  currentSeconds: number;
  isStart: boolean;
}

class ExerciseTimer extends Component<ExerciseTimerProps, {}> {
  getTimerColor() {
    const remainTimeRate =
      this.props.currentSeconds / this.props.todaySeconds * 100;
    if (remainTimeRate > 50) return '#00e0ff';
    else if (remainTimeRate > 20) return '#fb8b24';
    else return '#d90368';
  }

  getTimerText() {
    const { todaySeconds, currentSeconds, isStart } = this.props;
    if (todaySeconds === currentSeconds) {
      return <Text style={styles.second}>{isStart ? 'Start' : 'Rest'}</Text>;
    } else {
      return (
        <View style={styles.secondWrap}>
          <Text style={styles.second}>
            {currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}
          </Text>
          <Text style={styles.subSecond}>SECS</Text>
        </View>
      );
    }
  }

  render() {
    const { todaySeconds, currentSeconds } = this.props;

    return (
      <View style={styles.counterOutline}>
        <View style={styles.counter}>
          <AnimatedCircularProgress
            size={180}
            width={10}
            fill={currentSeconds / todaySeconds * 100}
            tintColor={this.getTimerColor()}
            onAnimationComplete={() => {
              console.log('onAnimationComplete');
            }}
            backgroundColor="#3d5875"
          >
            {() => {
              return this.getTimerText();
            }}
          </AnimatedCircularProgress>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  counterOutline: {
    width: 200,
    paddingVertical: 10,
    borderRadius: 100,
    backgroundColor: '#237BA1',
    alignItems: 'center'
  },
  counter: {
    width: 180,
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: '#3E454D'
  },
  secondWrap: {
    width: '100%'
  },
  second: {
    textAlign: 'center',
    fontSize: 46,
    fontWeight: 'bold',
    color: 'white'
  },
  subSecond: {
    textAlign: 'center',
    fontSize: 24,
    color: 'white'
  }
});

export default ExerciseTimer;
