export function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        //Check statusText functionality, message not showing
        const statusText = response.statusText || 'Unknown error';
        const error = new Error(`HTTP Error ${statusText} (${response.status})`);
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
      // console.log("Base.js: Datos procesados de la respuesta (JSON) -->", data);
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

//METODO getPagin PARA DATATABLES 
  /* Para el proyecto de NEACS 'apiUrl' solo necesita api/entidad, no es necesario agregar '/getPagin'
     ej: http://localhost:5000/api/Entidad
  */
export async function getPagin(apiUrl, page, setTotalPages, setData, setLoading, recordsPerPage) {
  const url = `${apiUrl}/getPagin`;
  setLoading(true);
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        draw: 1, 
        columns: [ 
          { 
            data: 'string', 
            name: 'string', 
            searchable: true,
            orderable: true, 
            search: { 
              value: '', 
              regex: true, 
            }, 
          }, 
        ], 
        order: [ 
          { 
            column: 0, 
            dir: 'string', 
          }, 
        ], 
        start: (page - 1) * 10, 
        length: 10, 
        search: {
           value: '', 
           regex: true, 
        }, 
      }),
    });
    checkStatus(response);
    const result = await response.json();
    if (result.succeeded && result.result) {
      const { data, recordsTotal } = result.result;
      setData((prevData) => [...(prevData || []), ...(data || [])]);
      setTotalPages(Math.ceil(recordsTotal / recordsPerPage));
    } else {
      console.error('Error en la respuesta de la API:', result.errors);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}

  
  