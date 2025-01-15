const apiUrl = 'https://192.168.20.244:5000/api/Attendance';

const AttendanceService = {
  async getPagin(search) {
    const url = `${apiUrl}/GetAttendanceRecordsByIdSupervisor`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(search),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
  async getTotalAttendance(model) {
    const url = `${apiUrl}/GetTotalAttendance`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(model),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
};

export default AttendanceService;
