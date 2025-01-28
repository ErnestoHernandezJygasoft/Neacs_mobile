import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, ScrollView, FlatList, ActivityIndicator, Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getPagin, paginSearch } from '../../Shared/Base';

const UsersView = () => {
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
      getPagin('http://192.168.20.244:5000/api/Users',page, setTotalPages, setData, setLoading, recordsPerPage);
      }, [page]
    );
    
    //Busqueda
    useEffect(() => {
      if (search.trim() === '') {
        const noSearch = data.slice((page - 1) * recordsPerPage, page * recordsPerPage);
        setFilteredData(noSearch); 
      } else {
        paginSearch('http://192.168.20.244:5000/api/Users', 'name', search, page, setTotalPages, setFilteredData, setLoading, recordsPerPage);
      }
    }, [search, data, page]);

  //Parametros a mostrar
  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.idPeoplesoft}</Text>
      <Text style={styles.cell}>{item.email}</Text>
      <Text style={styles.cell}>{item.idSupervisor}</Text>
      <Text style={styles.cell}>{item.phoneNumber}</Text>
      <Text style={styles.cell}>{item.idRoute}</Text>
      <Text style={styles.cell}>{item.idWorkArea}</Text>
      <Text style={styles.cell}>{item.idGroup}</Text>
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
              <Text style={styles.headerCell}>Nombre</Text>
              <Text style={styles.headerCell}>Id Peoplesoft</Text>
              <Text style={styles.headerCell}>e-mail</Text>
              <Text style={styles.headerCell}>Id supervisor</Text>
              <Text style={styles.headerCell}>No. de telefono</Text>
              <Text style={styles.headerCell}>Id ruta</Text>
              <Text style={styles.headerCell}>Id area de trabajo</Text>
              <Text style={styles.headerCell}>Id grupo</Text>
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
    margin: 16,
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
export default UsersView;

//-------------------- Funciones de edicion --------------------------------
//MODAL CONFIG
  // const [showModal, setShowModal] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  // const [formData, setFormData] = useState({
  //   id: '',
  // });

  // const handleInputChange = (field, value) => {
  //   setFormData({
  //     ...formData,
  //     [field]: value,
  //   });
  // };

  // const handleSubmit = () => {
  //   setIsLoading(true);
  //   // Aquí iría la lógica de envío del formulario
  //   setTimeout(() => {
  //     setIsLoading(false);
  //     setShowModal(false);
  //   }, 2000);
  // };
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
        <Text style={styles.modalTitle}>TITLE</Text>
        <TextInput
          style={styles.input}
          placeholder="PLACEHOLDER"
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