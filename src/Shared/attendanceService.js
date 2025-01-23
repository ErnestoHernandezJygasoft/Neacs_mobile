import { checkStatus } from "./Base";

const AttendanceService = {
  async getPagin(endpoint, page, setTotalPages, setData, setLoading, recordsPerPage, selectedDate, activeSesionId) {
    const url = `http://192.168.20.244:5000/api/Attendance/${endpoint}`;
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
  }
};

export default AttendanceService;
