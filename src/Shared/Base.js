export function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        //Check statusText functionality, message not showing
        const error = new Error(`HTTP Error ${response.statusText}`);
        error.status = response.statusText;
        error.response = response;
        console.log(error);
        throw error;
    }
}
// METODO FETCH created on Jan/14/25
export async function fetchFromAPI(URL, method, requestBody) {
  try {
    const response = await fetch(URL, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });
    checkStatus(response);
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      console.log("Datos procesados de la respuesta (JSON):", data);
      return data;
    } 
  } catch (error) {
    throw error;
  }
}

//Funcion get para volumenes de datos chicos created on Jan/14/25
export async function get(URL){
    try {
        const response = await fetch(URL,{
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        checkStatus(response);
        data = await response.json();
        return data;
    } catch (error) {
        throw error
    }
}


  
  