import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Label from '../label/Label';

const DraggableShift = ({ shift, index }) => {
  return (
    <Draggable key={shift.id} draggableId={String(shift.id)} index={index}>
      {(provided) => (
        <div
          style={{ minHeight: '50px', minWidth: '100px' }}
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <span className="margin-10px-top font-size14">
            <Label color="success">
              {shift.start} - {shift.end}
            </Label>
          </span>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableShift;
