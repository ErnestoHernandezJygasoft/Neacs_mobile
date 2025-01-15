// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [total, setTotal] = useState(0);
  const [present, setPresent] = useState(0);
  const [absent, setAbsent] = useState(0);

  const onDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        // Lógica para actualizar los datos
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  return (
    <View style={styles.card}>
      <View style={styles.cardToolbar}>
          <Text style={styles.recordsText}>Records for {selectedDate.toLocaleDateString()}</Text>
      </View>
      <View style={styles.cardHeader}>
        <View style={styles.cardTitle}>
          <View style={styles.inputGroup}>
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
      <View style={styles.cardBody}>
        {/* Aquí iría el componente de CRUD */}
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
});

export default App;
