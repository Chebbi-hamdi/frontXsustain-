import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ChaneCover, DelFile } from '../api/Tasks'; // Import de la fonction de suppression
import { useSendNotifMutation } from '../functions/UseMutation/useMutation.Discution';
import { useSelector } from 'react-redux';
import { useTeammateInfo } from '../functions/UseQuery/TeamData';

export const changeCoverPhotoAsync = createAsyncThunk(
  'tasks/changeCoverPhoto',
  async (payload, { rejectWithValue }) => {
    const { taskId, imagePathId } = payload;
    try {
      const response = await ChaneCover(taskId, imagePathId);

      if (!response.task){
        
        return { taskId, newCoverPhoto: response.subtask.coverPhoto }; // Return taskId and the new cover photo

      }else{




        return { taskId, newCoverPhoto: response.task.coverPhoto }; // Return taskId and the new cover photo

      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fonction asynchrone pour supprimer une image
export const deleteImageAsync = createAsyncThunk(
  'tasks/deleteImage',
  async (payload, { rejectWithValue }) => {
    const { taskId, imagePathId } = payload;
    try {
      const response =await DelFile(taskId, imagePathId); // Appel de la fonction de suppression
      return { taskId, files: response.task.imagePaths };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    coverPhotoChanging: false,
    error: null,
    coverPhoto: null,
    changerId:null,
    participants:[],
    images: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changeCoverPhotoAsync.pending, (state) => {
        state.coverPhotoChanging = true;
        state.error = null;
      })
      .addCase(changeCoverPhotoAsync.fulfilled, (state, action) => {
        state.coverPhotoChanging = false;
        state.coverPhoto = action.payload.newCoverPhoto; // Mettre à jour la nouvelle photo de couverture dans l'état
      })
      .addCase(changeCoverPhotoAsync.rejected, (state, action) => {
        state.coverPhotoChanging = false;
        state.error = action.payload;
      })
      .addCase(deleteImageAsync.pending, (state) => {
        state.filedeleting = true;
        state.error = null;
      })
      .addCase(deleteImageAsync.fulfilled, (state, action) => {
        state.filedeleting = false;
        state.files = action.payload.files;
      })
      .addCase(deleteImageAsync.rejected, (state, action) => {
        state.filedeleting = false;
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;
export const {} = taskSlice.actions;
