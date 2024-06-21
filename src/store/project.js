import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    project: null,
    projectPic: null,
    isProject:false
    };

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setProject: (state, action) => {
            state.project = action.payload;
        },
        clearProject: (state) => {
            state.project = null;
        },
        setProjectPic: (state, action) => {
            state.projectPic = action.payload;
        },
        clearProjectPic: (state) => {
            state.projectPic = null;
        },
        setIsProject: (state, action) => {
            state.isProject = action.payload;
        }

    },
});

export const { setProject, clearProject, setProjectPic, clearProjectPic,setIsProject } = projectSlice.actions;
export const getProject = (state) => state.project.project;
export const getProjectPic = (state) => state.project.projectPic;
export const getIsProject = (state) => state.project.isProject;

export default projectSlice.reducer;

