import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, ScrollView, FlatList, ActivityIndicator, Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getPagin, paginSearch } from '../../Shared/Base';

const EmployeesView = () => {
  //Barra de busqueda
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const handleInputChange = (field, value) => {
    if (field === 'search') {
      setSearch(value);
    }
  };
  //Datatable
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const recordsPerPage = 6; 

  //Carga de datos
  useEffect(() => {
    getPagin('http://192.168.20.244:5000/api/Employee',page, setTotalPages, setData, setLoading, recordsPerPage);
    }, [page]
  );
  
  //Busqueda
  useEffect(() => {
    if (search.trim() === '') {
      const noSearch = data.slice((page - 1) * recordsPerPage, page * recordsPerPage);
      setFilteredData(noSearch); 
    } else {
      paginSearch('http://192.168.20.244:5000/api/Employee', 'nombreDelEmpleado', search, page, setTotalPages, setFilteredData, setLoading, recordsPerPage);
    }
  }, [search, data, page]);

  //Parametros a mostrar
  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.idPeoplesoft}</Text>
      <Text style={styles.cell}>{item.nombreDelEmpleado}</Text>
      <Text style={styles.cell}>{item.fechaDeIngreso}</Text>
      <Text style={styles.cell}>{item.gradoDeCompensacion}</Text>
      <Text style={styles.cell}>{item.tituloDePuesto}</Text>
    </View>
  );

  //AQUI IRIA MODALCONFIG
  
  return (
    <View>
      {/* Header */}
      <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.cardTitle}>
          <Icon style={styles.searchIcon} name="magnify" size={20} color="#000"/>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar"
            onChangeText={(text) => handleInputChange('search', text)}
            onBlur={() => {
              setSearch('');
              setPage(1);
            }}
          />
        </View>
      </View>
      {/* MODAL */}
      </View>
      {/* Datatable */}
      <View style={styles.datatableCard}>
        <View style={styles.headerRow}>
          <Text style={styles.headerCell}>ID Peoplesoft</Text>
          <Text style={styles.headerCell}>Nombre del Empleado</Text>
          <Text style={styles.headerCell}>Check-in time</Text>
          <Text style={styles.headerCell}>Grado de Compensación</Text>
          <Text style={styles.headerCell}>Título de Puesto</Text>
        </View>
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.idPeoplesoft.toString()}
          ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
        />
        <View style={styles.cardFooter}>
          <Text style={styles.pageNumber}>
            {page} / {totalPages}
          </Text>
          <View style={styles.paginationButtons}>
            <View style={styles.buttons}>
              <Button
                title="Anterior"
                onPress={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
                disabled={page === 1}
              />
            </View>
            <View style={styles.buttons}>
              <Button
                title="Siguiente"
                onPress={() => setPage((prevPage) => Math.min(prevPage + 1, totalPages))}
                disabled={page === totalPages}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    padding: 16,
  },
  datatableCard: {
    margin: 10,
    height: 650,
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
    paddingLeft: 10,
    borderRadius: 4,
  },
  cardToolbar: {
    alignItems: 'flex-end',
    margin: 10,
  },
  cardBody: {
    flex:1
  },
  row: { 
    flexDirection: 'row', 
    padding: 10, 
    borderBottomWidth: 1, 
    borderBottomColor: '#ccc' 
  },
  cell: { 
    flex: 1, 
    textAlign: 'center' 
  },
  headerRow: {
    padding:10,
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  headerCell: { 
    flex: 1, 
    textAlign: 'center' 
  },
  cardFooter: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paginationButtons: {
    flexDirection: 'row',
  },
  buttons: {
    margin: 5,
  },
});

export default EmployeesView;



//-------------------- Funciones de edicion --------------------------------

// // import {Button, Modal, TouchableOpacity, Text} from 'react-native';
// //MODAL CONFIG
//   // const [showModal, setShowModal] = useState(false);
//   // const [isLoading, setIsLoading] = useState(false);

//   // const [formData, setFormData] = useState({
//   //   id: '',
//   // });

//   // const handleSubmit = () => {
//   //   setIsLoading(true);
//   //   setTimeout(() => {
//   //     setIsLoading(false);
//   //     setShowModal(false);
//   //   }, 2000);
//   // };
// //MODAL BUTTON
// {/* <View style={styles.cardToolbar}>
//           <Button title="Create New" onPress={() => setShowModal(true)} />
//         </View> */}
// //MODAL STYLES
//   // modalBackground: {
//   //   flex: 1,
//   //   justifyContent: 'center',
//   //   alignItems: 'center',
//   //   backgroundColor: 'rgba(0,0,0,0.5)',
//   // },
//   // modalContent: {
//   //   backgroundColor: '#fff',
//   //   width: '80%',
//   //   borderRadius: 8,
//   //   padding: 20,
//   // },
//   // formContainer: {
//   //   paddingBottom: 40,
//   // },
//   // modalTitle: {
//   //   fontSize: 18,
//   //   fontWeight: 'bold',
//   //   marginBottom: 20,
//   // },
//   // input: {
//   //   height: 40,
//   //   borderColor: '#ccc',
//   //   borderWidth: 1,
//   //   borderRadius: 10,
//   //   marginBottom: 12,
//   //   paddingHorizontal: 8,
//   // },
//   // modalFooter: {
//   //   flexDirection: 'row',
//   //   justifyContent: 'space-between',
//   //   marginTop: 16,
//   // },

// {/* <Modal
//   visible={showModal}
//   animationType="slide"
//   transparent={true}
//   onRequestClose={() => setShowModal(false)}
// >
//   <View style={styles.modalBackground}>
//     <View style={styles.modalContent}>
//       <ScrollView contentContainerStyle={styles.formContainer}>
//         <Text style={styles.modalTitle}>Employee</Text>

//         <TextInput
//           style={styles.input}
//           placeholder="File del empleado"
//           value={formData.id}
//           onChangeText={(text) => handleInputChange('id', text)}
//         />
//         <View style={styles.modalFooter}>
//           <Button title="Cancelar" onPress={() => setShowModal(false)} />
//           <Button
//             title={isLoading ? "Guardando..." : "Guardar"}
//             onPress={handleSubmit}
//             disabled={isLoading}
//           />
//         </View>
//       </ScrollView>
//     </View>
//   </View>
// </Modal> */}


