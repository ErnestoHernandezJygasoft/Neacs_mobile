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

//METODO PARA EL LOGIN created on Jan/14/25 (currently working)
export async function login(username, password, navigation) {
  try {
    const response = await fetchFromAPI('http://192.168.20.244:5000/api/Users', 'POST', { username, password });
    if (response) {
      navigation.navigate('Dashboard');
    } else {
      throw error;
    }
  } catch (error) {
    console.error(error);
  }
}
// METODO ANTERIOR PARA LOGIN created on Jan/10/25
// export function login(username, password, navigation){
//   fetch('http://192.168.20.244:5000/api/Users', {
//     method: 'POST',
//     headers: {
//       //  Accept: 'application/json',
//        'Content-Type': 'application/json',
//       },
//     body: JSON.stringify({ username, password }), 
//   })
//   .then(response =>{
//     try {
//       checkStatus(response);
//       if (response){
//         navigation.navigate('Dashboard');
//       }
//     } catch (error) {
//         Alert("Invalid credentials")
//     }
//   })
// }
