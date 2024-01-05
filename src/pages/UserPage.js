/* eslint-disable */

import { Helmet } from 'react-helmet-async';
import { filter, set } from 'lodash';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
// mock
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  InputLabel,
  Select,
  TableCell,
  Box,
  Container,
  Typography,
  IconButton,
  TableContainer,
  Modal,
  TablePagination,
  FormControl,
  FormLabel,
  TextField,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import axios from 'axios';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import { UserListHead, UserListToolbar } from 'src/sections/@dashboard/user';
// sections

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'tid', label: 'Tid', alignRight: false },
  { id: 'ferie', label: 'Ferie', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const marginTop = {
  marginTop: '20px',
};

export default function UserPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [open, setOpen] = useState(false);

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');
  const [hasFerie, setHasFerie] = useState(false);

  const [fuldtid, setFuldtid] = useState(false);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [ferie, setFerie] = useState([dayjs('2022-04-17'), dayjs('2022-04-21')]);
  const [isVerified, setIsVerified] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');

  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const [location, setLocation] = useState('HM - København');
  const [timer, setTimer] = useState(0);

  const [employees, setEmployees] = useState([
    {
      id: 'a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0',
      avatarUrl: '/assets/images/avatars/avatar_1.jpg',
      name: 'Marianne Jensen',
      company: 'HM - København',
      isVerified: true,
      ferie: {
        startDate: '2023-07-10',
        endDate: '2023-07-15',
      },
      role: 'Salgsmedarbejder',
    },
    {
      id: 'b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1',
      avatarUrl: '/assets/images/avatars/avatar_2.jpg',
      name: 'Pernille Vermund',
      company: 'HM - København',
      isVerified: false,
      status: 'Nej',
      ferie: null,
      role: 'Salgsleder',
    },
    {
      id: 'c2c2c2c2-c2c2-c2c2-c2c2-c2c2c2c2c2c2',
      avatarUrl: '/assets/images/avatars/avatar_3.jpg',
      name: 'Lotte Olsen',
      company: 'HM - København',
      isVerified: true,
      status: 'Ja',
      ferie: {
        startDate: '2023-07-20',
        endDate: '2023-07-25',
      },
      role: 'Salgsmedarbejder',
    },
    {
      id: 'd3d3d3d3-d3d3-d3d3-d3d3-d3d3d3d3d3d3',
      avatarUrl: '/assets/images/avatars/avatar_4.jpg',
      name: 'Christian Larsen',
      company: 'HM - København',
      isVerified: false,
      status: 'Nej',
      ferie: null,
      role: 'Salgsmedarbejder',
    },
    {
      id: 'e4e4e4e4-e4e4-e4e4-e4e4-e4e4e4e4e4e4',
      avatarUrl: '/assets/images/avatars/avatar_5.jpg',
      name: 'Martin Jensen',
      company: 'HM - København',
      isVerified: true,
      status: 'Nej',
      ferie: null,
      role: 'Salgsmedarbejder',
    },
  ]);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const createEmployee = async () => {
    try {
      const response = await axios.post('http://localhost:5000/employee', {
        name,
        company: location,
        role,
        status: fuldtid ? 'Fuldtid' : 'Deltid',
        time: !fuldtid && timer > 0 ? timer : null,
        ferie: hasFerie ? ferie : null,
        avatarUrl,
      });

      setEmployees([...employees, response.data]);

      console.log('Employee created:', response.data);
    } catch (error) {
      console.error('Failed to create employee:', error.response.data);
    }
  };

  const deleteEmployee = async (employeeId) => {
    try {
      await axios.delete(`/employee/${employeeId}`);
      // Filter the deleted employee from the list
      const updatedEmployees = employees.filter((employee) => employee.id !== employeeId);
      // Update the employee list state with the updated array
      setEmployees(updatedEmployees);
    } catch (error) {
      console.error('Failed to delete employee:', error);
      // Handle error
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/employees');
        const newEmployees = response.data.map((employee, i) => ({
          ...employee,
          id: i,
        }));

        console.log('newEmployees:', newEmployees);

        setEmployees(newEmployees);
      } catch (error) {
        console.log('Failed to retrieve employees:', error);
        console.error('Failed to retrieve employees:', error.response.data);
      }
    };

    fetchEmployees();
  }, []);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = employees.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - employees.length) : 0;

  const filteredUsers = applySortFilter(employees, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  const setToDeltid = () => {
    setFuldtid(false);
  };

  const setToFultid = () => {
    setFuldtid(true);
  };

  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Medarbejdere
          </Typography>
          <Button onClick={handleOpen} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Ny medarbejder
          </Button>
        </Stack>

        <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <FormControl>
              <FormLabel>Indtast et navn</FormLabel>
              <TextField
                id="outlined-basic"
                onChange={(e) => setName(e.target.value)}
                value={name}
                label="Navn"
                variant="outlined"
              />

              <FormControl mb={3} sx={marginTop} fullWidth>
                <InputLabel id="demo-simple-select-label">Lokation</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={location}
                  label="Lokation"
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <MenuItem value={'HM - Århus'}>HM - Århus</MenuItem>
                  <MenuItem value={'HM - København'}>HM - København</MenuItem>
                  <MenuItem value={'HM - Randers'}>HM - Randers</MenuItem>
                </Select>
              </FormControl>

              <FormLabel sx={{ mt: 3 }}>Er du fuldtid eller deltid?</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox onChange={() => setToFultid()} value={fuldtid} />}
                  label="Fuldtid"
                />
                <FormControlLabel
                  control={<Checkbox onChange={() => setToDeltid()} value={fuldtid} />}
                  label="Deltid"
                />
              </FormGroup>

              {!fuldtid ? (
                <div sx={{ mt: 3 }}>
                  <FormLabel>Indtast timer om ugen</FormLabel>
                  <TextField
                    sx={{ mt: 2 }}
                    id="outlined-basic"
                    value={timer}
                    onChange={(e) => setTimer(e.target.value)}
                    label="Timer"
                    variant="outlined"
                  />
                </div>
              ) : null}

              <FormLabel sx={{ mt: 3 }}>Indtast stilling</FormLabel>
              <TextField
                id="outlined-basic"
                onChange={(e) => setRole(e.target.value)}
                label="Stilling"
                variant="outlined"
              />

              <FormLabel sx={{ mt: 3 }}>Er på ferie?</FormLabel>

              <FormGroup>
                <FormControlLabel
                  control={<Checkbox onChange={() => setHasFerie(true)} value={hasFerie} />}
                  label="Ja"
                />
                <FormControlLabel
                  control={<Checkbox onChange={() => setHasFerie(false)} value={hasFerie} />}
                  label="Nej"
                />
              </FormGroup>

              {hasFerie == true ? (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DateRangePicker']}>
                    <DateRangePicker
                      value={ferie}
                      onChange={(newValue) => setFerie(newValue)}
                      localeText={{ start: 'Check-in', end: 'Check-out' }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              ) : null}

              <Button onClick={createEmployee}>Opret medarbejder</Button>
            </FormControl>
          </Box>
        </Modal>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={employees.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, role, ferie, status, company, avatarUrl, deltidsTimer } = row;
                    const selectedUser = selected.indexOf(name) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={avatarUrl} />
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{company}</TableCell>

                        <TableCell align="left">{role}</TableCell>

                        <TableCell align="left">
                          <p>{status}</p>
                          <span>
                            {status == 'Deltid' ? (
                              <div>
                                <Label color="error">{deltidsTimer} timer</Label>
                              </div>
                            ) : (
                              <div>
                                <Label color="success">37 timer</Label>
                              </div>
                            )}
                          </span>
                        </TableCell>

                        <TableCell align="left">
                          {ferie ? (
                            <div>
                              <Label color="error">
                                {dayjs(ferie.startDate).format('DD/MM/YYYY')} -{' '}
                                {dayjs(ferie.endDate).format('DD/MM/YYYY')}
                              </Label>
                            </div>
                          ) : (
                            <Label color="success">Nej</Label>
                          )}
                        </TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={employees.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
