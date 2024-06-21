import React, {  useEffect, useRef } from 'react';
import BorderContainer from '../../../containers/Border_Con_Basic';
import { Div } from '../../../Divs/Div_Param';
import styles from "./style.module.scss";
import todoBar from "../../../../assets/images/TaskManager/status/todo.svg";
import Point from "../../../../assets/images/TaskManager/status/Point.svg";
import { P14 } from '../../../txt/Txt';
import AddTodo from "../../../../assets/images/TaskManager/status/AddTodo.svg";
import PPCard from '../PreviewProjectCard/PPCard';
import {  Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector } from 'react-redux';
import { selectEdit } from '../../../../store/editSlice';

const Todo = ({ table1,typeDis }) => {
  const droppableRef = useRef(null);
  const nbrTasks = table1?.length;
  useEffect(() => {
    
  }, [table1]);
  const userData = useSelector(state => state.token.user);

  return (
    <BorderContainer  width={'25%'} height={'96%'} className={styles.maincard} >
      <Div className={styles.HeadTodo}>
        <Div className={styles.HeadTodo1}>
          <img src={Point} alt='' className={styles.Point} />
          <P14 className={styles.txt}>To Do</P14>
          <Div className={styles.notif}>
            <P14 className={styles.txtnotif}>{nbrTasks}</P14>
          </Div>
          <Div className={styles.AddbutDiv}>
            <img src={AddTodo} alt='' className={styles.addTodo} />
          </Div>
        </Div>
        <Div className={styles.BarDiv}>
          <img src={todoBar} className={styles.Bar} alt='' />
        </Div>
      </Div>
      <Droppable droppableId='todo' type='task'>
        {(provided) => (
          <div
            className={styles.CorpsTodo}
            ref={(el) => {
              provided.innerRef(el);
              droppableRef.current = el;
            }}
            {...provided.droppableProps}
          >
            {table1?.map((tablee, index) => {
              const canDrag =  tablee?.SubBy?.owner === userData?._id ||
              tablee.participants
              ?.some(participant => participant.id._id === userData._id && participant.role === 'editeur');




              return(
              <Draggable
                draggableId={`todo-${index}`}
                key={`todo-${index}`}
                index={index}
                isDragDisabled={!canDrag} 

              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={styles.center}
                    key={index}
                    index={index}
                  >
                    <PPCard
                      edit={canDrag}
                      typeDis={typeDis}
                      taskId={tablee._id}
                      taskTitle={tablee.title} // Pass the task ID as a prop
                      className={styles.CardTask}
                      teammateImages={tablee.teammateImages}
                      nbrComment={tablee.comments?.length}
                      nbrFiles={tablee.imagePaths?.length}
                      txtDescription={tablee.description}
                      Title={tablee.title}
                      Priority={tablee.priority}
                      type={tablee.type}
                      ImageTask={tablee?.coverPhoto}
                    />                  
                    </div>
                )}
              </Draggable>

              )
})}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </BorderContainer>
  );
};

export default Todo;
