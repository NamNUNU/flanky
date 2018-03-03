import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// component
import CommonStyle from '../../common/CommonStyle';

interface DarkGreenButtonProps {
  onPress: () => void;
  disabled?: boolean;
  text: string;
}

class DarkGreenButton extends Component<DarkGreenButtonProps, {}> {
  render() {
    const { disabled, text } = this.props;
    return (
      <TouchableOpacity
        style={styles.btnWrap}
        onPress={this.props.onPress}
        disabled={disabled}
      >
        <Text style={styles.btnText}>{text}</Text>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  btnWrap: {
    width: 150,
    marginTop: 20,
    backgroundColor: CommonStyle.flanky_darkgreen,
    borderRadius: 30,
    alignItems: 'center'
  },
  btnText: {
    paddingVertical: 5,
    textAlign: 'center',
    color: 'white',
    fontSize: 24
  }
});

export default DarkGreenButton;
