import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const menuItems = [
  { title: 'Attendance' },
  { title: 'Employees' },
  { title: 'Groups' },
  { title: 'Plants' },
  { title: 'Roles' },
  { title: 'Shifts' },
  { title: 'Users' },
  { title: 'Workareas' },
  { title: 'Workschemes' },
];

const HomeView = () => {
  const navigation = useNavigation();
  const handleNav = (title) => {
    navigation.navigate(title)
  }
  return (
    <ScrollView style={styles.container}>
      {menuItems.map((item, index) => ( 
        <TouchableOpacity key={index} onPress={() => handleNav(item.title)}>
        <Card containerStyle={styles.card}>
          <Card.Title style={styles.cardContent}>
            {item.title}
          </Card.Title>
        </Card>
      </TouchableOpacity>
    ))} 
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',     
    backgroundColor: '#fff',   
  },
  text: {
    fontSize: 18,
    color: '#000',
  },
  container: { 
    padding: 10, 
  }, 
  card: { 
    borderRadius: 10,
  }, 
  cardContent: { 
    flexDirection: 'row', 
    alignItems: 'center', 
  },
});

export default HomeView;
