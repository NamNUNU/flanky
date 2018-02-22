import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

interface ExerciseHeaderProps {
  flankTime: number;
  currentStep: number;
  onClickHeaderTimeListBtn: (index: number) => void;
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
    const { currentStep } = this.props;
    return (
      <View style={styles.exerciseHeader}>
        {this.state.flankTimeList.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => this.props.onClickHeaderTimeListBtn(index)}
              style={styles.flankTimebox}
            >
              <View>
                <Text
                  style={[
                    styles.flankTimeText,
                    currentStep === index && styles.currentStep
                  ]}
                >
                  {item < 0 ? 'R' : this.props.flankTime}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  exerciseHeader: {
    flexDirection: 'row',
    marginBottom: 20
  },
  flankTimebox: {
    flex: 1,
    justifyContent: 'center'
  },
  flankTimeText: {
    paddingVertical: 10,
    marginHorizontal: 5,
    textAlign: 'center',
    borderColor: '#9d9d9d',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 16
  },
  currentStep: {
    backgroundColor: '#eccbd9',
    overflow: 'hidden'
  }
});

export default ExerciseHeader;
