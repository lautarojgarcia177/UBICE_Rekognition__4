import { configureStore, createSlice } from '@reduxjs/toolkit';
import { IAWSCredentials, IAWSRekognitionSettings } from '../interfaces';

/* Slices */
export const filesSlice = createSlice({
  name: 'files',
  initialState: {
    files: [],
    isRekognizing: false,
    awsCredentials: {
      awsAccessKeyId: null,
      awsSecretAccessKey: null
    },
    awsRekognitionSettings: {
      minConfidence: 95,
    }
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
    SET_AWS_CREDENTIALS: (state, action) => {
      state.awsCredentials = action.payload;
    },
    SET_AWS_REKOGNITION_SETTINGS: (state, action) => {
      state.awsRekognitionSettings = action.payload;
    },
  },
});

/* Actions */
export const { UPDATE_FILES, START_REKOGNITION, CANCEL_REKOGNITION, SET_AWS_CREDENTIALS, SET_AWS_REKOGNITION_SETTINGS } =
  filesSlice.actions;

/* Selectors */
export const selectFiles = (state) => state.files.files;
export const selectIsRekognizing = (state) => state.files.isRekognizing;
export const selectAWSCredentials = (state) => state.files.awsCredentials;
export const selectAWSRekognitionSettings = (state) => state.files.awsRekognitionSettings;

/* Middleware */
// https://redux.js.org/usage/writing-logic-thunks#writing-thunks
export function loadAwsCredentials() {
  return loadAWSCredentialsThunk;
}
export const startRekognitionThunk = (dispatch, getState) => {
  const state = getState();
  window.electron.startRekognition(state.files.files);
  // dispatch(START_REKOGNITION());
};
export function saveAwsCredentials(awsCredentials: IAWSCredentials) {
  window.electron.setAWSCredentials(awsCredentials);
  return loadAWSCredentialsThunk;
}
export async function loadAWSCredentialsThunk(dispatch, getState) {
  const storedAWSCredentials = await window.electron.getAWSCredentials();
  if (storedAWSCredentials.awsAccessKeyId === 'undefined') storedAWSCredentials.awsAccessKeyId = '';
  if (storedAWSCredentials.awsSecretAccessKey === 'undefined') storedAWSCredentials.awsSecretAccessKey = '';
  dispatch(SET_AWS_CREDENTIALS(storedAWSCredentials));
}
export function loadAwsRekognitionSettings() {
  return loadAWSRekognitionSettingsThunk;
}
export function saveAwsRekognitionSettings(awsRekognitionSettings: IAWSRekognitionSettings) {
  window.electron.setAWSRekognitionSettings(awsRekognitionSettings);
  return loadAWSRekognitionSettingsThunk;
}
export async function loadAWSRekognitionSettingsThunk(dispatch, getState) {
  const storedAWSRekognitionSettings = await window.electron.getAWSRekognitionSettings();
  if (!storedAWSRekognitionSettings.minConfidence) storedAWSRekognitionSettings.minConfidence = 95;
  dispatch(SET_AWS_REKOGNITION_SETTINGS(storedAWSRekognitionSettings));
}

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
