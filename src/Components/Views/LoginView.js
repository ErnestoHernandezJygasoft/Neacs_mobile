import React, {useState} from 'react';
import {  View, Text, StyleSheet, TextInput, Button, ActivityIndicator, Image } from 'react-native';
import { validateAuth, login } from '../../Shared/authService';
import { useSession } from '../../Shared/sessionContextDTO';

const LoginView = ({ navigation }) => {
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { setSession } = useSession(); 
  
  const submitForm = async () => {
    if(validateAuth(username, password, setErrors)){
      setSession(username);
      login(username, password, navigation)
    } 
    
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
            keyboardType = 'numeric'
            onChangeText={setUsername}
            autoCapitalize="none"
          />
          {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Contraseña"
            style={styles.input}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
        </View>
        <View style={styles.linkContainer}>
          <Text style={styles.linkText}>¿Olvidó la contraseña?</Text>
        </View>
        <Button
          title="Continuar"
          onPress={submitForm}
        />
      </View>
    </View>
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
  errorText: {
    color: 'red',
    fontWeight: 'bold',
  },
  // loading: {
  //   marginTop: 10,
  // },
});

export default LoginView;
