// Docs: https://www.electronjs.org/docs/latest/tutorial/ipc#pattern-2-renderer-to-main-two-way
import { IpcMain } from 'electron';
import { IAWSCredentials, IRekognitionFile } from 'interfaces';
import * as store from '../services/store.service';
import * as rekognitionSvc from '../services/rekognition.service';

// IPC Renderer to main (one-way)
export function addIpcMainListeners__RendererToMain(ipcMain: IpcMain): void {
  ipcMain.on('aws:set-credentials', (_event, credentials: IAWSCredentials) => {
    store.setAWSCredentials(credentials);
  });
  ipcMain.on('aws:start-rekognition', (event, files: IRekognitionFile[]) => {
    rekognitionSvc.rekognizeImages(files);
  });
}

// Two way ipc with ipcMain.handle
export function addIpcMainListeners__TwoWay(ipcMain: IpcMain): void {
  ipcMain.handle('aws:get-credentials', () => {
    return store.getAWSCredentials();
  });
}

