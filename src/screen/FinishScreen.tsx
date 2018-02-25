import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';

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
      <View>
        <Text>exercise finish</Text>
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

export default FinishScreen;
