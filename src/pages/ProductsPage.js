/* eslint-disable */
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import initialShifts from './shiftsData';
import './style.css';
import ShiftsTable from 'src/components/shifts/ShiftsTable';
import Chat from 'src/components/chat/Chat';

export default function ProductsPage() {
  const [employees, setEmployees] = useState([]);
  const [shifts, setShifts] = useState(initialShifts);
  const [currentDraggedItem, setCurrentDraggedItem] = useState(null);

  const dayToDateMapping = {
    Mandag: '17/07/2023',
    Tirsdag: '18/07/2023',
    Onsdag: '19/07/2023',
    Torsdag: '20/07/2023',
    Fredag: '21/07/2023',
    Lørdag: '22/07/2023',
    Søndag: '23/07/2023',
  };

  useEffect(() => {
    const uniqueEmployees = Array.from(new Set(initialShifts.map((shift) => shift.employee)));
    setEmployees(uniqueEmployees);
  }, []);

  const onDragStart = (start) => {
    const draggableId = start.draggableId;
    console.log('draggableId', draggableId);
    const draggedShift = shifts.find((shift) => String(shift.id) === draggableId);
    setCurrentDraggedItem(draggedShift);
  };

  const onDragEnd = (result) => {
    setCurrentDraggedItem(null);
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    // Extract information from the destination
    const [destinationEmployee, destinationDay] = destination.droppableId.split('-');

    // Find the dragged shift based on the source index
    const [sourceEmployee, sourceDay] = source.droppableId.split('-');
    const filteredShifts = shifts.filter((shift) => shift.employee === sourceEmployee && shift.name === sourceDay);
    const draggedShift = filteredShifts[source.index];

    if (!draggedShift) {
      console.error('Dragged shift not found');
      return;
    }

    // Update the dragged shift's properties
    draggedShift.employee = destinationEmployee;
    draggedShift.name = destinationDay;
    draggedShift.date = dayToDateMapping[destinationDay];

    // Create a new array of shifts and update it
    const newShifts = shifts.filter((shift) => shift.id !== draggedShift.id);
    newShifts.push(draggedShift);
    setShifts(newShifts);
  };

  return (
    <Grid container>
      {/* Left Column (Chat) */}
      <Grid item xs={12} sm={4}>
        {' '}
        {/* On smaller screens, chat takes full width */}
        <Chat />
      </Grid>

      {/* Right Column (ShiftsTable) */}
      <Grid item xs={12} sm={8}>
        {' '}
        {/* On smaller screens, ShiftsTable takes full width */}
        <div className="table-responsive">
          <ShiftsTable
            shifts={shifts}
            employees={employees}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            currentDraggedItem={currentDraggedItem}
          />
        </div>
      </Grid>
    </Grid>
  );
}
