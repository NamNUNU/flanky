import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
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
          <Text style={styles.infoDesc}>{currentStep}/5</Text>
          </View>
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
  exerciseInfo: {
    marginVertical:30,
    paddingHorizontal:40,
    paddingVertical: 10,
    width: '100%',
    backgroundColor: '#65bbdf',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  exerciseHeader: {
    marginBottom: 20
  },
  infoArea: {
    backgroundColor: '#29a2d9',
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
