export function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        const error = new Error(`HTTP Error ${response.statusText}`);
        error.status = response.statusText;
        error.response = response;
        console.log(error);
        throw error;
    }
}

export function parseJSON(response) {
    return response.json()
}

//NUEVO METODO FETCH In progress 13/Ene/25
export async function fetchFromAPI(URL, method, body){
    try {
        const response = await fetch(URL, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
        checkStatus(response);
        const data = await response.json();
        return ('Success', data);
    } catch (error) {
        console.error('Error en la solicitud:', error);
        error.json().then(err => {
            console.error('Detalles del error:', err);
        });
    }
}
