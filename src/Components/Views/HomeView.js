import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Icon } from 'react-native-elements';

const menuItems = [
  { icon: 'align-vertical-bottom', title: 'Attendance' },
  { icon: 'account-box-multiple', title: 'Employees' },
  { icon: 'account-group', title: 'Groups' },
  { icon: 'map-marker-radius', title: 'Plants' },
  { icon: 'alarm', title: 'Shifts' },
  { icon: 'account-lock', title: 'Users' },
  { icon: 'application-edit-outline', title: 'Workareas' },
  { icon: 'application-edit', title: 'Workschemes' },
];

const HomeView = ({ navigation }) => {
  const handleNav = (title) => {
    navigation.navigate(title);
  };
  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.grid}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => handleNav(item.title)}>
            <Card containerStyle={styles.card}>
              <View style={styles.cardContent}>
              <Icon 
                  name={item.icon} 
                  type='material-community'
                  size={30} 
                  color='#000'
                />
                <Text>{item.title}</Text>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  grid: {
    justifyContent:'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    borderRadius: 10,
    width: 150, 
    height: 150, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#000',
  },
});

export default HomeView;
