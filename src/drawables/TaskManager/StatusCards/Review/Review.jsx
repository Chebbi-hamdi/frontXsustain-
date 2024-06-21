import React, { useState, useRef } from "react";
import BorderContainer from "../../../containers/Border_Con_Basic";
import { Div } from "../../../Divs/Div_Param";
import styles from "./style.module.scss";
import todoBar from "../../../../assets/images/TaskManager/status/review.svg";
import Point from "../../../../assets/images/TaskManager/status/RedDot.svg";
import { P14 } from "../../../txt/Txt";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import PPCard from "../PreviewProjectCard/PPCard";
import gsap from "gsap";
import { useSelector } from "react-redux";
import { selectEdit } from "../../../../store/editSlice";

const Review = ({table3,typeDis}) => {
  

  const droppableRef = useRef(null);
  let cardRef = useRef();
  const edit = useSelector(selectEdit);

  const userData = useSelector((state) => state.token.user);


  const nbrTasks = table3?.length;

  return (
    <BorderContainer width={"25%"} height={"96%"} className={styles.maincard}>
      <Div className={styles.HeadReview}>
        <Div className={styles.HeadTodo1}>
          <img src={Point} alt="" className={styles.Point}></img>
          <P14 className={styles.txt}>Review</P14>
          <Div className={styles.notif}>
            <P14 className={styles.txtnotif}>{nbrTasks}</P14>
          </Div>
        </Div>

        <Div className={styles.BarDiv}>
          <img src={todoBar} className={styles.Bar} alt="" />
        </Div>
      </Div>
      <Droppable droppableId="review" type="task">
        {(provided, snapshot) => (
          <div
            className={styles.CorpsReview}
            ref={(el) => {
              provided.innerRef(el);
              droppableRef.current = el;
            }}
            {...provided.droppableProps}
          >
            {/* Render items from the table prop */}
            {table3?.map((tablee, index) => {
              const canDrag =  tablee.SubBy?.owner === userData._id ||
              tablee.participants
              ?.some(participant => participant.id._id === userData._id && participant.role === 'editeur');

              
              
              


              return(

               <Draggable
               draggableId={`review-${index}`}
               key={`review-${index}`}
               index={index}
               isDragDisabled={!canDrag} 

             >
               {(provided) => (
                 <div
                 ref={(el) => {
                  provided.innerRef(el);
                  droppableRef.current = el;
                  cardRef=el;
                }}

                   {...provided.draggableProps}
                   {...provided.dragHandleProps}
                   className={styles.center}
                   key={tablee.id}
                   index={tablee.id}
                 >
                    <PPCard
                      typeDis={typeDis}
                      edit={canDrag}

                      taskId={tablee._id}
                      taskTitle={tablee.title} // Pass the task ID as a prop
                                                
                      className={styles.CardTask}
                      teammateImages={tablee.teammateImages}
                      nbrFiles={tablee.imagePaths?.length}

                      txtDescription={tablee.description}
                      ImageTask={tablee?.coverPhoto}
                      Title={tablee.title}
                      type={tablee.type}
                      nbrComment={tablee.comments?.length}

                      Priority={tablee.priority}
                    />     
              </div>
                              )}
              </Draggable>
              )
            }
                
           )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </BorderContainer>
  );
};

export default Review;
