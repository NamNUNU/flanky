import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { SelectListItem } from '../../common/Model';

interface SelectListProps {
  title?: string;
  selectListItem: SelectListItem[];
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
                style={styles.levelCard}
                onPress={() => this.props.onPress(index)}
              >
                <View style={styles.levelLeft}>
                  <Icon name="user-circle" size={80} color={item.color} />
                </View>
                <View style={styles.levelRight}>
                  <Text style={styles.levelTitle}>{item.level}</Text>
                  <Text style={styles.levelDesc}>{item.desc}</Text>
                  <Text style={styles.levelDesc2}>{item.desc2}</Text>
                </View>
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
    marginBottom: 20,
    paddingVertical:10,
    alignItems: 'center',
    backgroundColor:'#237BA1',
    borderRadius: 30,
  },
  titleText: {
    fontSize: 24,
    color: 'white'
  },
  buttonView: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  levelCard: {
    paddingHorizontal:20,
    marginBottom: 10,
    width: '100%',
    height: 150,
    flexDirection: 'row',
    backgroundColor: '#C2E1EF',
    borderRadius: 20,
    alignItems: 'center',
  },
  levelLeft: {
    flex:1,
    alignItems: 'center',
  },
  levelRight: {
    flex:2,
  },
  levelTitle: {
    marginBottom:5,
    textAlign: 'center',
    fontSize: 36,
    color: 'black'
  },
  levelDesc: {
    textAlign: 'center',
    fontSize: 16,
    color: 'black',
    borderBottomWidth: 1,
    borderBottomColor: '#9c9c9c',
  },
  levelDesc2: {
    textAlign: 'center',
    fontSize: 16,
    color: 'black'
  }
});

export default SelectList;
