import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface HomePlanViewProps {
  exercisePlan: number[];
  currentStep: number;
  onPressRightButton: () => void;
  onPressLeftButton: () => void;
}

class HomePlanView extends Component<HomePlanViewProps, {}> {
  render() {
    const { exercisePlan, currentStep } = this.props;
    return (
      <View>
        <Text style={styles.dayTxt}>{`${currentStep + 1} 일차`}</Text>
        <View style={styles.planContainer}>
          <View style={styles.planLeftBtn}>
            <TouchableOpacity
              disabled={currentStep === 0}
              onPress={this.props.onPressLeftButton}
            >
              <Icon
                style={styles.leftBtnTxt}
                name="angle-left"
                size={60}
                color={currentStep === 0 ? '#9c9c9c' : '#000'}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.planText}>
            <Text style={styles.second}>
              {exercisePlan[currentStep] < 0
                ? 'Rest'
                : exercisePlan[currentStep]}
            </Text>
          </View>
          <View style={styles.planRightBtn}>
            <TouchableOpacity
              disabled={currentStep === exercisePlan.length}
              onPress={this.props.onPressRightButton}
            >
              <Icon
                style={styles.rightBtnTxt}
                name="angle-right"
                size={60}
                color={currentStep === exercisePlan.length ? '#9c9c9c' : '#000'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // 운동 게획 화면
  planContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  planLeftBtn: {
    flex: 1,
  },
  planRightBtn: {
    flex: 1,
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
    textAlign: 'center',
    fontSize: 20,
  },
  second: {
    textAlign: 'center',
    fontSize: 40,
    
  }
});

export default HomePlanView;
