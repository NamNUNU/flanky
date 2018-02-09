import React, { Component } from 'react';
// import { NavigationScreenProps, NavigatorType } from 'react-navigation';
import { StyleSheet, View, Text, Button } from 'react-native';

// common
import Router from '../util/Router';
import LocalStorage from '../util/LocalStorage';

// component
import SelectList from '../component/SelectList';

interface SettingScreenState {
  selectListItem: string[];
}

interface SettingScreenProps {
  navigation: any;
}

class SettingScreen extends Component<SettingScreenProps, SettingScreenState> {

  constructor(props) {
    super(props);

    this.state = {
      selectListItem: ['Easy', 'Normal', 'Hard'],
    }
  }

  componentDidMount() {
    LocalStorage.getItem(LocalStorage.KEY_exerciseLevel, this.fetchedLocalItem);
  }

  fetchedLocalItem(value) {
    console.log('im in', value);
  }

  onPressButton(level) {
    this.props.navigation.navigate(Router.HOME);
    LocalStorage.setItem(LocalStorage.KEY_exerciseLevel, level);
  }

  render() {
    // console.log('this.props.navigation',this.props.navigation)
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