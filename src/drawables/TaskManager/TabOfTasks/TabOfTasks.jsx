import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "./style.module.scss";
import { Div } from "../../Divs/Div_Param";
import { P16 } from "../../txt/Txt";
import LigneTabTask from "./LigneTab/LigneTab";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { useTasks } from "../../../functions/UseQuery/TaskQuery";
import { updateIndexTaskManagerTable } from "../../../api/Tasks";
import { useParams } from "react-router-dom";
import {
  RestoreOriginalProjects,
  RestoreOriginalTasks,
  SetTasks,
  getTasks,
} from "../../../store/Project-Task-Slice";
import LoaderSpin from "../../loader/LoaderSpin";

function checkNotificationStatus(task, userId) {
    if (task.idOwner === userId) {
      return task.notif ? { Seen: task.notif.Seen, nature: "Owner" } : { Seen: undefined, nature: "Owner" };
    } else {
      const participant = task.participants.find(
        (participant) => participant.id === userId
      );
      if (participant) {
        return { Seen: participant.notification ? participant.notification : undefined, nature: "Participant" };
      }
    }
    return false;
  }

const TabOfTasks = () => {
  const dispatch = useDispatch();
  const ProjectId = useParams();
  const userData = useSelector((state) => state.token.user);
  const { Tasks, isLoading } = useTasks(userData._id);
  const [table, setTable] = useState([]);
  const droppableRef = useRef(null);
  console.log("=================", Tasks);
  useEffect(() => {
    if (Tasks) {
      dispatch(SetTasks(Tasks));
      dispatch(RestoreOriginalTasks(Tasks));
    }
  }, [Tasks, dispatch]);

  const tasks = useSelector(getTasks);

  console.log("tasks", tasks);

  useEffect(() => {
    if (Array.isArray(tasks)) {
      let filteredTasks = tasks;
      if (ProjectId && ProjectId.idProject) {
        filteredTasks = filteredTasks.filter(
          (task) => task.projectId === ProjectId.idProject
        );
      }
      const sortedTasks = [...filteredTasks].sort(
        (a, b) => a.indexTaskManage - b.indexTaskManage
      );
      const enhancedTasks = sortedTasks.map((task) => ({
        ...task,
        isChecked: false,
        uiStatus: task.TaskManagerStatus,
        Designer: "Xsustain.",
        SubBy: task.SubmitterName,
        index: task.indexTaskManage,
        photo: task.coverPhoto,
        ownerImg: task.ownerImg,
        ReqType: task.ReqType,
        projectId: task.projectId,
      }));
      setTable(enhancedTasks);
    } else {
      console.error("Tasks is not an array:", tasks);
    }
  }, [ProjectId, tasks]);

  const toggleCheckbox = useCallback(
    (index) => {
      const updatedTable = [...table];
      updatedTable[index].isChecked = !updatedTable[index].isChecked;
      setTable(updatedTable);
    },
    [table]
  );

  const handleDragEnd = async (result) => {
    if (!result.destination) {
      return;
    }

    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    if (startIndex === endIndex) {
      return;
    }

    try {
      const reorderedTable = [...table];
      const [removed] = reorderedTable.splice(startIndex, 1);
      reorderedTable.splice(endIndex, 0, removed);
      setTable(reorderedTable);
      await updateIndexTaskManagerTable(removed._id, endIndex);
    } catch (error) {
      console.error("Error updating task index:", error);
    }
  };

  const handleDragOver = (e) => {
    const targetRect = droppableRef.current.getBoundingClientRect();
    const offsetY = e.clientY - targetRect.top;
    const scrollZoneHeight = 10;

    if (offsetY < scrollZoneHeight) {
      window.scrollBy({ top: -5, behavior: "smooth" });
    } else if (offsetY > targetRect.height - scrollZoneHeight) {
      window.scrollBy({ top: 5, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return <LoaderSpin />;  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Div className={styles.leFlexTab}>
        <Div className={styles.HeadTab} height={"15%"} width={"100%"}>
          <Div className={styles.HeadTabCont}>
            <Div className={styles.CenterContainer} height={"40%"}>
              <P16 className={styles.Ptxt}>Item</P16>
            </Div>
            <Div className={styles.CenterContainer} height={"40%"}>
              <P16 className={styles.Ptxt}>Status</P16>
            </Div>
            <Div className={styles.CenterContainer} height={"40%"}>
              <P16 className={styles.Ptxt}>Request Type</P16>
            </Div>
            <Div className={styles.CenterContainer} height={"40%"}>
              <P16 className={styles.Ptxt}>Designer</P16>
            </Div>
            <Div className={styles.SubBY} height={"40%"}>
              <P16 className={styles.Ptxt}>Submitted by</P16>
            </Div>
          </Div>
        </Div>
        <Droppable droppableId="ROOT" type="group">
          {(provided, snapshot) => (
            <div
              ref={(el) => {
                provided.innerRef(el);
                droppableRef.current = el;
              }}
              {...provided.droppableProps}
              className={styles.BodyTab}
              height={"85%"}
              width={"100%"}
              onDragOver={handleDragOver}
            >
              {table.map((task, index) => {
                const canDrag =
                  task.idOwner === userData._id ||
                  task.participants.some(
                    (participant) =>
                      participant.id === userData._id &&
                      participant.role === "editeur"
                  );
                return (
                  <Draggable
                    draggableId={`task-${task._id}`}
                    key={task._id}
                    index={index}
                    isDragDisabled={!canDrag}
                  >
                    {(provided, snapshot) => (
                      <LigneTabTask
                        className={`${styles.draggableitem} ${
                          snapshot.isDragging ? styles.dragging : ""
                        }`}
                        rff={provided.innerRef}
                        Ar={provided.draggableProps}
                        Br={provided.dragHandleProps}
                        itemText={task.title}
                        statusText={task.uiStatus}
                        reqText={task.ReqType}
                        designerText={"Xsustain."}
                        subText={task.SubBy}
                        isChecked={task.isChecked}
                        onCheckboxChange={() => toggleCheckbox(index)}
                        textContent={task.TaskManagerStatus}
                        id={task._id}
                        coverPhoto={task.photo}
                        edit={canDrag}
                        ownerImg={task.ownerImg}
                        notif={checkNotificationStatus(task, userData._id)}
                      />
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Div>
    </DragDropContext>
  );
};

export default TabOfTasks;
