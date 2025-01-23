// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet,ScrollView, FlatList, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';
import AttendanceService from '../../Shared/attendanceService';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSession } from '../../Shared/sessionContextDTO';

const AttendanceView = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [total, setTotal] = useState(0);
  const [present, setPresent] = useState(0);
  const [absent, setAbsent] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const recordsPerPage = 10; 
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const { activeSesionId } = useSession();
  
  // Filtrar los datos según la búsqueda
  const onDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };
  useEffect(() => {
    if (search.trim() === '') {
      setFilteredData(data); 
    } else {
      const filtered = data.filter((item) =>
        item.nombreDelEmpleado.toLowerCase().includes(search.toLowerCase()) ||
        item.tituloDePuesto.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(filtered); 
    }
  }, [search, data]);
  const loadMore = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  //Carga de datos
  useEffect(() => {
    AttendanceService.getPagin('GetAttendanceRecordsByIdSupervisor', page, setTotalPages, setData,  setLoading, recordsPerPage, selectedDate, activeSesionId);  
    }, [page]
  );
  
  //Auto-refresh
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  //Parametros a mostrar
  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.checkInTime}</Text>
      <Text style={styles.cell}>{item.reader}</Text>
      <Text style={styles.cell}>{item.groupName}</Text>
      <Text style={styles.cell}>{item.shiftPattern}</Text>
      <Text style={styles.cell}>{item.isPresent}</Text>
    </View>
  );

  return (
    <View>
      <View style={styles.card}>
        <View style={styles.cardToolbar}>
            <Text style={styles.recordsText}>Records for {selectedDate.toLocaleDateString()}</Text>
        </View>
        <View style={styles.cardHeader}>
          <View style={styles.cardTitle}>
            <View style={styles.inputGroup}>
              <Icon style={styles.searchIcon} name="magnify" size={20} color="#000"/>
              <TextInput
                style={styles.input}
                placeholder="dd/mm/yyyy"
                value={selectedDate.toLocaleDateString()}
                onFocus={() => setShowDatePicker(true)}
              />
              <Button title="📅" onPress={() => setShowDatePicker(true)} />
            </View>
            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}
            <View style={styles.formCheck}>
              <CheckBox
                value={autoRefresh}
                onValueChange={setAutoRefresh}
              />
              <Text>Auto-refresh every 60 seconds</Text>
            </View>
          </View>
        </View>
        <View style={styles.cardHeader}>
          <View>
            <Text>Total</Text>
            <Text>{total}</Text>
          </View>
          <View>
            <Text style={styles.presentText}>Present</Text>
            <Text style={styles.presentText}>{present}</Text>
          </View>
          <View>
            <Text style={styles.absentText}>Absent</Text>
            <Text style={styles.absentText}>{absent}</Text>
          </View>
        </View>
      </View>
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={styles.headerCell}>Nombre</Text>
          <Text style={styles.headerCell}>Check-in time</Text>
          <Text style={styles.headerCell}>Reader</Text>
          <Text style={styles.headerCell}>Group</Text>
          <Text style={styles.headerCell}>Shift pattern</Text>
          <Text style={styles.headerCell}>Is present</Text>
          </View>
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
        />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 10,
  },
  cardHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  cardTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  formCheck: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardToolbar: {
    alignItems: 'flex-end',
  },
  recordsText: {
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  alignItemsCenter: {
    alignItems: 'center',
    marginVertical: 10,
  },
  presentText: {
    color: 'green',
  },
  absentText: {
    color: 'red',
  },
  cardBody: {
    marginTop: 25,
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
});

export default AttendanceView;
