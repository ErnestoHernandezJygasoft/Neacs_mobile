import { checkStatus } from "./Base";
import { fetchFromAPI } from "./Base";

export function validateAuth(username, password, setErrors) {
  let errors = {};
  let validityStatus = true;
  if (username.length > 6) {
    validityStatus = false;
    errors["username"] = '* Este campo no debe contener más de 6 caracteres';
  }
  if (username.length < 1){
    validityStatus = false;
    errors["username"] = '* Este campo no puede estar vacio';
  }
  if (!/^\d+$/.test(username)) {
    validityStatus = false;
    errors["username"] = '*Este campo solo debe contener números';
  }
  if (password.length < 1){
    validityStatus = false;
    errors["password"] = '* Este campo no puede estar vacio';
  }
  setErrors(errors);
  return validityStatus;
};

//METODO NUEVO PARA EL LOGIN In Progress 13/Ene/25
// export function login(username, password, navigation){
//   console.log('Si entra el metodo login, usuario: ' + username + ', password: ' + password);
//   var status = fetchFromAPI('http://192.168.20.244:5000/api/Users', 'POST', {username, password});
//   //aqui no va a retornar un response porque la solicitud no se puede realizar a la API, hay que revisar CORS para resolver el problema
//   if (status.response === 'Success'){
//     navigation.navigate('home');
//   } else {
//     alert('Invalid credentials');
//   }
// }

// METODO ANTERIOR PARA LOGIN Currently Working 10/Ene/25
export function login(username, password, navigation){
  fetch('http://192.168.20.244:5000/api/Users', {
    method: 'POST',
    headers: {
      //  Accept: 'application/json',
       'Content-Type': 'application/json',
      },
    body: JSON.stringify({ username, password }), })
  .then(response =>{
    try {
      checkStatus(response);
      if (response){
        navigation.navigate('Home');
      }
    } catch (error) {
        Alert("Invalid credentials")
    }
  })
}
