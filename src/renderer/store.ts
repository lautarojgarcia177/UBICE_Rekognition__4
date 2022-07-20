import { configureStore, createSlice } from '@reduxjs/toolkit';

/* Slices */
export const filesSlice = createSlice({
  name: 'files',
  initialState: {
    files: []
  },
  reducers: {
    updateFiles: (state, action) => state.files = action.payload
  }
});

/* Actions */
export const { updateFiles } = filesSlice.actions;

/* Selectors */
export const selectFiles = state => state.files.files;

/* Thunks */

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
