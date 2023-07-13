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

  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Vagtplan
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <Chat />
          </Stack>
        </Stack>
        <Grid container spacing={2}>
          {staff.map((employee) => (
            <Grid item xs={12} sm={6} md={4}>
              <div key={employee._id} className="card">
                <div className="card-body">
                  <h5 className="card-title">{employee.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{employee.role}</h6>
                  <p className="card-text">{employee.company}</p>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
