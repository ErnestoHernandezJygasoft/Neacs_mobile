import React from 'react';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Components
import MenuContainer from '../Menu/MenuContainer.js';
import LoginView from '../Views/LoginView.js';
import HomeView from '../Views/HomeView.js';

export default class NavigationView extends React.Component {
    constructor() {
        super();

        const Drawer = createDrawerNavigator();
        this.state = { Drawer };

    }
    LoginScreen({ navigation }) {
        return <LoginView navigation={navigation}/>
    }

    HomeScreen({ navigation, route }) {
        return <HomeView navigation={navigation} route={route} />
    }

    render() {
        const { Drawer} = this.state;

        const ToLogin = (props) => {
            return this.LoginScreen(props);
        };

        const ToHome = (props) => {
            return this.HomeScreen(props);
        };

        const drawerContainer = [
            { name: 'Login', component: ToLogin },
            { name: 'Home', component: ToHome },
        ];

        return <NavigationContainer>
            <Drawer.Navigator
                initialRouteName='Login'
                drawerContent={props => <MenuContainer
                    {...props}
                />}
                backBehavior='history'
                screenOptions={({ route }) => {
                    const { name } = route;
                    return {
                        headerShown: name != 'Login',
                        swipeEnabled: name != 'Login',
                        headerStyle: { backgroundColor: '#131d64' },
                        headerTintColor: '#fff'
                    }
                }}
            >   
                
                {drawerContainer.map((element, index) => {
                    const { name, component } = element;
                    return <Drawer.Screen key={index} name={name} component={component} />
                })}
                
            </Drawer.Navigator>
        </NavigationContainer>
    }
}