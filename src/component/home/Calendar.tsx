import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

//common
import { UserData } from '../../common/Model';
import CommonStyle from '../../common/CommonStyle';

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
                      <Text
                        key={dayIndex}
                        style={[
                          styles.dayTxt,
                          this.props.userData.todayStep + 1 === day &&
                            styles.currentDayTxt
                        ]}
                      >
                        {day}
                      </Text>
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
    paddingHorizontal: 10,
    paddingVertical: 25,
    backgroundColor: 'white'
  },
  title: {
    backgroundColor: CommonStyle.flanky_darkblue
  },
  titleText: {
    paddingVertical: 10,
    textAlign: 'center',
    color: 'white',
    fontSize: 24
  },
  week: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  day: {
    flex: 1
  },
  dayTxt: {
    width: 40,
    textAlign: 'center',
    fontSize: 16,
    paddingVertical: 8
  },
  currentDayTxt: {
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: CommonStyle.flanky_darkgreen,
    color: 'white',
    fontWeight: 'bold'
  }
});

export default Calendar;
