import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';

// common
import Router from '../util/Router';
import LocalStorage from '../util/LocalStorage';
import { NavigationProps, UserData } from '../common/Model';

// component
import SelectList from '../component/common/SelectList';
import Container from '../component/common/Container';

interface SettingScreenState {
  selectListItem: string[];
}

class SettingScreen extends Component<NavigationProps, SettingScreenState> {
  constructor(props) {
    super(props);
    this.state = {
      selectListItem: ['Easy', 'Normal', 'Hard']
    };
  }

  onPressButton(level: number) {
    const userData = new UserData();
    userData.exerciseLevel = level;
    LocalStorage.setItem(userData);
    return this.props.navigation.dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: Router.HOME })]
      })
    );
  }

  render() {
    return (
      <Container>
        <SelectList
          title={'운동 수준을 선택해주세요'}
          selectListItem={this.state.selectListItem}
          onPress={this.onPressButton.bind(this)}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
});

export default SettingScreen;
