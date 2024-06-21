import React, { useRef } from 'react';
import BorderContainer from '../../../containers/Border_Con_Basic';
import { Div } from '../../../Divs/Div_Param';
import styles from "./style.module.scss";
import todoBar from "../../../../assets/images/TaskManager/status/progress.svg";
import Point from "../../../../assets/images/TaskManager/status/BlueDot.svg";
import { P14 } from '../../../txt/Txt';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import PPCard from '../PreviewProjectCard/PPCard';
import { selectEdit } from '../../../../store/editSlice';
import { useSelector } from 'react-redux';

function Progress({ table2,typeDis }) {
  const droppableRef = useRef(null);
  const nbrTasks = table2?.length;
  const edit = useSelector(selectEdit);
  const userData = useSelector(state => state.token.user);

  return (
    <BorderContainer width={'25%'} height={'96%'} className={styles.maincard}>
      <Div className={styles.HeadTodo}>
        <Div className={styles.HeadTodo1}>
          <img src={Point} alt='' className={styles.Point} />
          <P14 className={styles.txt}>On Progress</P14>
          <Div className={styles.notif}>
              <P14 className={styles.txtnotif}>{nbrTasks}</P14>
          </Div>
        </Div>
        <Div className={styles.BarDiv}>
          <img src={todoBar} className={styles.Bar} alt='' />
        </Div>
      </Div>
      <Droppable droppableId='progress' type='task'>
        {(provided, snapshot) => (
          <div               className={styles.CorpsTodo} 

            ref={(el) => {
              provided.innerRef(el);
              droppableRef.current = el;
            }}
            {...provided.droppableProps}
          >
            {/* Render items from the table prop */}
            {table2?.map((item, index) => {
                            const canDrag =  item.SubBy?.owner === userData._id ||
                            item.participants
                           ?.some(participant => participant.id._id === userData._id && participant.role === 'editeur');
               
              
              
              
              
                           return (

               <Draggable
               draggableId={`progg-${index}`}
               key={`progg-${index}`}
               index={index}
               isDragDisabled={!canDrag} 

             >
               {(provided) => (
                 <div
                   ref={provided.innerRef}
                   {...provided.draggableProps}
                   {...provided.dragHandleProps}
                   className={styles.center}
                   key={item.id}
                   index={item.id}
                 >
                      <PPCard
                      edit={canDrag}

                      typeDis={typeDis}
                      taskId={item._id}
                      taskTitle={item.title} // Pass the task ID as a prop
                      className={styles.CardTask}
                      teammateImages={item.teammateImages}
                      nbrComment={item.comments?.length}
                      nbrFiles={item.imagePaths?.length}
                      txtDescription={item.description}
                      ImageTask={item.coverPhoto}
                      Title={item.title}
                      Priority={item.priority}
                      type={item.type}

                    />                 
                  </div>
                )}
              </Draggable>
                
            )})}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </BorderContainer>
  );
};

export default Progress;
