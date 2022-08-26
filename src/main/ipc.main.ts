// Docs: https://www.electronjs.org/docs/latest/tutorial/ipc#pattern-2-renderer-to-main-two-way
import { IpcMain, ipcMain, WebContents, BrowserWindow } from 'electron';
import { IAWSCredentials, IAWSRekognitionSettings, IRekognitionFile } from 'interfaces';
import * as store from '../services/store.service';
import * as rekognitionSvc from '../services/rekognition.service';
import {
  EXIFTOOL_ERROR,
  APP__ERROR,
  AWS__SET_REKOGNITION_SETTINGS,
  AWS__GET_REKOGNITION_SETTINGS,
  AWS__SET_CREDENTIALS,
  START_REKOGNITION,
  AWS__GET_CREDENTIALS,
  REKOGNITION_PROGRESS,
  REKOGNITION_FINISH,
  CANCEL_REKOGNITION,
} from '../ipc.messages.constants';

// IPC Renderer to main (one-way)
export function addIpcMainListeners__RendererToMain(
  ipcMain: IpcMain,
  browserWindow: BrowserWindow
): void {
  ipcMain.on(AWS__SET_CREDENTIALS, (_event, credentials: IAWSCredentials) => {
    store.setAWSCredentials(credentials);
  });

  ipcMain.on(AWS__SET_REKOGNITION_SETTINGS, (_event, settings: IAWSRekognitionSettings) => {
    store.setAWSRekognitionSettings(settings);
  });

  ipcMain.on(START_REKOGNITION, (event, files: IRekognitionFile[]) => {
    const imagesAmount = files.length;
    let rekognizedImagesCounter = 0;
    rekognitionSvc.rekognizeImages(
      files,
      () => {
        rekognizedImagesCounter++;
        const progress = (rekognizedImagesCounter * 100) / imagesAmount;
        notifyRekognitionProgress(browserWindow, progress);
      },
      () => notifyRekognitionFinish(browserWindow)
    )
  });

  ipcMain.on(CANCEL_REKOGNITION, () => {
    // TODO https://nodejs.org/api/globals.html#class-abortcontroller
  });
}

// Two way ipc with ipcMain.handle
export function addIpcMainListeners__TwoWay(ipcMain: IpcMain): void {
  ipcMain.handle(AWS__GET_CREDENTIALS, () => {
    return store.getAWSCredentials();
  });
  ipcMain.handle(AWS__GET_REKOGNITION_SETTINGS, () => {
    return store.getAWSRekognitionSettings();
  });
}

// Main to Renderer (one-way)
/* Notifies aws rekognition progress by percentage */
export function notifyRekognitionProgress(
  browserWindow: BrowserWindow,
  progress: number
) {
  browserWindow.webContents.send(REKOGNITION_PROGRESS, progress);
}
/* Notifies rekognition finish */
export function notifyRekognitionFinish(browserWindow: BrowserWindow) {
  browserWindow.webContents.send(REKOGNITION_FINISH);
}

/* Notifies error */
export function notifyError(browserWindow: BrowserWindow, errCode: string, err) {
  browserWindow.webContents.send(errCode, err);
}
