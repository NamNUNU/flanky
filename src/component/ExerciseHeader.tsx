import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

interface ExerciseHeaderProps {
  todaySeconds: number;
  currentOrder: number;
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
        this.props.todaySeconds,
        -1,
        this.props.todaySeconds,
        -1,
        this.props.todaySeconds
      ]
    };
  }


  render() {
    const { currentOrder } = this.props;
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
                    currentOrder === index && styles.currentOrder
                  ]}
                >
                  {item < 0 ? 'R' : this.props.todaySeconds}
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
  currentOrder: {
    backgroundColor: '#eccbd9',
    overflow: 'hidden'
  }
});

export default ExerciseHeader;
