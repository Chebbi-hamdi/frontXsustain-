import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux'; 
import { useParams } from 'react-router-dom';
import { useMutationTaskCollection, useSendNotifMutationSocket} from '../../../../functions/UseMutation/useMutationTask';
import { useTeammateInfo } from '../../../../functions/UseQuery/TeamData';
import { setSelectedDroppableId, setSelectedTaskId, selectSelectedDroppableId, selectSelectedTaskId } from '../../../../store/selectedTaskSlice';
import { useTask } from '../../../../functions/UseQuery/TaskQuery';
import { ChangeTaskIndes } from '../../../../api/Tasks';
import { Div } from '../../../../drawables/Divs/Div_Param';
import styles from "./style.module.scss";
import Todo from '../../../../drawables/TaskManager/StatusCards/Todo/Todo';
import Progress from '../../../../drawables/TaskManager/StatusCards/Progress/Progress';
import Done from '../../../../drawables/TaskManager/StatusCards/Done/Done';
import Review from '../../../../drawables/TaskManager/StatusCards/Review/Review';
import { selectEdit } from '../../../../store/editSlice';
import LoaderSpin from '../../../../drawables/loader/LoaderSpin';

const Body = () => {
  let { id } = useParams();
  const theDisplay =useState('Task');
  const userData = useSelector(state => state.token.user);
  const { Task ,isLoading,refetch} = useTask(id);
  const [TodoTable, setTodoTable] = useState([]);
  const [ProgressTable, setProgressTable] = useState([]);
  const [DoneTable, setDoneTable] = useState([]);
  const [ReviewTable, setReviewTable] = useState([]);
  const [nbrTasksTodo, setNbrTasksTodo] = useState(0);
  const [nbrTasksProgg, setNbrTasksProgg] = useState(0);
  const [nbrTasksDone, setNbrTasksDone] = useState(0);
  const [nbrTasksRev, setNbrTasksRev] = useState(0);
  const [oneTask,setOneTask] = useState([])
  const dispatch = useDispatch();


  useEffect(()=>{
    if(Task && !isLoading)
      setOneTask(Task)
  },[Task])

  useEffect(()=>{
    setOneTask([])
    refetch()
  },[id])

  useEffect(() => {
    if (oneTask && Array.isArray(oneTask) && !isLoading) {
      const sortedTasks = oneTask.sort((a, b) => a.position - b.position);

      const todoTasks = sortedTasks.filter(task => task.collections === 'todo');
      const progressTasks = sortedTasks.filter(task => task.collections === 'progress');
      const doneTasks = sortedTasks.filter(task => task.collections === 'done');
      const reviewTasks = sortedTasks.filter(task => task.collections === 'review');

      setTodoTable(todoTasks);
      setProgressTable(progressTasks);
      setDoneTable(doneTasks);
      setReviewTable(reviewTasks);

      setNbrTasksTodo(todoTasks.length);
      setNbrTasksProgg(progressTasks.length);
      setNbrTasksDone(doneTasks.length);
      setNbrTasksRev(reviewTasks.length);
    } else {
      console.error('Task data is not available or not an array:', Task);
    } // Cleanup function to clear timeout
  }, [oneTask])  
  const UpdateCollection = useMutationTaskCollection(); 
  const SendNotifMutationTask = useSendNotifMutationSocket(); 
  
  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    
    const { source, destination } = result;
    const draggedTask = getDraggedTask(source.droppableId, source.index);
    const isSameCollection = source.droppableId === destination.droppableId;
    
    if (isSameCollection) {
      const sourceTable = getSourceTable(source.droppableId);
      const reorderedTable = Array.from(sourceTable);
      const [removed] = reorderedTable.splice(source.index, 1);
      reorderedTable.splice(destination.index, 0, removed);
      setTableState(source.droppableId, reorderedTable);
      updateTaskIndex(draggedTask._id,userData._id,source.droppableId,destination.droppableId,source.index,destination.index)
    } else {
      const destinationTable = getDestinationTable(destination.droppableId);
      const sourceTable = getSourceTable(source.droppableId);
      const removedTask = sourceTable.splice(source.index, 1)[0];
      setTableState(source.droppableId, sourceTable);
      destinationTable.splice(destination.index, 0, removedTask);
      setTableState(destination.droppableId, destinationTable);
      updateTaskCollection(draggedTask._id,destination.droppableId,destination.index)
      dispatch(setSelectedTaskId(draggedTask._id));
      dispatch(setSelectedDroppableId(destination.droppableId));
      updateTaskIndex(draggedTask._id,userData._id,source.droppableId,destination.droppableId,source.index,destination.index)
    }
  
    const destinationMessage = `${draggedTask.title} moved to ${destination.droppableId}`;
    toast.info(destinationMessage);
  };
  
  const getSourceTable = (droppableId) => {
    switch (droppableId) {
      case 'todo':
        return TodoTable;
        case 'progress':
        return ProgressTable;
        case 'done':
          return DoneTable;
          case 'review':
            return ReviewTable;
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
        return TodoTable;
        case 'progress':
          return ProgressTable;
          case 'done':
        return DoneTable;
        case 'review':
          return ReviewTable;
      default:
        return [];
      }
    };
    
    const setTableState = (droppableId, table) => {
      switch (droppableId) {
      case 'todo':
        setTodoTable(table);
        setNbrTasksTodo(table.length);
        break;
        case 'progress':
          setProgressTable(table);
          setNbrTasksProgg(table.length);
          break;
      case 'done':
        setDoneTable(table);
        setNbrTasksDone(table.length);
        break;
      case 'review':
        setReviewTable(table);
        setNbrTasksRev(table.length);
        break;
      default:
        break;
      }
    };
    
    const updateTaskCollection = (taskId, newCollection,position) => {
      UpdateCollection.mutate({taskId, newCollection,position},{
      onSuccess: () => {
        SendNotifMutationTask.mutate({sender:userData._id,receivers:Task[0].participants,taskId});
      }
    });
  };
  
  const updateTaskIndex = (taskId,UserId, collectionSource, collectionDestination, sourceIndex, destinationIndex) => {
    ChangeTaskIndes(taskId,UserId, collectionSource, collectionDestination, sourceIndex, destinationIndex)
  };
if (!Task){
  return <LoaderSpin />;}
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Div height={"100%"} width={"100%"} className={styles.Main} >
        <Todo typeDis={theDisplay}  table1={TodoTable} setTable={setTodoTable} />
        <Progress  typeDis={theDisplay} table2={ProgressTable} setTable={setProgressTable} />
        <Review  typeDis={theDisplay} table3={ReviewTable} setTable={setReviewTable}/>
        <Done  typeDis={theDisplay} table4={DoneTable} setTable={setDoneTable}/>
      </Div>
    </DragDropContext>
  );
};

export default Body;
