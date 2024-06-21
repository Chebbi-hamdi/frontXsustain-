// App.js
import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd'; // Import DragDropContext
import ComponentA from './testa'; // Import ComponentA from its file
import ComponentB from './testb'; // Import ComponentB from its file

function Test() {
  const handleDragEnd = (result) => {
    // Retrieve information from the drag result
    const { destination, source, draggableId } = result;

    // If there's no destination or the item was dropped back to its original position, do nothing
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    // Perform any necessary actions based on the drag result
    // For example, you can reorder items in the list or update state
    // This is where you would handle the logic specific to your application
  };

  return (
    <div>
            <DragDropContext onDragEnd={handleDragEnd}>
        <ComponentA />
        <ComponentB />
    </DragDropContext>

    </div>
  );
}

export default Test;
