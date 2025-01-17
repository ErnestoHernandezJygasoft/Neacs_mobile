import React, { useState } from 'react';
import { View, TextInput, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Table, TableWrapper, Row } from 'react-native-reanimated-table';

//Imports para las funcionalidades de edicion
import {Button, Modal, TouchableOpacity, Text} from 'react-native';

const EmployeesView = () => {
  const [search, setSearch] = useState('');
  const handleInputChange = (field, value) => {
    if (field === 'search') {
      setSearch(value);
    }
  };
  const state = {
    tableHead: ['Head', 'Head2', 'Head3', 'Head4'],
    widthArr:[80,80,80,80]
  }
  const tableData = [
    ['John', 'Doe', 'Manager', 'HR'],
    ['Jane', 'Smith', 'Developer', 'IT'],
    ['Mike', 'Johnson', 'Designer', 'Marketing'],
  ];
  //AQUI IRIA MODALCONFIG
  return (
    <View>
      <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.cardTitle}>
          <Icon style={styles.searchIcon} name="magnify" size={20} color="#000"/>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar"
            onChangeText={(text) => handleInputChange('search', text)}
          />
        </View>
      </View>
      

      {/* MODAL */}

      </View>
      <ScrollView horizontal={true} contentContainerStyle={styles.card}>
          <View>
            <Table borderStyle={{borderWidth: 1}}>
              <Row data={state.tableHead} widthArr={state.widthArr} style={styles.tableHeader} textStyle={styles.text}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1}}>
                {
                  tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={state.widthArr}
                      style={[styles.row, index%2]}
                      textStyle={styles.text}
                    />
                  ))
                }
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    width: 180 ,
    margin: 10,
    paddingLeft: 40,
    borderRadius: 4,
  },
  cardToolbar: {
    alignItems: 'flex-end',
    margin: 10,
  },
  cardBody: {
    flex:1
  },
  tableHeader: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, justifyContent: 'center'}
});

export default EmployeesView;

//MODAL CONFIG
  // const [showModal, setShowModal] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  // const [formData, setFormData] = useState({
  //   id: '',
  // });

  // const handleSubmit = () => {
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setIsLoading(false);
  //     setShowModal(false);
  //   }, 2000);
  // };
//MODAL BUTTON
{/* <View style={styles.cardToolbar}>
          <Button title="Create New" onPress={() => setShowModal(true)} />
        </View> */}
//MODAL STYLES
  // modalBackground: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'rgba(0,0,0,0.5)',
  // },
  // modalContent: {
  //   backgroundColor: '#fff',
  //   width: '80%',
  //   borderRadius: 8,
  //   padding: 20,
  // },
  // formContainer: {
  //   paddingBottom: 40,
  // },
  // modalTitle: {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   marginBottom: 20,
  // },
  // input: {
  //   height: 40,
  //   borderColor: '#ccc',
  //   borderWidth: 1,
  //   borderRadius: 10,
  //   marginBottom: 12,
  //   paddingHorizontal: 8,
  // },
  // modalFooter: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   marginTop: 16,
  // },

{/* <Modal
  visible={showModal}
  animationType="slide"
  transparent={true}
  onRequestClose={() => setShowModal(false)}
>
  <View style={styles.modalBackground}>
    <View style={styles.modalContent}>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.modalTitle}>Employee</Text>

        <TextInput
          style={styles.input}
          placeholder="File del empleado"
          value={formData.id}
          onChangeText={(text) => handleInputChange('id', text)}
        />
        <View style={styles.modalFooter}>
          <Button title="Cancelar" onPress={() => setShowModal(false)} />
          <Button
            title={isLoading ? "Guardando..." : "Guardar"}
            onPress={handleSubmit}
            disabled={isLoading}
          />
        </View>
      </ScrollView>
    </View>
  </View>
</Modal> */}

