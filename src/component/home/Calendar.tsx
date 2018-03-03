import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

//common
import { UserData } from '../../common/Model';

interface CalendarProps {
  userData: UserData;
  exercisePlan: number[];
  style?: Object;
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
      if ((index + 1) % 6 === 0) {
        weeks.push(days);
        days = [];
      }
    });
    return weeks;
  }
  render() {
    const { weeksArray } = this.state;

    return (
      <View style={this.props.style}>
        <View style={styles.title}>
          <Text style={styles.titleText}>30 days</Text>
        </View>
        <View style={styles.calendar}>
          {weeksArray.map((item, index) => {
            return (
              <View key={index} style={styles.week}>
                {item.map((day, dayIndex) => {
                  return (
                    <View style={styles.day}>
                      <View>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  calendar: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
    padding:10,
  },
  title: {
    backgroundColor: '#237BA1'
  },
  titleText: {
    paddingVertical: 10,
    textAlign: 'center',
    color: 'white',
    fontSize: 24
  },
  week: {
    flexDirection: 'row'
  },
  day: {
    flex: 1,
    paddingVertical: 8
  },
  dayTxt: {
    textAlign: 'center',
    fontSize: 16
  }
});

export default Calendar;
