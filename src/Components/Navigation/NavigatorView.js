import React from 'react';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Components
import MenuContainer from '../Menu/MenuContainer.js';
import LoginView from '../Views/LoginView.js';
import HomeView from '../Views/HomeView.js';
import AttendanceView from '../Views/AttendanceView.js';
import EmployeesView from '../Views/EmployeesView.js';
import GroupsView from '../Views/GroupsView.js';
import PlantsView from '../Views/PlantsView.js';
import RolesView from '../Views/RolesView.js';
import ShiftView from '../Views/ShiftView.js';
import UsersView from '../Views/UsersView.js';
import WorkareasView from '../Views/WorkareasView.js';
import WorkschemesView from '../Views/WorkschemesView.js';

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
    AttendanceScreen({navigation, route}){
        return <AttendanceView navigation={navigation} route={route}/>
    }
    EmployeesScreen({navigation, route}){
        return <EmployeesView navigation={navigation} route={route}/>
    }
    GroupsScreen({navigation, route}){
        return <GroupsView navigation={navigation} route={route}/>
    }
    PlantsScreen({navigation, route}){
        return <PlantsView navigation={navigation} route={route}/>
    }
    RolesScreen({navigation, route}){
        return <RolesView navigation={navigation} route={route}/>
    }
    ShiftScreen({navigation, route}){
        return <ShiftView navigation={navigation} route={route}/>
    }
    UsersScreen({navigation, route}){
        return <UsersView navigation={navigation} route={route}/>
    }
    WorkareasScreen({navigation, route}){
        return <WorkareasView navigation={navigation} route={route}/>
    }
    WorkschemesScreen({navigation, route}){
        return <WorkschemesView navigation={navigation} route={route}/>
    }

    render() {
        const { Drawer} = this.state;

        const ToLogin = (props) => {
            return this.LoginScreen(props);
        };

        const ToHome = (props) => {
            return this.HomeScreen(props);
        };
        const ToAttendance = (props) => {
            return this.AttendanceScreen(props);
        };
        const ToEmployees = (props) => {
            return this.EmployeesScreen(props);
        };
        const ToGroups = (props) => {
            return this.GroupsScreen(props);
        };
        const ToPlants = (props) => {
            return this.PlantsScreen(props);
        };
        const ToRoles = (props) => {
            return this.RolesScreen(props);
        };
        const ToShifts = (props) => {
            return this.ShiftScreen(props);
        };
        const ToUsers = (props) => {
            return this.UsersScreen(props);
        };
        const ToWorkareas = (props) => {
            return this.WorkareasScreen(props);
        };
        const ToWorkschemes = (props) => {
            return this.WorkschemesScreen(props);
        };

        const drawerContainer = [
            { name: 'Login', component: ToLogin },
            { name: 'Dashboard', component: ToHome },
            { name: 'Attendance', component: ToAttendance },
            { name: 'Employees', component: ToEmployees },
            { name: 'Groups', component: ToGroups },
            { name: 'Plants', component: ToPlants },
            { name: 'Roles', component: ToRoles },
            { name: 'Shifts', component: ToShifts },
            { name: 'Users', component: ToUsers },
            { name: 'Workareas', component: ToWorkareas },
            { name: 'Workschemes', component: ToWorkschemes },
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