import { contextBridge, ipcRenderer } from 'electron';
import { IAWSCredentials, IRekognitionFile } from '../interfaces';
import { AWS__GET_CREDENTIALS, AWS__REKOGNITION_FINISH, AWS__REKOGNITION_PROGRESS, AWS__SET_CREDENTIALS, AWS__START_REKOGNITION, EXIFTOOL__TAGGING_FINISH, EXIFTOOL__TAGGING_PROGRESS } from '../constants';

/* API Accesible via window.electron */
contextBridge.exposeInMainWorld('electron', {
  setAWSCredentials: (credentials: IAWSCredentials) => ipcRenderer.send(AWS__SET_CREDENTIALS, credentials),
  getAWSCredentials: () => ipcRenderer.invoke(AWS__GET_CREDENTIALS),
  startRekognition: (files: IRekognitionFile[]) => ipcRenderer.send(AWS__START_REKOGNITION, files),
  onRekognitionFinish: (callback) => ipcRenderer.on(AWS__REKOGNITION_FINISH, callback),
  onRekognitionProgress: (callback) => ipcRenderer.on(AWS__REKOGNITION_PROGRESS, callback),
  // TODO unsubscribeToRekognitionProgress: (),
  onExifToolTagProgress: (callback) => ipcRenderer.on(EXIFTOOL__TAGGING_PROGRESS, callback),
  // TODO unsubscribeToExiftoolTagProgress: (),
  onExifToolTagFinish: (callback) => ipcRenderer.on(EXIFTOOL__TAGGING_FINISH, callback)
});
