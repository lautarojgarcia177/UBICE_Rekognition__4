import { contextBridge, ipcRenderer } from 'electron';
import { IAWSCredentials } from '../interfaces';

/* API Accesible via window.electron */
contextBridge.exposeInMainWorld('electron', {
  setAWSCredentials: (credentials: IAWSCredentials) => ipcRenderer.send('aws:set-credentials', credentials),
  getAWSCredentials: () => ipcRenderer.invoke('aws:get-credentials'),
});
