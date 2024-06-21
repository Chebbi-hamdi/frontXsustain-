import React from "react";
// import Draw from "../../assets/images/draw.png";
import { Div } from "../../drawables/Divs/Div_Param";
import styles from "./taskhome.module.scss";
import Bodyy from "../../layouts/TasksTypes/Body/Bodyy";
import Head from "../../layouts/TasksTypes/Head/Head";
// import Draw from "../../assets/images/draw1.png";
import Upload from "../../assets/images/Cloud_Upload.svg";
import EditIcon from "../../assets/images/Edit_Icon.svg";
import { useUploadFileMutation } from "../../functions/UseMutation/useMutationProject";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import taskTypeApi from "../../api/taskType";
import { useSelector } from "react-redux";
import { getProject } from "../../store/project";
import { useDispatch } from "react-redux";
import { clearProject, clearProjectPic } from "../../store/project";
import { useProject } from "../../functions/UseQuery/ProjectQuery";
import { getIsProject } from "../../store/project";
import LoaderSpin from "../../drawables/loader/LoaderSpin";

const TaskHome = () => {
  const [selectedData, setSelectedData] = useState(null);
  const [selctedImage, setSelctedImage] = useState(null);
  const [direction, setDirection] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const uploadFileMutation = useUploadFileMutation();

  const dispatch = useDispatch();
  // console.log("setSelctedImage-------------", selctedImage);
  //get the user id from the URL
  const { userId, taskId } = useParams();
  const projectData = useSelector(getProject);
  console.log("params", userId, taskId);

  const directionImages = direction
    ?.filter((item) => typeof item === "object" && item?.image) // Filter out objects without the 'image' property
    ?.map((item) => item?.image); // Map each object to its 'image' property
  const nonEmptyStrings = direction?.filter(
    (item) => typeof item === "string" && item.trim() !== ""
  );
  const description = nonEmptyStrings?.join("\n");
  const { Projects, isLoading, isError, error } = useProject(userId);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedProjectId, setProjectId] = useState("");
  const [Title, setTitle] = useState("Task Title");

  const dataSend = {
    selectedData: selectedData,
    userId: userId,
    taskId: taskId,
    selctedImage: selctedImage?._id,
    direction: direction,
    description: description,
    ProjectId: projectData?._id,
    imagePath: directionImages, // Adding the image path here
    title: Title,
    ProjectId1: selectedProjectId,
  };
  console.log("dataSend", dataSend);
  const navigate = useNavigate();

  const handleTaskTitle = (event) => {
    setTitle(event.target.value);
  };

  const useCreateTaskMutation = useMutation({
    mutationFn: async (taskData) => {
      return await taskTypeApi.createTask(taskData);
    },
    onSuccess: async (res) => {
      console.log("Task created successfully:", res);
      navigate("/tasks");
    },
    onError: (error) => {
      console.error("Task creation error:", error);
    },
  });
  const handleSendToDesigner = () => {
    console.log("send to designer", selectedData, userId);
    useCreateTaskMutation.mutate(dataSend);
    dispatch(clearProject());
    dispatch(clearProjectPic());
  };

  const handleUploadImage = async (event) => {
    const file = event.target.files[0];
    const path = await uploadFileMutation.mutateAsync(file);
    setImagePath(path); // Update the state variable
    console.log("imagePath", path);
  };

  const isProject = useSelector(getIsProject);
  console.log("=======", isProject);

  const handleProjectSelect = (e) => {
    const selectedProjectName = e.target.value;
    setSelectedProject(selectedProjectName);

    // Find the project in Projects array and set its _id
    const selectedProject = Projects.find(
      (project) => project.name === selectedProjectName
    );
    if (selectedProject) {
      setProjectId(selectedProject._id);
    } else {
      setProjectId(""); // If no project is selected, set projectId to empty string
    }
  };

  if(isLoading)    return <LoaderSpin />;

  return (
    <Div height={"100%"} width={"100%"} className={styles.MainCardD}>
      <Div width="95%" height={"10vh"} className={styles.Header}>
        <Div className={styles.SearchBar}>
          <div className={styles.HeaderTitle}>
            {projectData && (
              <div className={styles.FlexContent}>
                <div className={styles.profileImgContainer}>
                  {projectData?.imagePath === null ? (
                    <img src={Upload} alt="" className={styles.profileImg} />
                  ) : (
                    <img
                      src={projectData?.imagePath}
                      alt=""
                      className={styles.profileImg}
                    />
                  )}
                  <label htmlFor="projectImage">
                    <img src={EditIcon} alt="" className={styles.EditIcon} />
                  </label>
                  <input
                    type="file"
                    id="projectImage"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleUploadImage}
                  />
                </div>
                <div className={styles.HeaderTitleText}>
                  <p className={styles.TaskTitle}>{projectData?.name}</p>
                </div>
              </div>
            )}
            {!isProject && (
              <div>
                {!isLoading && !isError && (
                  <div>
                    {!selectedProject ? (
                      <div>
                        Assign your new task to an existing project.
                      </div>
                    ) : (
                      <div>Selected Project: {selectedProject}</div>
                    )}

                    <select
                      value={selectedProject}
                      onChange={handleProjectSelect}
                    >
                      <option value="">Select a project</option>
                      {Projects?.map((project, index) => (
                        <option key={index} value={project.name}>
                          {project.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}
          </div>
          <Div className={styles.InputContainer}>
            <input
              type="text"
              placeholder="Task Title"
              className={styles.Input}
              onChange={handleTaskTitle}
            />
          </Div>
          <Div className={styles.SearchBar1}>
            <button className={styles.btn_send} onClick={handleSendToDesigner}>
              Send To Designer
            </button>
            <button className={styles.btn_close}>Close</button>
            <Div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                onClick={() => navigate("/dash")}
              >
                <path
                  d="M12 17C11.4477 17 11 17.4477 11 18C11 18.5523 11.4477 19 12 19C12.5523 19 13 18.5523 13 18C13 17.4477 12.5523 17 12 17Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 5C11.4477 5 11 5.44772 11 6C11 6.55228 11.4477 7 12 7C12.5523 7 13 6.55228 13 6C13 5.44772 12.5523 5 12 5Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Div>
          </Div>
        </Div>
      </Div>
      <Div width={"100%"} height={"86vh"} className={styles.Bodyy}>
        <Head setSelectedData={setSelectedData} />
        <Bodyy setSelctedImage={setSelctedImage} setDirection={setDirection} />
      </Div>
    </Div>
  );
};

export default TaskHome;
