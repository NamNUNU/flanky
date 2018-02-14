import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
interface DayListPorps {
  exercisePlan: number[];
}

class DayList extends Component<DayListPorps, {}> {
  render() {
    const { exercisePlan } = this.props;
    return <View style={styles.dayList}>
      {this.props.exercisePlan.map((item, index) => {
        return (<View style={styles.dayItem} key={index}>
          <Text >{index + 1}</Text>
          <Text >{item < 0 ? 'R' : item}</Text>
        </View>)
      })}
    </View>
  }
}

const styles = StyleSheet.create({
  dayList: {
    display: 'flex',
    flexDirection: 'row',
  },
  dayItem: {
    flex:1,
    backgroundColor :'blue',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    // flex: 1,
    // backgroundColor: 'white',
    // justifyContent: 'center'
  },
});

export default DayList;