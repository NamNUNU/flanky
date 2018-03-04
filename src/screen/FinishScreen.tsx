import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

// model
import Router from '../util/Router';

// common
import CommonStyle from '../common/CommonStyle';
import { NavigationProps } from '../common/Model';
import DarkGreenButton from '../component/common/DarkGreenButton';

class FinishScreen extends Component<NavigationProps, {}> {
  _onPressComfirm() {
    return this.props.navigation.dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: Router.HOME })]
      })
    );
  }

  render() {
    return (
      <CommonStyle>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>운동 종료</Text>
        </View>
        <View style={styles.resultImageWrap}>
          <Icon name="trophy" size={120} color={'white'} />
        </View>
        <View style={styles.descWrap}>
          <Text style={styles.desc}>수고했어요</Text>
          <Text style={styles.desc}>푹쉬고 내일도 열심히 운동해요!</Text>
        </View>
        <View style={styles.btnWrap}>
          <DarkGreenButton
            text={'확인'}
            onPress={this._onPressComfirm.bind(this)}
          />
        </View>
      </CommonStyle>
    );
  }
}

const styles = StyleSheet.create({
  titleWrap: {
    paddingVertical: 20
  },
  title: {
    fontSize: 32,
    color: 'white',
    textAlign: 'center'
  },
  descWrap: {
    paddingVertical: 20
  },
  desc: {
    fontSize: 24,
    color: 'white'
  },
  resultImageWrap: {
    alignItems: 'center'
  },
  resultImage: {
    width: 250,
    height: 200
  },
  btnWrap: {
    alignItems: 'center'
  }
});

export default FinishScreen;
