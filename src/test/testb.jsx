// ComponentB.js
import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd'; // Import Draggable and Droppable

function ComponentB() {
  return (
    <Droppable droppableId="droppable-2">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {/* Draggable elements within ComponentB */}
          <Draggable draggableId="draggable-item-3" index={0}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                  backgroundColor: 'lightgreen',
                  margin: '8px',
                  padding: '8px',
                  ...provided.draggableProps.style,
                }}
              >
                Draggable Item 3
              </div>
            )}
          </Draggable>
          <Draggable draggableId="draggable-item-4" index={1}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                  backgroundColor: 'lightgreen',
                  margin: '8px',
                  padding: '8px',
                  ...provided.draggableProps.style,
                }}
              >
                Draggable Item 4
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

export default ComponentB;
