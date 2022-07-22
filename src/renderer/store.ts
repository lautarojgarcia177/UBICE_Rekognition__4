import { configureStore, createSlice } from '@reduxjs/toolkit';

/* Slices */
export const filesSlice = createSlice({
  name: 'files',
  initialState: {
    files: [],
    isRekognizing: false,
  },
  reducers: {
    UPDATE_FILES: (state, action) => {
      state.files = action.payload;
    },
    START_REKOGNITION: (state) => {
      state.isRekognizing = true;
    },
    CANCEL_REKOGNITION: (state) => {
      state.isRekognizing = false;
    },
  },
});

/* Actions */
export const { UPDATE_FILES, START_REKOGNITION, CANCEL_REKOGNITION } =
  filesSlice.actions;

/* Selectors */
export const selectFiles = (state) => state.files.files;
export const selectIsRekognizing = (state) => state.files.isRekognizing;

/* Thunks */
// https://redux.js.org/usage/writing-logic-thunks#writing-thunks
export const startRekognitionThunk = (dispatch, getState) => {
  const state = getState();
  window.electron.startRekognition(state.files.files);
  // dispatch(START_REKOGNITION());
};

/* Store */
export const store = configureStore({
  reducer: {
    files: filesSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
