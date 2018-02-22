import React, { Component } from 'react';
import { View, Text } from 'react-native';

interface ExerciseHeaderProps {
  flankTime: number;
  step: number;
}

interface ExerciseHeaderState {
  flankTimeList: number[];
}

class ExerciseHeader extends Component<
  ExerciseHeaderProps,
  ExerciseHeaderState
> {
  constructor(props) {
    super(props);
    this.state = {
      flankTimeList: [
        this.props.flankTime,
        -1,
        this.props.flankTime,
        -1,
        this.props.flankTime
      ]
    };
  }

  componentWillReceiveProps() {}

  render() {
    return (
      <View>
        {this.state.flankTimeList.map((item, index) => {
          return item < 0 ? (
            <Text key={index}>R</Text>
          ) : (
            <Text key={index}>{this.props.flankTime}</Text>
          );
        })}
      </View>
    );
  }
}

export default ExerciseHeader;
