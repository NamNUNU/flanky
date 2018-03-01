import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

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
        <TouchableOpacity onPress={this.props.onPressSetup}>
          <Text>setup Exercise level</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default HomeEmptySetup;
