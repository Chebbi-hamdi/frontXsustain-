import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './style.module.scss';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useSelector } from 'react-redux'; 
import LigneProject from './LIgneProject/LigneProject';
import { updateIndexTaskManagerTable } from '../../api/Tasks';
import { Div } from '../Divs/Div_Param';
import { P16 } from '../txt/Txt';
import arrowDown from '../../assets/images/arrowdown.svg';
import { useProject } from '../../functions/UseQuery/ProjectQuery';
import ArrowY from '../../assets/images/ArrowUp.svg';
import gsap from 'gsap';
import LigneTaskInProject from './LIgneProject/LigneTaskInProject/LigneTaskInProject';
import { updateIndexTaskManagerTableProject } from '../../api/project';
import Flex from '../Flex/flex';
import { RestoreOriginalProjects, SetProjects, getProjects } from '../../store/Project-Task-Slice';
import { useDispatch } from 'react-redux';
import LoaderSpin from '../loader/LoaderSpin';

const ProjectManagerDraw = () => {
    const userData = useSelector(state => state.token.user);
    const { Projects, isLoading } = useProject(userData._id);
    const dispatch = useDispatch()


    const [table, setTable] = useState([]);
    const droppableRef = useRef(null);
    const [isTaskVisible, setIsTaskVisible] = useState({});
    console.log('#############', Projects);

    const statusToTextColor = {
        'Unassigned': '#ffffff',
        'In progress': '#ffffff',
        'Done': '#000000',
    };

    const statusToTextContent = {
        'Unassigned': 'Unassigned',
        'In progress': 'In progress',
        'Done': 'Done'
    };
    useEffect(() => {
        if (Projects) {
            dispatch(SetProjects(Projects));
            dispatch(RestoreOriginalProjects(Projects));

        }
    }, [Projects, dispatch]);
      const projects = useSelector(getProjects);
  console.log('#############0000000', projects);

  useEffect(() => {
    if (Array.isArray(projects)) {
        // Create a copy of the array before sorting
        const sortedTasks = [...projects].sort((a, b) => a.indexTaskManage - b.indexTaskManage);

        const enhancedProjects = sortedTasks.map(project => ({
            ...project,
            imagePath: project.imagePath,
            isChecked: false,
            backgroundColor: statusToBackgroundColor[project.TaskManagerStatus] || '#ffffff',
            textColor: statusToTextColor[project.TaskManagerStatus] || '#000000',
            textContent: statusToTextContent[project.TaskManagerStatus] || 'Start Task',
            Designer: 'Xsustain.',
            SubBy: project.owner.name,
            index: '0',
            ReqType: 'reqType',
            imgOwner: project.owner.imagePath,
            StatusProjectManager: project.StatusProjectManager,
            tasks: project?.tasks?.map(task => ({
                itemTextT: task?.title,
                statusTextT: task?.TaskManagerStatus,
                textContentT: task?.TaskManagerStatus,
                subTextT: task?.SubBy?.owner?.name||task?.SubBy?.owner?.title,
                designerTextT: 'Xsustain.',
                reqTextT: task?.TaskType?.title,
                id: task?._id,
                imagePath: task?.coverPhoto,
                imageSub: task?.SubBy?.owner?.imagePath
            })),
        }));

        setTable(enhancedProjects);
    } else {
        console.error("Projects is not an array:", projects);
    }
}, [projects]);
    console.log('"""""""""""""""""', table);

    const toggleCheckbox = useCallback((index) => {
        const updatedTable = [...table];
        updatedTable[index].isChecked = !updatedTable[index].isChecked;
        setTable(updatedTable);
    }, [table]);

    useEffect(() => {
        console.log(isTaskVisible);
    }, [isTaskVisible]);

    const statusToBackgroundColor = {
        'Unassigned': '#C2C2C2',
        'In progress': '#2468FF',
        'Done': '#3FE8BE',
    };

    const changeStatus = useCallback((index) => {
        const updatedTable = [...table];
        const currentStatus = updatedTable[index].uiStatus;
        const nextStatus = currentStatus === 'Unassigned' ? 'In progress' :
            currentStatus === 'In progress' ? 'Done' : 'Unassigned';
        updatedTable[index].uiStatus = nextStatus;
        updatedTable[index].backgroundColor = statusToBackgroundColor[nextStatus];
        updatedTable[index].textColor = statusToTextColor[nextStatus];
        updatedTable[index].TaskManagerStatus = statusToTextContent[nextStatus];
        setTable(updatedTable);
    }, [table]);

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
            console.log('____________________________------', removed._id, endIndex)
            await updateIndexTaskManagerTableProject(removed._id, endIndex);
        } catch (error) {
            console.error('Error updating task index:', error);
        }
    };

    const handleExpand = (projectId) => {
        setIsTaskVisible(prevState => ({
            ...prevState,
            [projectId]: !prevState[projectId]
        }));
    };

    const handleDragOver = (e) => {
        const targetRect = droppableRef.current.getBoundingClientRect();
        const offsetY = e.clientY - targetRect.top;
        const scrollZoneHeight = 10;

        if (offsetY < scrollZoneHeight) {
            window.scrollBy({ top: -5, behavior: 'smooth' });
        } else if (offsetY > targetRect.height - scrollZoneHeight) {
            window.scrollBy({ top: 5, behavior: 'smooth' });
        }
    };

    if (isLoading) {
        return <LoaderSpin />;
    }
    const handleDragStart = (result) => {
        const projectId = table[result.source.index]._id;
        setIsTaskVisible(prevState => ({
            ...prevState,
            [projectId]: false
        }));
    };

    return (
        <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
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
                <Droppable
                    droppableId='ROOT'
                    type='group'
                >
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
                            {table?.map((project, index) => (
                                <Draggable
                                    draggableId={`project-${index}`}
                                    key={`project-${index}`}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <div style={{ width: '100%' }}>
                                            <div className={styles.leflexx}>
                                                <Div width={"97%"}>
                                                    <LigneProject
                                                        index={index}
                                                        className={`${styles.draggableitem} ${snapshot.isDragging ? styles.dragging : ''}`}
                                                        rff={provided.innerRef}
                                                        Ar={provided.draggableProps}
                                                        Br={provided.dragHandleProps}
                                                        key={project._id}
                                                        itemText={project.name}
                                                        statusText={project?.StatusProjectManager}
                                                        designerText={'Xsustain.'}
                                                        subText={project.SubBy}
                                                        isChecked={project.isChecked}
                                                        onCheckboxChange={() => toggleCheckbox(index)}
                                                        onStatusChange={() => changeStatus(index)}
                                                        backgroundColor={project.backgroundColor}
                                                        textColor={project.textColor}
                                                        textContent={"Unassigned"}
                                                        id={project._id}
                                                        edit={true}
                                                        coverPhoto={project?.imagePath}
                                                        ownerImg={project?.imgOwner}
                                                    />
                                                </Div>
                                                {!snapshot.isDragging && project.tasks.length > 0 && (
                                                    <img onClick={() => handleExpand(project._id)} src={ArrowY} className={styles.arrowDown} alt="arrow down" />
                                                )}
                                            </div>
                                            {isTaskVisible[project._id] ? (
                                                project?.tasks?.map((task, taskIndex) => (
                                                    <LigneTaskInProject
                                                        key={task.id}
                                                        itemText={task?.itemTextT}
                                                        statusText={task?.statusTextT}
                                                        textContent={task?.textContentT}
                                                        onCheckboxChange={() => toggleCheckbox(taskIndex)}
                                                        onStatusChange={() => changeStatus(taskIndex)}
                                                        subText={task?.subTextT}
                                                        designerText={'Xsustain.'}
                                                        reqText={task?.reqTextT}
                                                        id={task?.id}
                                                        coverPhoto={task?.imagePath}
                                                        subIm={task?.imageSub}
                                                    />
                                                ))
                                            ) : null}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </Div>
        </DragDropContext>
    );
};

export default ProjectManagerDraw;
