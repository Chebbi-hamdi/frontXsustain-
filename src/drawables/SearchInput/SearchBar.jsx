import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.scss";
import searchIcon from "../../assets/images/Serachh.svg";
import {
  SetProjects,
  SetTasks,
  RestoreOriginalProjects,
  RestoreOriginalTasks,
  getProjects,
  getTasks,
  getProjectsorig,
  getTasksorig,
} from "../../store/Project-Task-Slice";

const SearchBar = ({ placeholder, className }) => {
  const dispatch = useDispatch();
  const projectsOrig = useSelector(getProjectsorig);
  const tasksOrig = useSelector(getTasksorig);
  console.log("mmmmmmm", tasksOrig);
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value && value.trim() !== "") {
      // Check if value is not null or empty
      // Filter projects and tasks based on query
      const lowercasedValue = value.toLowerCase();
      const filteredProjects = projectsOrig?.filter((project) =>
        project?.name?.toLowerCase().includes(lowercasedValue)
      );
      const filteredTasks = tasksOrig?.filter((task) =>
        task?.title?.toLowerCase().includes(lowercasedValue)
      );
      dispatch(SetProjects(filteredProjects));
      dispatch(SetTasks(filteredTasks));
    } else {
      // Restore original projects and tasks when query is empty
      dispatch(SetProjects(projectsOrig));
      dispatch(SetTasks(tasksOrig));
    }
  };

  return (
    <div className={styles.InputContainer}>
      <img src={searchIcon} alt="Search Icon" className={styles.SearchIcon} />
      <input
        className={`${styles.Input} ${className}`}
        placeholder={placeholder || "Find something"}
        value={query}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
