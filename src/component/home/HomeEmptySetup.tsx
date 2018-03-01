import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// common
import { NavigationProps } from '../../common/Model';
import Router from '../../util/Router';

interface HomeEmptySetupProps {
  onPressSetup: () => void;
}

class HomeEmptySetup extends Component<HomeEmptySetupProps, {}> {
  render() {
    return (
      <View>
        <Text style={styles.bigNote}>아직</Text>
        <Text style={styles.note}>운동 계획이 없군요!</Text>
        <Text style={styles.note}>레벨을 설정해볼까요?</Text>
        <TouchableOpacity onPress={this.props.onPressSetup}>
          <View style={styles.setup}>
            <Text style={styles.setupText}>Setup Level</Text>
            <Icon
              style={styles.rightIcon}
              name="angle-right"
              size={18}
              color={'white'}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bigNote: {
    fontSize: 50,
    color: 'white'
  },
  note: {
    fontSize: 24,
    color: 'white'
  },
  setup: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  setupText: {
    fontSize: 18,
    color: 'white'
  },
  rightIcon: {
    marginLeft: 5
  }
});

export default HomeEmptySetup;
