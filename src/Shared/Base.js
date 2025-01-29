export function checkStatus(response, data) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let errorMessage = `HTTP Error ${response.status} (${response.statusText})`;

    if (data && Array.isArray(data.Errors) && data.Errors.length > 0) {
      errorMessage = data.Errors.join(", "); // ✅ Extraemos correctamente el error
    }

    const error = new Error(errorMessage);
    error.status = response.status;
    error.response = response;
    console.error(error);
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
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      checkStatus(response, data);
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

//Busqueda para employees y users created on Jan/28/2025
export async function paginSearch(apiUrl, parameter, searchValue, page, setTotalPages, setFilteredData, setLoading, recordsPerPage) {
  // console.log('Realizando solicitud de busqueda');
  // console.log({apiUrl, parameter, searchValue});
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
            data: parameter,
            name: parameter,
            searchable: true,
            orderable: true,
            search: {
              value: "",
              regex: true
            }
          }
        ],
        order: [
          {
            column: 0,
            dir: parameter
          }
        ],
        start: (page - 1) * recordsPerPage, 
        length: 6,
        search: {
          value: searchValue,
          regex: true
        }
      }),
    });
    checkStatus(response);
    const result = await response.json();
    if (result.succeeded && result.result) {
      const { data, recordsTotal } = result.result;
      setFilteredData(data || []);
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
  
  