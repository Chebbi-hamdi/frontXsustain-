import React, { useState, useEffect } from "react";
import { Div } from "../../../../Divs/Div_Param";
import styles from "./style.module.scss";
import AddPlus from "../../../../../assets/images/Dashboard/Add_Plus.svg";
import { useNavigate } from "react-router-dom";
import { Modal } from "@mui/material";
import CardTask from "../TaskCard/CardTask";
import CreateProject from "../Project/CreateProject";
import back from "../../../../../assets/images/backTask.svg";
import close from "../../../../../assets/images/closeTask.svg";
import { setIsProject } from "../../../../../store/project";
import { useDispatch } from "react-redux";

const NewTask = () => {
  const [openModal, setOpenModal] = useState(false);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!openModal) {
      setShowCreateProject(false);
    }
  }, [openModal]);

  const navigateToProfile = () => {
    setOpenModal(true);
  };

  const handleProject = () => {
    dispatch(setIsProject(true));
    setShowCreateProject(true);
    setOpenModal(true); // Open modal when creating a project
  };

  const handleBack = () => {
    setShowCreateProject(false);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setOpenModal(false);
    console.log("Close");
  };

  const handleTask = () => {
    dispatch(setIsProject(false));
    navigate("/tasktypes");
  };

  return (
    <div className={styles.NewTask} onClick={navigateToProfile}>
      <Div width={"43%"} height={"30%"} className={styles.NewTaskInside}>
        <img alt="Add" src={AddPlus} className={styles.PlusImg}></img>
        <p className={styles.NewTaskTxt}>NEW TASK </p>
      </Div>
      <div className={styles.ModalContainer}>
        <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className={styles.ModalContainer } // Apply different style for small modal
        >
<div className={`${styles.Modal} ${showCreateProject ? styles.smallModalll : ''}`}>
              {showCreateProject && (
                <img src={back} alt="back" className={styles.Back} onClick={handleBack} />
              )}
            <div className={styles.ModalHeader}>
              <div className={styles.ModalContent}>
                <div className={styles.centerModalContent}>
                  <div className={styles.titleCenterFlex}>
                    <div className={styles.titleCenter}>

                      <p className={styles.ModalLittleTitle}>Happy To start with you</p>
                      <h2 className={styles.ModalTitle}>
                        What do you want <span className={styles.spany}>create today  ?</span>
                      </h2>
                    </div>
                  </div>
                  {!showCreateProject ? (
                    <>
                <div className={styles.ModalBtns}>
                      <CardTask
                        title="New Project"
                        description="Choose this option if you need to create a new project from scratch"
                        onClick={handleProject}
                      />
                      <CardTask
                        title="New Task"
                        description="Choose this option if you need to create a new task"
                        onClick={handleTask}
                        />
                        </div>
                    </>
                  ) : (
                    <div className={styles.ModalBtns1}>

                    <CreateProject />
                    </div>

                  )}

                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default NewTask;
