import { checkStatus } from "./Base";
import { fetchFromAPI } from "./Base";

const apiUrl = 'http://192.168.20.244:5000/api/Attendance/'
const AttendanceService = {
  //GetById created on Jan/23/25
  async getAttendanceById( page, setTotalPages, setData, setLoading, recordsPerPage, selectedDate, activeSesionId) {
    const url = `${apiUrl}GetAttendanceRecordsByIdSupervisor`;
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          options: {
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
            }
          },
          dateTimeSearch: selectedDate,
          id: activeSesionId
        })
      });
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
  },

  //GetTotalAttendance created on Jan/24/2025
  async getTotalAttendance(selectedDate, activeSesionId, setTotal, setPresent, setAbsent) {
    console.log("Iniciando la llamada a la API...");
    const url = `${apiUrl}GetTotalAttendance`;
    const dateTimeSearch = selectedDate.toISOString();
    const id = activeSesionId;
    try {
        const response = await fetchFromAPI(url, 'POST', { dateTimeSearch, id });
        console.log("Datos procesados de la respuesta (JSON):", response.result);
        if (response && response.result) {
          setTotal(response.result.total);
          setPresent(response.result.present);
          setAbsent(response.result.absent);
        } 
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
  }

};

export default AttendanceService;
