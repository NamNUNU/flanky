import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Progress from 'react-native-progress';

interface ExerciseHeaderProps {
  currentStep: number;
}

class ExerciseHeader extends Component<ExerciseHeaderProps, {}> {
  render() {
    const { currentStep } = this.props;
    return (
      <View style={styles.exerciseHeader}>
        <View>
          <Text>{currentStep} / 5</Text>
        </View>
        <View>
          <Progress.Bar 
          progress={currentStep / 5} 
          width={200} 
          color={'#80ffe8'}
          borderColor={'#000000'}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  exerciseHeader: {
    flexDirection: 'row',
    marginBottom: 20
  }
});

export default ExerciseHeader;
