import { contextBridge, ipcRenderer } from 'electron';
import { IAWSCredentials, IRekognitionFile } from '../interfaces';
import { APP__ERROR, AWS__GET_CREDENTIALS, AWS__REKOGNITION_FINISH, AWS__REKOGNITION_PROGRESS, AWS__SET_CREDENTIALS, AWS__START_REKOGNITION, EXIFTOOL__TAGGING_FINISH, EXIFTOOL__TAGGING_PROGRESS } from '../ipc.messages.constants';

/* API Accesible via window.electron */
contextBridge.exposeInMainWorld('electron', {
  setAWSCredentials: (credentials: IAWSCredentials) => ipcRenderer.send(AWS__SET_CREDENTIALS, credentials),
  getAWSCredentials: () => ipcRenderer.invoke(AWS__GET_CREDENTIALS),
  startRekognition: (files: IRekognitionFile[]) => ipcRenderer.send(AWS__START_REKOGNITION, files),
  onRekognitionFinish: (callback) => ipcRenderer.on(AWS__REKOGNITION_FINISH, callback),
  onRekognitionProgress: (callback) => ipcRenderer.on(AWS__REKOGNITION_PROGRESS, callback),
  unsubscribeAllOnRekognitionProgress: () => ipcRenderer.removeAllListeners(AWS__REKOGNITION_PROGRESS),
  onExifToolTagProgress: (callback) => ipcRenderer.on(EXIFTOOL__TAGGING_PROGRESS, callback),
  unsubscribeAllOnExiftoolTagProgress: () => ipcRenderer.removeAllListeners(EXIFTOOL__TAGGING_PROGRESS),
  onExifToolTagFinish: (callback) => ipcRenderer.on(EXIFTOOL__TAGGING_FINISH, callback),
  unsubscribeAllOnExifToolTagFinish: () => ipcRenderer.removeAllListeners(EXIFTOOL__TAGGING_FINISH),
  onError: (callback) => ipcRenderer.on(APP__ERROR, callback)
});
