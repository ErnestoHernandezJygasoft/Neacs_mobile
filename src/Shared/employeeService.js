const apiUrl = 'http://192.168.20.244:5000/api/Employee';

const EmployeeService = {
  //Metodo de paginado created on Jan/22/25
  async getPagin(page, setTotalPages, setData, setLoading, recordsPerPage) {
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
      if (!response.ok) { throw new Error('Network response was not ok'); }
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


export default EmployeeService;
