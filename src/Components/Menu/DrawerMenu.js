import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { View, Text, TouchableOpacity } from 'react-native';

export default class DrawerMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { icon, title, navigation } = this.props;

        return <TouchableOpacity onPress={navigation}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginLeft: 10, marginVertical: 15 }}>
                <View style={{ flex: 1.5, justifyContent: 'center' }}>
                    <Icon size={15} name={icon} color="#000"/>
                </View>
                <View style={{ flex: 8.5, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 13 }}>{title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    }
}