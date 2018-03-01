import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';

// common
import Router from '../util/Router';
import LocalStorage from '../util/LocalStorage';
import { NavigationProps, UserData, SelectListItem } from '../common/Model';

// component
import SelectList from '../component/common/SelectList';
import Container from '../component/common/Container';

interface SettingScreenState {
  selectListItem: SelectListItem[];
}

class SettingScreen extends Component<NavigationProps, SettingScreenState> {
  constructor(props) {
    super(props);
    this.state = {
      selectListItem: [{
        level:'Easy',
        color:'#35CE8D',
        desc:'가장 쉬운 초급 난이도',
        desc2:'start: 20sec',
      },
      {
        level:'Normal',
        color:'#fb8b24',
        desc:'숙련자를 위한 중간 난이도',
        desc2:'start: 20sec',
      },
      {
        level:'Hard',
        color:'#d90368',
        desc:'매니아를 위한 고급 난이도',
        desc2:'start: 20sec',
      }]
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
      <View style={styles.container}>
        <SelectList
          title={'운동 수준을 선택해주세요'}
          selectListItem={this.state.selectListItem}
          onPress={this.onPressButton.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#29a2d9',
    padding: 20
  }
});

export default SettingScreen;
