// ComponentA.js
import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd'; // Import Draggable and Droppable

function ComponentA() {
  return (
    <Droppable droppableId="droppable-1">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {/* Draggable elements within ComponentA */}
          <Draggable draggableId="draggable-item-1" index={0}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                  backgroundColor: 'lightblue',
                  margin: '8px',
                  padding: '8px',
                  ...provided.draggableProps.style,
                }}
              >
                Draggable Item 1
              </div>
            )}
          </Draggable>
          <Draggable draggableId="draggable-item-2" index={1}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                  backgroundColor: 'lightblue',
                  margin: '8px',
                  padding: '8px',
                  ...provided.draggableProps.style,
                }}
              >
                Draggable Item 2
              </div>
            )}
          </Draggable>
          {/* End of draggable elements */}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default ComponentA;
