import React, { useEffect, useState } from 'react'
import Bodyy from '../../../../../layouts/TaskManager/status/Body/Body'
import styles from '../../../../../layouts/TaskManager/status/Body/style.module.scss'
import { Div } from '../../../../Divs/Div_Param'
import Flex from '../../../../Flex/flex'
import Footer from '../../../../../layouts/footer/footer'
import { useSelector } from 'react-redux'
import {useSubTasks} from '../../../../../functions/UseQuery/TaskQuery'
import { DragDropContext } from 'react-beautiful-dnd'
import Todo from '../../Todo/Todo'
import Progress from '../../Progress/Progress'
import Review from '../../Review/Review'
import Done from '../../Done/Done'
import { ChangeSubTaskIndes, ChangeSubTaskPosition, ChangeTaskIndes, ChangeTaskPosition } from '../../../../../api/Tasks'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const SubTasksManager=({TasId}) => {

    const { Tasks } = useSubTasks(TasId);
    const theDisplay = useState('SubTask')
    const [SubTaskTodoTable, setSubTaskTodoTable] = useState([]);
    const [SubTaskProgressTable, setSubTaskProgressTable] = useState([]);
    const [SubTaskDoneTable, setSubTaskDoneTable] = useState([]);
    const [SubTaskReviewTable, setSubTaskReviewTable] = useState([]);
    const [nbrSubTasksTodo, setNbrSubTasksTodo] = useState(0);
    const [nbrSubTasksProgg, setNbrSubTasksProgg] = useState(0);
    const [nbrSubTasksDone, setNbrSubTasksDone] = useState(0);
    const [nbrSubTasksRev, setNbrSubTasksRev] = useState(0);
  
    useEffect(() => {
      if (Tasks) {
        const todoTasks = Tasks.filter(task => task.collections === 'todo');
        const progressTasks = Tasks.filter(task => task.collections === 'progress');
        const doneTasks = Tasks.filter(task => task.collections === 'done');
        const reviewTasks = Tasks.filter(task => task.collections === 'review');
       
        setSubTaskTodoTable(todoTasks);
        setSubTaskProgressTable(progressTasks);
        setSubTaskDoneTable(doneTasks);
        setSubTaskReviewTable(reviewTasks);
  
        setNbrSubTasksTodo(todoTasks.length);
        setNbrSubTasksProgg(progressTasks.length);
        setNbrSubTasksDone(doneTasks.length);
        setNbrSubTasksRev(reviewTasks.length);
      }
    }, [Tasks]);
    const handleDragEnd = (result) => {
      if (!result.destination) {
        return;
      }
    
      const { source, destination } = result;
    
      // Get the task being dragged
      const draggedTask = getDraggedTask(source.droppableId, source.index);
      
      // Determine if the destination collection is the same as the source collection
      const isSameCollection = source.droppableId === destination.droppableId;
    
      // Smoothly transition the task
      if (isSameCollection) {
        // Moving within the same collection
        const sourceTable = getSourceTable(source.droppableId);
        const reorderedTable = Array.from(sourceTable);
        const [removed] = reorderedTable.splice(source.index, 1);
        reorderedTable.splice(destination.index, 0, removed);
        setTableState(source.droppableId, reorderedTable);
        updateTaskIndex(draggedTask._id,TasId,source.droppableId,destination.droppableId,source.index,destination.index)
  
        // Print source and destination locations
      } else {
        // Moving to a different collection
        // Get the destination table
        const destinationTable = getDestinationTable(destination.droppableId);
    
        // Remove task from source collection
        const sourceTable = getSourceTable(source.droppableId);
        const removedTask = sourceTable.splice(source.index, 1)[0];
        setTableState(source.droppableId, sourceTable);
        
    
    
        // Insert task into destination collection
        destinationTable.splice(destination.index, 0, removedTask);
        setTableState(destination.droppableId, destinationTable);
    
        // Print source and destination locations
        updateTaskCollection(draggedTask._id,destination.droppableId,destination.index)
        updateTaskIndex(draggedTask._id,TasId,source.droppableId,destination.droppableId,source.index,destination.index)
      }
    
      // Display toast message
      const destinationMessage = `${draggedTask.title} moved to ${destination.droppableId}`;
      toast.info(destinationMessage);
    };
          
    const getSourceTable = (droppableId) => {
      switch (droppableId) {
        case 'todo':
          return SubTaskTodoTable;
        case 'progress':
          return SubTaskProgressTable;
        case 'done':
          return SubTaskDoneTable;
        case 'review':
          return SubTaskReviewTable;
        default:
          return [];
      }
    };
    
    const getDraggedTask = (droppableId, index) => {
      const sourceTable = getSourceTable(droppableId);
  
      return sourceTable[index];
    };
    
    const getDestinationTable = (droppableId) => {
      switch (droppableId) {
        case 'todo':
          return SubTaskTodoTable;
        case 'progress':
          return SubTaskProgressTable;
        case 'done':
          return SubTaskDoneTable;
        case 'review':
          return SubTaskReviewTable;
        default:
          return [];
      }
    };
   
    
    // Define the following functions
    const setTableState = (droppableId, table) => {
      switch (droppableId) {
        case 'todo':
          setSubTaskTodoTable(table);
          setNbrSubTasksTodo(table.length);
          break;
        case 'progress':
          setSubTaskProgressTable(table);
          setNbrSubTasksProgg(table.length);
          break;
        case 'done':
          setSubTaskDoneTable(table);
          setNbrSubTasksDone(table.length);
          break;
        case 'review':
          setSubTaskReviewTable(table);
          setNbrSubTasksRev(table.length);
          break;
        default:
          break;
      }
    };
  
    const updateTaskCollection = (taskId, newCollection,position) => {
      // Implement updating the task collection here
      ChangeSubTaskPosition(taskId,newCollection,position)
    };
    const updateTaskIndex = (taskId,UserId, collectionSource, collectionDestination, sourceIndex, destinationIndex) => {
      // Implement updating the task collection here
      ChangeSubTaskIndes(taskId,UserId, collectionSource, collectionDestination, sourceIndex, destinationIndex)
    };
  
        return (
        <DragDropContext onDragEnd={handleDragEnd}>
        <Div height={"100%"} width={"100%"} className={styles.Main}>
          <Todo  typeDis={theDisplay} table={SubTaskTodoTable} setTable={setSubTaskTodoTable} />
          <Progress  typeDis={theDisplay} table={SubTaskProgressTable} setTable={setSubTaskProgressTable} />
          <Review  typeDis={theDisplay} table={SubTaskReviewTable} setTable={setSubTaskReviewTable}/>
          <Done  typeDis={theDisplay} table={SubTaskDoneTable} setTable={setSubTaskDoneTable}/>
        </Div>
      </DragDropContext>
      );
  };
  
  export default SubTasksManager;