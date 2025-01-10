import React, {useState} from 'react';
import {  View, Text, StyleSheet, TextInput, Button, ActivityIndicator, Image } from 'react-native';
import { checkStatus } from '../../Shared/Base';

const LoginView = () => {
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');

  const submitForm = () => {
    console.log('El boton si jala');
    console.log(username, password);
    fetch('http://192.168.20.244:44391/api/Users', { 
      method: 'POST', 
      headers: {
         Accept: 'application/json', 
         'Content-Type': 'application/json', 
        },
      body: JSON.stringify({ username, password, }), }) 
    .then(response =>{
      console.log('Respuesta del servidor:', response); 
      if (!response.ok) { 
        throw new Error('Error en la solicitud: ' + response.statusText); 
      } 
      return response.json();
    }) 
    .then(data => {
      console.log('Success:', data);
      if (data.valid) { 
        navigation.navigate('home'); 
      } else { 
         alert('Credenciales inválidas'); 
      }
    })
    .catch(error => { 
      console.error('Error en la solicitud:', error); 
      error.json().then(err => { 
        console.error('Detalles del error:', err); 
      }); 
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../Assets/media/logos/LOGO_JYGASOFT_No_Back_1.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.loginContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Número de Nómina"
            style={styles.input}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Contraseña"
            style={styles.input}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>
        <View style={styles.linkContainer}>
          <Text style={styles.linkText}>¿Olvidó la contraseña?</Text>
        </View>
        <Button style={styles.submitButton}
          title="Continuar"
          onPress={submitForm}
        />
      </View>
    </View>
    // Error de login
    // <View style={styles.errorContainer}>
    // <Text style={styles.errorText}>Cuenta y/o contraseña incorrectos.</Text>
    // </View>
    // Indicador de carga 
    // <ActivityIndicator size="small" color="#0000ff" style={styles.loading} />
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imageContainer: {
    backgroundColor: '#1b84ff',
    padding: 0,              
    borderRadius: 10,  
    alignItems: 'center'
  },
  image: {
    width: 200,
    height: 200, 
    resizeMode: 'contain',
  },
  loginContainer: {
    marginTop: 200, 
    alignItems: 'center'
  },
  text: {
    fontSize: 18,
    color: '#000',
  },
  loginContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  linkContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  linkText: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  submitButton: {
    borderRadius: 10
  }
  // errorContainer: {
  //   marginBottom: 20,
  //   backgroundColor: '#f8d7da',
  //   padding: 10,
  //   borderRadius: 5,
  // },
  // errorText: {
  //   color: '#721c24',
  //   fontWeight: 'bold',
  // },
  // loading: {
  //   marginTop: 10,
  // },
});

export default LoginView;
