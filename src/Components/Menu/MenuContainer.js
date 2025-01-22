import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import { View, Text, ScrollView } from 'react-native';
import { Header, Button } from 'react-native-elements';
import { CommonActions } from '@react-navigation/native';

// Components
import DrawerMenu from './DrawerMenu.js';

const menuItems = [
    { icon: 'home', title: 'Dashboard' },
    { icon: 'align-vertical-bottom', title: 'Attendance' },
    { icon: 'account-box-multiple', title: 'Employees' },
    { icon: 'account-group', title: 'Groups' },
    { icon: 'map-marker-radius', title: 'Plants' },
    { icon: 'alarm', title: 'Shifts' },
    { icon: 'account-lock', title: 'Users' },
    { icon: 'application-edit-outline', title: 'Workareas' },
    { icon: 'application-edit', title: 'Workschemes' },
    // { icon: 'account-child', title: 'Roles' },
];

export default class MenuContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = { loading: false };
    }

    defineValuesToReset(element) {
        switch (element) {
            case 'credentialsSaved': return 'false';
            default: return null;
        }
    }

    onSalirPress({ dispatch }) {
        const { stateData, setStateData, credentialsSaved } = this.props;

        this.setState({ loading: true });

        if (credentialsSaved == 'false') {
            stateData.forEach(element => {
                const value = this.defineValuesToReset(element);
                setStateData(element, value);
            });
        }

        this.logout(dispatch);
    }

    logout(dispatch) {
        dispatch(CommonActions.reset({
            index: 0,
            routes: [{ name: 'Login' }]
        }));

        this.setState({ loading: false });
    }

    render() {
        const { loading } = this.state;
        const { navigation } = this.props;
        
        return <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Header style={{ flex: 1 }}
                centerComponent={<Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>Menú</Text>}
                backgroundColor='#1e1e3f'
            />
            <ScrollView>
                <View style={{ flex: 1 }}>
                {menuItems.map((element, index) => {
                        const { icon, title } = element;
                        return <DrawerMenu key={index} icon={icon} title={title} navigation={() => navigation.navigate(title)} />
                    })}
                </View>
            </ScrollView>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: '5%' }}>
                <Button
                    title="SALIR"
                    ViewComponent={LinearGradient}
                    linearGradientProps={{
                        colors: ['#FF9800', '#F44336'],
                        start: { x: 0, y: 0.5 },
                        end: { x: 1, y: 0.5 },
                    }}
                    containerStyle={{
                        width: '85%',
                        borderRadius: 30
                    }}
                    loading={loading}
                    onPress={() => this.onSalirPress(navigation)}
                />
            </View>
        </View>
    }
}