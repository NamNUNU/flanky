import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

// common
import Router from '../util/Router';
import LocalStorage from '../util/LocalStorage';
import { NavigationProps } from '../common/Model';

// component
import SelectList from '../component/SelectList';

interface SettingScreenState {
  selectListItem: string[];
}

class SettingScreen extends Component<NavigationProps, SettingScreenState> {

  constructor(props) {
    super(props);

    this.state = {
      selectListItem: ['Easy', 'Normal', 'Hard'],
    }
  }

  onPressButton(level: number) {
    const userData = LocalStorage.getUserData();
    userData.exerciseLevel = level;
    LocalStorage.setItem(userData);
    this.props.navigation.goBack();
  }

  render() {
    return (<View style={styles.container}>
      <SelectList
        title={'운동 수준을 선택해주세요'}
        selectListItem={this.state.selectListItem}
        onPress={this.onPressButton.bind(this)}
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