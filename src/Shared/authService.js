import { checkStatus } from "./Base";

export function validateAuth(username, password, setErrors) {
  let errors = {};
  let validityStatus = true;
  if (username.length > 6) {
    validityStatus = false;
    errors["username"] = "* Este campo no debe contener más de 6 caracteres";
  }
  if (username.length < 1){
    validityStatus = false;
    errors["username"] = "* Este campo no puede estar vacio"
  }
  if (!/^\d+$/.test(username)) { 
    validityStatus = false; 
    errors["username"] = "Este campo solo debe contener números"; 
  }
  if (password.length < 1){
    validityStatus = false;
    errors["password"] = "* Este campo no puede estar vacio"
  }
  setErrors(errors);
  return validityStatus;
}; 

export function login(username, password){
  console.log('Si entra el metodo login, usuario: ' + username + ', password: ' + password);
  fetch('http://192.168.20.244:44391/api/Users', { 
    method: 'POST', 
    headers: {
      //  Accept: 'application/json', 
       'Content-Type': 'application/json', 
      },
    body: JSON.stringify({ username, password }), }) 
  .then(response =>{
    checkStatus(response);
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
}