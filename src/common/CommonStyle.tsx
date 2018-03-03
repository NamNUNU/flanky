import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// base color
// 연분홍 - 그레이블루 - 스카이블루 - 블루 - 민트
// eccbd9-e1eff6-97d2fb-83bcff-80ffe8

class CommonStyle extends Component<{}, {}> {
  static flanky_green = '#4dcec4';
  static flanky_darkgreen = '#44b3ad';
  static flanky_lightgreen = '#acf2ed';

  render() {
    return <View style={styles.commonStyle}>{this.props.children}</View>;
  }
}

export const styles = StyleSheet.create({
  commonStyle: {
    flex: 1,
    backgroundColor: '#4dcec4'
  }
});

export default CommonStyle;
