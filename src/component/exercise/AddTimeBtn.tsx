import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface AddTimeButtonProps {
  onPressAddSeconds: () => void;
  isRunning:boolean;
}

class AddTimeButton extends Component<AddTimeButtonProps, {}> {
  render() {
    return (
      <TouchableOpacity style={styles.addTimeButton} onPress={this.props.onPressAddSeconds}>
        {this.props.isRunning && (
        <View style={styles.addSeconds}>
          <View style={[styles.addSecondsSame, styles.addSecondsLeft]}>
          <Icon
              style={styles.rightIcon}
              name="plus"
              size={16}
              color={'white'}
            />
            <Text style={styles.addSecondsLeftText}>시간추가</Text>
          </View>
          <View style={[styles.addSecondsSame,styles.addSecondsRight]}>
            <Text style={styles.addSecondsRightText}>10</Text>
          </View>
        </View>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    addTimeButton:{
        height:30,
    },
    addSeconds: {
        width: 150,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      },
      rightIcon: {
        marginRight: 5
      },
      addSecondsSame:{
        paddingVertical: 8,
        paddingHorizontal: 10,
        overflow: 'hidden',
      },
      addSecondsLeft: {
        flex: 4,
        flexDirection: 'row',
        backgroundColor: '#65BADF',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
      },
      addSecondsLeftText: {
        color:'white',
        fontSize:16,
        fontWeight: 'bold',
      },
      addSecondsRight: {
        flex: 1,
        backgroundColor: '#3E454D',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
      },
      addSecondsRightText: {
        color:'white',
        fontSize:16,
        fontWeight: 'bold',
      },
});

export default AddTimeButton;
