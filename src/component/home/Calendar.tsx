import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

//common
import { UserData } from '../../common/Model';

interface CalendarProps {
  userData: UserData;
  exercisePlan: number[];
}

interface CalendarState {
  weeksArray: number[][];
}

class Calendar extends Component<CalendarProps, CalendarState> {
  constructor(props) {
    super(props);
    this.state = {
      weeksArray: this.getWeeksArray(30)
    };
  }
  getWeeksArray(lastDay) {
    const { userData, exercisePlan } = this.props;
    const weeks = [];
    let days = [];
    console.log('length', exercisePlan.length);
    exercisePlan.forEach((day, index) => {
      days.push(index + 1);
      if ((index + 1) % 5 === 0) {
        weeks.push(days);
        days = [];
      }
    });
    return weeks;
  }
  render() {
    const { weeksArray } = this.state;
    // console.log('weeksArray',weeksArray)
    return (
      <View style={styles.calendar}>
        {weeksArray.map((item, index) => {
          return (
            <View key={index} style={styles.week}>
              {item.map((day, dayIndex) => {
                return (
                  <View style={styles.day}>
                    <View style={styles.dayOutline}>
                      <Text key={dayIndex} style={styles.dayTxt}>
                        {day}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  calendar: {
      borderRadius: 10,
      overflow:'hidden'
  },
  week: {
    flexDirection: 'row',
  },
  day: {
    flex: 1,
    padding: 10,
    backgroundColor: '#C2E1EF'
  },
  dayOutline: {
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 40,
    backgroundColor: '#237BA1'
  },
  dayTxt: {
    textAlign: 'center',
    fontSize: 24,
    color: 'white'
  }
});

export default Calendar;
