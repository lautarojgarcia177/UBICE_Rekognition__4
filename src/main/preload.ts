import { contextBridge, ipcRenderer } from 'electron';
import { IAWSCredentials, IAWSRekognitionSettings, IRekognitionFile } from '../interfaces';
import { APP__ERROR, AWS__GET_CREDENTIALS, AWS__GET_REKOGNITION_SETTINGS, AWS__SET_CREDENTIALS, AWS__SET_REKOGNITION_SETTINGS, CANCEL_REKOGNITION, REKOGNITION_FINISH, REKOGNITION_PROGRESS, START_REKOGNITION } from '../ipc.messages.constants';

/* API Accesible via window.electron */
contextBridge.exposeInMainWorld('electron', {
  setAWSCredentials: (credentials: IAWSCredentials) => ipcRenderer.send(AWS__SET_CREDENTIALS, credentials),
  getAWSCredentials: () => ipcRenderer.invoke(AWS__GET_CREDENTIALS),
  setAWSRekognitionSettings: (settings: IAWSRekognitionSettings) => ipcRenderer.send(AWS__SET_REKOGNITION_SETTINGS, settings),
  getAWSRekognitionSettings: () => ipcRenderer.invoke(AWS__GET_REKOGNITION_SETTINGS),
  startRekognition: (files: IRekognitionFile[]) => ipcRenderer.send(START_REKOGNITION, files),
  onRekognitionFinish: (callback) => ipcRenderer.on(REKOGNITION_FINISH, callback),
  onRekognitionProgress: (callback) => ipcRenderer.on(REKOGNITION_PROGRESS, callback),
  unsubscribeAllOnRekognitionProgress: () => ipcRenderer.send(CANCEL_REKOGNITION),
  onError: (callback) => ipcRenderer.on(APP__ERROR, callback)
});
