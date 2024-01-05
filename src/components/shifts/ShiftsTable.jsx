import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import DraggableShift from './DraggableShift'; // Import the DraggableShift component
import Label from '../label/Label';

const ShiftsTable = ({ employees, shifts, onDragEnd, currentDraggedItem }) => {
  const dayToDateMapping = {
    Mandag: '17/07/2023',
    Tirsdag: '18/07/2023',
    Onsdag: '19/07/2023',
    Torsdag: '20/07/2023',
    Fredag: '21/07/2023',
    Lørdag: '22/07/2023',
    Søndag: '23/07/2023',
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="table-responsive">
        <table className="table table-bordered text-center">
          <thead>
            <tr className="bg-light-gray">
              {/* Table Headers */}
              <th className="text-uppercase">Employee</th>
              {Object.keys(dayToDateMapping).map((day) => (
                <th key={day} className="text-uppercase">
                  {day} <br /> {dayToDateMapping[day]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee}>
                <td>{employee}</td>
                {Object.keys(dayToDateMapping).map((day) => (
                  <td key={day}>
                    <Droppable droppableId={`${employee}-${day}`} style={{ minHeight: '50px', minWidth: '100px' }}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={snapshot.isDraggingOver ? 'droppable-active' : ''} // Apply a CSS class when dragging over
                        >
                          {shifts
                            .filter(
                              (shift) =>
                                shift.name === day &&
                                shift.date === dayToDateMapping[day] &&
                                shift.employee === employee
                            )
                            .map((shift, shiftIndex) => (
                              <DraggableShift key={shift.id} shift={shift} index={shiftIndex} />
                            ))}
                          {shifts.filter(
                            (shift) =>
                              shift.name === day && shift.date === dayToDateMapping[day] && shift.employee === employee
                          ).length === 0 && (
                            <div className="empty-shift-placeholder" data-placeholder="true">
                              <Label color="info">No shift</Label>
                              {provided.placeholder}
                            </div>
                          )}
                        </div>
                      )}
                    </Droppable>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DragDropContext>
  );
};

export default ShiftsTable;
