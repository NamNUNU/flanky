import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import CommonStyle from '../../common/CommonStyle';
import * as Progress from 'react-native-progress';

interface ExerciseHeaderProps {
  currentStep: number;
  todaySeconds:number;
}

class ExerciseHeader extends Component<ExerciseHeaderProps, {}> {
  render() {
    const { currentStep,todaySeconds } = this.props;
    return (
      <View style={styles.exerciseHeader}>
        <View style={styles.exerciseInfo}>
          <View style={styles.infoArea}>
            <Text style={styles.infoTitle}>운동</Text>
            <Text style={styles.infoDesc}>{todaySeconds}초</Text>
          </View>
          <View style={styles.infoArea}>
          <Text style={styles.infoTitle}>휴식</Text>
          <Text style={styles.infoDesc}>{todaySeconds/2}초</Text>
          </View>
          <View style={styles.infoArea}>
          <Text style={styles.infoTitle}>세트</Text>
          <Text style={styles.infoDesc}>{currentStep+1}/5</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  exerciseHeader: {
    marginTop:30,
  },
  exerciseInfo: {
    paddingHorizontal:40,
    paddingVertical: 10,
    width: '100%',
    backgroundColor: CommonStyle.flanky_lightgreen,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  infoArea: {
    backgroundColor: CommonStyle.flanky_green,
    borderRadius: 30,
    paddingVertical:10,
    paddingHorizontal:13,
  },
  infoTitle:{
    color:'white',
    textAlign:'center'
  },
  infoDesc:{
    color:'white',
    textAlign:'center',
    fontSize:20,
    fontWeight: 'bold',
  }
});

export default ExerciseHeader;
