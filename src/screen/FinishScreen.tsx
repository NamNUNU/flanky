import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

// model
import Router from '../util/Router';

// common
import { CommonStyles } from '../common/CommonStyles';
import { NavigationProps } from '../common/Model';

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
      <View style={styles.container}>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>운동 종료</Text>
        </View>
        <View style={styles.resultImageWrap}>
          <Icon name="trophy" size={120} color={'white'} />
        </View>
        <View  style={styles.descWrap}>
          <Text style={styles.desc}>수고했어요</Text>
          <Text style={styles.desc}>푹쉬고 내일도 열심히 운동해요!</Text>
        </View>
        <TouchableOpacity
          style={CommonStyles.blueBtn}
          onPress={this._onPressComfirm.bind(this)}
        >
          <Text style={CommonStyles.blueBtnTxt}>확인</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#29a2d9',
    padding: 20
  },
  titleWrap:{
    paddingVertical:20,
  },
  title: {
    fontSize: 32,
    color: 'white',
    textAlign:'center'
  },
  descWrap:{
    paddingVertical:20,
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
  }
});

export default FinishScreen;
