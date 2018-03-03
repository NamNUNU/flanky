import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import CommonStyle from '../../common/CommonStyle'

interface TimeControlBtnProps {
  onPressTimeControlBtn: () => void;
  onPressEndBtn: () => void;
  isRunning: boolean;
}

class TimeControlBtn extends Component<TimeControlBtnProps, {}> {
  render() {
    return (
      <View style={styles.timeControlBtnWrap}>
        <TouchableOpacity
          style={styles.timeControlBtn}
          onPress={this.props.onPressTimeControlBtn}
        >
          {this.props.isRunning ? (
            <Icon
              style={styles.btnTxt}
              name="pause"
              size={32}
              color={'white'}
            />
          ) : (
            <Icon style={styles.btnTxt} name="play" size={32} color={'white'} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.timeControlBtn}
          onPress={this.props.onPressEndBtn}
        >
          <Text style={styles.btnTxt}>{'End'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  timeControlBtnWrap: {
    flexDirection: 'row'
  },
  timeControlBtn: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: CommonStyle.flanky_darkgreen,
    borderWidth: 0.3,
    borderColor: 'white'
  },
  btnTxt: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white'
  }
});

export default TimeControlBtn;
