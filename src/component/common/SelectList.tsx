import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';

interface SelectListProps {
  title?: string;
  selectListItem: string[];
  onPress: (title) => void;
}

class SelectList extends React.Component<SelectListProps, {}> {
  constructor(props: SelectListProps) {
    super(props);
  }

  render() {
    const title = this.props.title;
    return (
      <View>
        <View style={styles.titleView}>
          {title && <Text style={styles.titleText}>{title}</Text>}
        </View>
        <View style={styles.buttonView}>
          {this.props.selectListItem.map((item, index) => {
            return (
              <TouchableOpacity
                style={styles.levelButton}
                onPress={() => this.props.onPress(index)}
              >
                <Text style={styles.levelText}>{item}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleView: {
    marginBottom: 10,
    alignItems: 'center'
  },
  titleText: {
    fontSize: 24,
    color: 'white'
  },
  buttonView: {
    flexDirection: 'column',
    alignItems:'center'
  },
  levelButton: {
    marginBottom: 10,
    width: 100,
    backgroundColor: '#75DDDD',
    borderRadius: 20
  },
  levelText: {
    textAlign: 'center',
    padding: 10,
    fontSize: 20,
    color: 'black'
  }
});

export default SelectList;
