import React from "react";
import styles from "./style.module.scss";
import Upload from "../../../../../assets/images/Cloud_Upload.svg";
import {
  useCreateProjectMutation,
  useUploadFileMutation,
} from "../../../../../functions/UseMutation/useMutationProject";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../../../../store/tokenSlice";
import { getProjectPic, setProjectPic } from "../../../../../store/project";
import EditIcon from "../../../../../assets/images/Edit_Icon.svg";
import BubleImg from "../../../../../drawables/bubleimg/bubleImg";
import { useNavigate } from "react-router-dom";

const CreateProject = () => {
  const [projectName, setProjectName] = useState("");
  const [imagePath, setImagePath] = useState(null);
  const { user } = useSelector(getUser);
  const imageProject = useSelector(getProjectPic);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate hook

  const createProjectMutation = useCreateProjectMutation();
  const uploadFileMutation = useUploadFileMutation();

  const handleUploadImage = async (event) => {
    const file = event.target.files[0];
    const path = await uploadFileMutation.mutateAsync(file);
    setImagePath(path); // Update the state variable
    console.log("imagePath", path);
  };

  const handleCreateProject = async () => {
    try {
     
      const response = await createProjectMutation.mutateAsync({
        projectName,
        imagePath,
        owner: user._id,
      });
      console.log(response);
      navigate('/tasktypes')
    } catch (error) {
      console.error("message error:", error);
    }
  };

  return (
    <div className={styles.CreateProject}>
      <div className={styles.profileImgContainer}>
        {imageProject === null ? (
          <div className={styles.centerLogoflex}>
            <div className={styles.centerLogo}>
              <img src={Upload} alt="" className={styles.profileImg} />
              <p className={styles.logooo}>Logo</p>
            </div>
          </div>
        ) : (
          <img src={imageProject} alt="" className={styles.profileImg} />
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
      <div className={styles.TxtProjectContainer}>
        <label className={styles.LabelProject}>Project Name</label>
        <input
          type="text"
          placeholder="Enter project name"
          className={styles.InputProject}
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </div>
        <div className={styles.centerBnt}>
          <button className={styles.BtnProject} onClick={handleCreateProject}>
            Save
          </button>

        </div>
    </div>
  );
};

export default CreateProject;
