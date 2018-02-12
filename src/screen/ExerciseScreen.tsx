import React, { Component } from 'react';
import { View, Text } from 'react-native';

interface ExerciseScreenProps {
  navigation: any;
}

class ExerciseScreen extends Component<ExerciseScreenProps, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>this is exercise Screen</Text>
      </View>
    );
  }
}

export default ExerciseScreen;
