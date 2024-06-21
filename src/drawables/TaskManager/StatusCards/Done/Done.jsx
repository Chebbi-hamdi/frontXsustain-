import React, {  useRef } from 'react';
import BorderContainer from '../../../containers/Border_Con_Basic'
import { Div } from '../../../Divs/Div_Param'
import styles from "./stye.module.scss"
import DoneBar from "../../../../assets/images/TaskManager/status/done.svg"
import Point from "../../../../assets/images/TaskManager/status/greenDot.svg"
import { P14 } from '../../../txt/Txt'
import {  Droppable, Draggable } from "react-beautiful-dnd";
import PPCard from '../PreviewProjectCard/PPCard'
import { useSelector } from 'react-redux';
import { checkAcess } from '../../../../functions/PopUpAccess/PopUpAcess';
import { notifyError } from '../../../containers/errorCont';

const Done = ({table4,typeDis}) => {
  const droppableRef = useRef(null);

  const userData = useSelector(state => state.token.user);

  function getStyle(style, snapshot) {
    if (!snapshot.isDragging) {
      return style; // If not dragging, return the original style
    }
    
    const { curve, duration } = snapshot.dragAnimating ? snapshot.dragAnimating : {};
    // If there's an animation during dragging, apply it
    if (curve && duration) {
      const { moveTo } = snapshot.dragAnimating;
      // move to the right spot
      const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`;
      // add a bit of turn for fun
      const rotate = 'rotate(0.01turn)';
    
      // patching the existing style
      return {
        ...style,
        transform: `${translate} ${rotate}`,
        // slowing down the drop because we can
        transition: `all ${curve} ${duration + 1}s`,
      };
    } else {
      return style; // No animation, return the original style
    }
  }
      
  
  const nbrTasks = table4?.length;

  return (
    <BorderContainer width={'25%'} height={'96%'} className={styles.maincard}>
        <Div className={styles.HeadTodo}>
          <Div className={styles.HeadTodo1}>
            <img src={Point} alt='' className={styles.Point}></img>
            <P14 className={styles.txt}>Done</P14>
            <Div className={styles.notif}>
            <P14 className={styles.txtnotif}>{nbrTasks}</P14>
            </Div>

          </Div>
          <Div className={styles.BarDiv}>
            <img src={DoneBar} className={styles.Bar} alt=''/>
          </Div>
        </Div>
<Droppable droppableId='done' type='task' >
        {(provided,snapshot) => (
          <div
            className={styles.CorpsTodo}
            ref={(el) => {
              provided.innerRef(el);
              droppableRef.current = el;
            }}
            {...provided.droppableProps}
          >
            {table4?.map((tablee, index) => {
              const canDrag =  tablee.SubBy?.owner === userData._id ||
              tablee.participants
              ?.some(participant => participant.id._id === userData._id && participant.role === 'editeur');
              
              return(
              <Draggable
                draggableId={`done-${index}`}
                key={`done-${index}`}
                index={index}          
                isDragDisabled={!canDrag} 

              >
                {(provided ,snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={styles.center}
                    key={index}
                    isDragging={snapshot.isDragging && !snapshot.isDropAnimating}
                    style={getStyle(provided.draggableProps.style, snapshot)}
                    index={index}
                                  >
                    <PPCard
                      typeDis={typeDis}
                      edit={canDrag}
                      taskId={tablee._id}
                      taskTitle={tablee.title} // Pass the task ID as a prop
                    
                      className={styles.CardTask}
                      teammateImages={tablee.teammateImages}
                      nbrComment={tablee.comments?.length}
                      nbrFiles={tablee.imagePaths?.length}
                      txtDescription={tablee.description}
                      ImageTask={tablee.coverPhoto}
                      Title={tablee.title}
                      Priority={tablee.priority}
                      type={tablee.type}

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
    )
}

export default Done
