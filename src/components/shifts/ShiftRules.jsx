import React, { useState, useEffect } from 'react';
import {
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  Modal,
  Button,
  Stack,
  Box,
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Label from '../label';

const ShiftsRules = () => {
  const [newRule, setNewRule] = useState({
    startTime: '',
    endTime: '',
    minEmployees: 2, // Default value
  });
  // Initialize state variables
  const [openHours, setOpenHours] = useState({
    Mandag: { start: '', close: '', closed: false },
    Tirsdag: { start: '', close: '', closed: false },
    Onsdag: { start: '', close: '', closed: false },
    Torsdag: { start: '', close: '', closed: false },
    Fredag: { start: '', close: '', closed: false },
    Lørdag: { start: '', close: '', closed: false },
    Søndag: { start: '', close: '', closed: false },
  });

  const [rules, setRules] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');

  const formatTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const hours = dateTime.getHours().toString().padStart(2, '0');
    const minutes = dateTime.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // Add a useEffect to fetch rules and opening hours when the component mounts
  useEffect(() => {
    // Fetch rules and opening hours from your backend
    fetch('http://localhost:5000/rules', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Check if data contains rules and openHours
        if (data.rules && data.openHours) {
          // Set the rules and openHours in state
          setRules(data.rules);
          setOpenHours(data.openHours);
        }
      })
      .catch((error) => {
        // Handle any errors that occur during the fetch request
        console.error('Error fetching rules and opening hours:', error);
        // You can show an error message to the user if needed
      });
  }, []); // The empty dependency array ensures this effect runs only once on component mount

  // Function to handle changes in open hours input fields
  const handleOpenHoursChange = (day, field, value) => {
    setOpenHours((prevOpenHours) => ({
      ...prevOpenHours,
      [day]: {
        ...prevOpenHours[day],
        [field]: value,
      },
    }));
  };

  // Function to handle changes in store closed checkbox
  const handleClosedChange = (day) => {
    setOpenHours((prevOpenHours) => ({
      ...prevOpenHours,
      [day]: {
        ...prevOpenHours[day],
        closed: !prevOpenHours[day].closed,
      },
    }));
  };

  // Function to handle changes in new rule input fields
  const handleNewRuleChange = (field, value) => {
    setNewRule((prevNewRule) => ({
      ...prevNewRule,
      [field]: value,
    }));
  };

  // Function to add a new rule
  const addRule = () => {
    setRules((prevRules) => [
      ...prevRules,
      {
        day: selectedDay,
        ...newRule,
      },
    ]);
    handleCloseModal();
  };

  // Function to remove a rule
  const removeRule = (index) => {
    const updatedRules = [...rules];
    updatedRules.splice(index, 1);
    setRules(updatedRules);
  };

  // Function to handle opening the modal
  const handleOpenModal = (day) => {
    setSelectedDay(day);
    setModalOpen(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setSelectedDay('');
    setModalOpen(false);
  };

  // Function to handle changes in required employees input
  const handleRulesChange = (index, field, value) => {
    const updatedRules = [...rules];
    updatedRules[index][field] = value;
    setRules(updatedRules);
  };

  const saveRules = async () => {
    const dataToSend = {
      rules, // Assuming 'rules' holds your rules data
      openHours, // Assuming 'openHours' holds your opening hours data
    };

    fetch('http://localhost:5000/rules', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend
        console.log(data); // You can log the response for debugging
        // You can also show a success message to the user if needed
      })
      .catch((error) => {
        // Handle any errors that occur during the fetch request
        console.error('Error saving rules and opening hours:', error);
        // You can show an error message to the user if needed
      });
  };

  // Function to check if rules are met
  const areRulesMet = () => {
    // Implement your logic here to check if the rules are met
    // You can use the state and open hours data to perform this check
    // Return true if the condition is met, otherwise return false
  };
  return (
    <Card>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['TimePicker']}>
          <Box p={2}>
            <Typography variant="h5" sx={{ mb: 5 }}>
              Shifts Rules
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Day</TableCell>
                    <TableCell>Open Hours</TableCell>
                    <TableCell>Store Closed</TableCell>
                    <TableCell>Rules</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(openHours).map((day) => (
                    <TableRow key={day}>
                      <TableCell>{day}</TableCell>
                      <TableCell>
                        <TimePicker
                          label=""
                          sx={{ mr: 3 }}
                          placeholder=""
                          value={openHours[day].start}
                          onChange={(newValue) => handleOpenHoursChange(day, 'start', newValue)}
                        />
                        <TimePicker
                          type="time"
                          label=""
                          placeholder=""
                          value={openHours[day].close}
                          onChange={(newValue) => handleOpenHoursChange(day, 'close', newValue)}
                        />
                      </TableCell>
                      <TableCell>
                        <FormControlLabel
                          control={
                            <Checkbox checked={openHours[day].closed} onChange={() => handleClosedChange(day)} />
                          }
                          label="Closed"
                        />
                      </TableCell>
                      <TableCell>
                        <Stack spacing={1}>
                          {rules
                            .filter((rule) => rule.day === day) // Filter rules for the current day
                            .map((rule, index) => (
                              <div key={index}>
                                <Label color="info">
                                  {formatTime(rule.startTime)} - {formatTime(rule.endTime)}, Requires{' '}
                                  {rule.minEmployees} Employees
                                </Label>

                                <Button variant="outlined" sx={{ ml: 3 }} size="xs" onClick={() => removeRule(index)}>
                                  Remove Rule
                                </Button>
                              </div>
                            ))}
                          <Button variant="contained" onClick={() => handleOpenModal(day)}>
                            Add Rule
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box mt={2}>
              <Button variant="contained" color="primary" onClick={saveRules}>
                Save Rules
              </Button>
            </Box>
            <Typography variant="body1" mt={2}>
              {areRulesMet() ? 'Rules are met.' : 'Ensure that the specified rules are met.'}
            </Typography>
          </Box>

          {/* Modal for adding rules */}
          <Modal open={modalOpen} onClose={handleCloseModal}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography variant="h6">Add Rule for {selectedDay}</Typography>
              <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
                Specify the start and end time for the rule and the minimum number of employees required.
              </Typography>

              <TimePicker
                label="Start Time"
                fullWidth
                value={newRule.startTime}
                onChange={(newValue) => handleNewRuleChange('startTime', newValue)}
              />
              <TimePicker
                label="End Time"
                sx={{ ml: 2 }}
                fullWidth
                value={newRule.endTime}
                onChange={(newValue) => handleNewRuleChange('endTime', newValue)}
              />
              <TextField
                sx={{ mt: 2, mb: 2 }}
                type="number"
                label="Min Employees"
                fullWidth
                value={newRule.minEmployees}
                onChange={(e) => handleNewRuleChange('minEmployees', parseInt(e.target.value, 10))}
              />
              <Button variant="contained" sx={{ mr: 3 }} onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={addRule}>
                Save Rule
              </Button>
            </Box>
          </Modal>
        </DemoContainer>
      </LocalizationProvider>
    </Card>
  );
};

export default ShiftsRules;
