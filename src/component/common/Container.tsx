import React, {Component} from 'react';
import {StyleSheet,View} from 'react-native';

class Container extends Component<{},{}> {
    render(){
        return(
            <View style={styles.container}>
                {this.props.children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal:20,
    }
})

export default Container