import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import PropTypes from 'prop-types';

// common
import Router from '../util/Router';
import LocalStorage from '../util/LocalStorage';

// component
import SelectList from '../component/SelectList';

interface SettingScreenState {
  selectListItem: string[];
}

class SettingScreen extends Component<{}, SettingScreenState> {
  constructor(props) {
    super(props);
    this.state = {
      selectListItem: ['Easy', 'Normal', 'Hard'],
    }
  }

  componentDidMount() {

  }

  onPressButton(level) {
    LocalStorage.setItem(LocalStorage.KEY_exerciseLevel, level);
  }

  render() {
    return (<View style={styles.container}>
      <SelectList
        title={'운동 수준을 선택해주세요'}
        selectListItem={this.state.selectListItem}
        onPress={this.onPressButton}
      />
    </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
});

export default SettingScreen;
