import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  Projects: [],
  OriginalProjects: [], // Store original projects
  Tasks: [],
  OriginalTasks: [], // Store original tasks
};

const Project_Task = createSlice({
  name: 'Project_Task',
  initialState,
  reducers: {
    SetProjects: (state, action) => {
      state.Projects = action.payload;
    },
    ClearProjects: (state) => {
      state.Projects = [];
      state.OriginalProjects = []; // Clear original projects
    },
    SetTasks: (state, action) => {
      state.Tasks = action.payload;
    },
    ClearTasks: (state) => {
      state.Tasks = [];
      state.OriginalTasks = []; // Clear original tasks
    },
    RestoreOriginalProjects: (state,action) => {

      state.OriginalProjects = action.payload;// Restore original projects
    },
    RestoreOriginalTasks: (state,action) => {
      state.OriginalTasks = action.payload; // Restore original tasks
    },
  },
});

export const {
  SetProjects,
  ClearProjects,
  SetTasks,
  ClearTasks,
  RestoreOriginalProjects, // Add action to restore original projects
  RestoreOriginalTasks, // Add action to restore original tasks
} = Project_Task.actions;
export const getProjects = (state) => state.Project_Task.Projects;
export const getTasks = (state) => state.Project_Task.Tasks;
export const getProjectsorig = (state) => state.Project_Task.OriginalProjects;
export const getTasksorig = (state) => state.Project_Task.OriginalTasks;
export default Project_Task.reducer;
