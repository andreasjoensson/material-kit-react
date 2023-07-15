/* eslint-disable */
import { Container, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import './style.css';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chat from 'src/components/chat/Chat';

export default function ProductsPage() {
  const [staff, setStaffs] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/employees');
        setStaffs(response.data);
      } catch (error) {
        console.log('Failed to retrieve employees:', error);
        console.error('Failed to retrieve employees:', error.response.data);
      }
    };

    fetchEmployees();
  }, []);

  const shifts = [
    {
      id: 1,
      date: '17/07/2023',
      name: 'Mandag',
      start: '08:00',
      end: '16:00',
      employee: 'Kimberly Reyes',
      color: 'bg-sky',
    },
    {
      id: 2,
      name: 'Mandag',
      date: '17/07/2023',
      start: '8:00',
      end: '14:00',
      employee: 'Marianne Taylor',
      color: 'bg-yellow',
    },
    {
      id: 3,
      name: 'Mandag',
      date: '17/07/2023',
      start: '14:00',
      end: '17:30',
      employee: 'Sofie',
      color: 'bg-green',
    },
    {
      id: 4,
      name: 'Mandag',
      date: '17/07/2023',
      start: '15:00',
      end: '17:30',
      employee: 'Sussanne',
      color: 'bg-purple',
    },
    {
      id: 5,
      name: 'Tirsdag',
      date: '17/07/2023',
      start: '08:00',
      end: '16:00',
      employee: 'Kimberly Reyes',
      color: 'bg-sky',
    },
    {
      id: 6,
      name: 'Tirsdag',
      date: '18/07/2023',
      start: '8:00',
      end: '14:00',
      employee: 'Marianne Taylor',
      color: 'bg-yellow',
    },
    {
      id: 7,
      name: 'Tirsdag',
      date: '18/07/2023',
      start: '14:00',
      end: '17:30',
      employee: 'Sofie',
      color: 'bg-green',
    },
    {
      id: 8,
      name: 'Tirsdag',
      date: '18/07/2023',
      start: '15:00',
      end: '17:30',
      employee: 'Sussanne',
      color: 'bg-purple',
    },
    {
      id: 9,
      name: 'Onsdag',
      date: '19/07/2023',
      start: '08:00',
      end: '16:00',
      employee: 'Betina',
      color: 'bg-sky',
    },
    {
      id: 10,
      name: 'Onsdag',
      date: '19/07/2023',
      start: '8:00',
      end: '14:00',
      employee: 'Karen',
      color: 'bg-yellow',
    },
    {
      id: 11,
      name: 'Onsdag',
      date: '19/07/2023',
      start: '14:00',
      end: '17:30',
      employee: 'Sofie',
      color: 'bg-green',
    },
    {
      id: 12,
      name: 'Onsdag',
      date: '19/07/2023',
      start: '15:00',
      end: '17:30',
      employee: 'Sussanne',
      color: 'bg-purple',
    },
    {
      id: 13,
      name: 'Torsdag',
      date: '20/07/2023',
      start: '08:00',
      end: '16:00',
      employee: 'Kimberly Reyes',
      color: 'bg-sky',
    },
    {
      id: 14,
      name: 'Torsdag',
      date: '20/07/2023',
      start: '8:00',
      end: '14:00',
      employee: 'Marianne Taylor',
      color: 'bg-yellow',
    },
    {
      id: 15,
      name: 'Torsdag',
      date: '20/07/2023',
      start: '14:00',
      end: '17:30',
      employee: 'Sofie',
      color: 'bg-green',
    },
    {
      id: 16,
      name: 'Torsdag',
      date: '20/07/2023',
      start: '15:00',
      end: '17:30',
      employee: 'Sussanne',
      color: 'bg-purple',
    },
    {
      id: 17,
      name: 'Fredag',
      date: '21/07/2023',
      start: '08:00',
      end: '16:00',
      employee: 'Kimberly Reyes',
      color: 'bg-sky',
    },
    {
      id: 18,
      name: 'Fredag',
      date: '21/07/2023',
      start: '8:00',
      end: '14:00',
      employee: 'Marianne Taylor',
      color: 'bg-yellow',
    },
    {
      id: 19,
      name: 'Fredag',
      date: '21/07/2023',
      start: '14:00',
      end: '17:30',
      employee: 'Sofie',
      color: 'bg-green',
    },
    {
      id: 20,
      name: 'Fredag',
      date: '21/07/2023',
      start: '15:00',
      end: '17:30',
      employee: 'Sussanne',
      color: 'bg-purple',
    },
    {
      id: 21,
      name: 'Lørdag',
      date: '22/07/2023',
      start: '08:00',
      end: '16:00',
      employee: 'Kimberly Reyes',
      color: 'bg-sky',
    },
    {
      id: 22,
      name: 'Lørdag',
      date: '22/07/2023',
      start: '8:00',
      end: '14:00',
      employee: 'Marianne Taylor',
      color: 'bg-yellow',
    },
    {
      id: 23,
      name: 'Lørdag',
      date: '22/07/2023',
      start: '14:00',
      end: '17:30',
      employee: 'Sofie',
      color: 'bg-green',
    },
    {
      id: 24,
      name: 'Lørdag',
      date: '22/07/2023',
      start: '15:00',
      end: '17:30',
      employee: 'Sussanne',
      color: 'bg-purple',
    },
    {
      id: 25,
      name: 'Søndag',
      date: '23/07/2023',
      start: '08:00',
      end: '16:00',
      employee: 'Kimberly Reyes',
      color: 'bg-sky',
    },
    {
      id: 26,
      name: 'Søndag',
      date: '23/07/2023',
      start: '8:00',
      end: '14:00',
      employee: 'Marianne Taylor',
      color: 'bg-yellow',
    },
    {
      id: 27,
      name: 'Søndag',
      date: '23/07/2023',
      start: '14:00',
      end: '17:30',
      employee: 'Betina',
      color: 'bg-green',
    },
    {
      id: 28,
      name: 'Søndag',
      date: '23/07/2023',
      start: '15:00',
      end: '17:30',
      employee: 'Karen',
      color: 'bg-purple',
    },
  ];

  const employees = Array.from(new Set(shifts.map((shift) => shift.employee)));
  return (
    <>
      <Grid container>
        <Grid item xs={8}>
          <div className="table-responsive">
            <table className="table table-bordered text-center">
              <thead>
                <tr className="bg-light-gray">
                  <th className="text-uppercase">Employee</th>
                  <th className="text-uppercase">Mandag</th>
                  <th className="text-uppercase">Tirsdag</th>
                  <th className="text-uppercase">Onsdag</th>
                  <th className="text-uppercase">Torsdag</th>
                  <th className="text-uppercase">Fredag</th>
                  <th className="text-uppercase">Lørdag</th>
                  <th className="text-uppercase">Søndag</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr className="align-middle" key={employee}>
                    <td
                      className={`bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13`}
                    >
                      {employee}
                    </td>
                    {['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'].map((day) => (
                      <td key={day}>
                        {shifts
                          .filter((shift) => shift.employee === employee && shift.name === day)
                          .map((shift) => (
                            <div key={shift.id}>
                              <div className="margin-10px-top font-size14">
                                {shift.start} - {shift.end}
                              </div>
                              <div>{shift.date}</div>
                            </div>
                          ))}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Grid>
        <Grid item xs={4} style={{ position: 'fixed', right: 0, height: '100vh', overflowY: 'auto' }}>
          <Chat />
        </Grid>
      </Grid>
    </>
  );
}
