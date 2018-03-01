import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class Container extends Component<{}, {}> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.innerContent}>{this.props.children}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7F95D1',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal:26,
  },
  innerContent: {
    height:200,
    flex: 1
  }
});

export default Container;
