import { contextBridge, ipcRenderer } from 'electron';
import { IAWSCredentials, IRekognitionFile } from '../interfaces';
import Rekognize from '../renderer/pages/rekognize/Rekognize';

/* API Accesible via window.electron */
contextBridge.exposeInMainWorld('electron', {
  setAWSCredentials: (credentials: IAWSCredentials) => ipcRenderer.send('aws:set-credentials', credentials),
  getAWSCredentials: () => ipcRenderer.invoke('aws:get-credentials'),
  startRekognition: (files: IRekognitionFile[]) => ipcRenderer.send('aws:start-rekognition', files),
});
