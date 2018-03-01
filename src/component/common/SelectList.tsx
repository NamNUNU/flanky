import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, AsyncStorage } from 'react-native';

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
                <View>
                    {this.props.selectListItem.map((item, index) => {
                        return (
                            <View key={index} style={styles.buttonView}>
                                <Button
                                    onPress={() => this.props.onPress(index)}
                                    title={item}
                                />
                            </View>
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
        fontSize: 24
    },
    buttonView: {
        marginBottom: 10
    }
});

export default SelectList;
