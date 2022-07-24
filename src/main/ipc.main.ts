// Docs: https://www.electronjs.org/docs/latest/tutorial/ipc#pattern-2-renderer-to-main-two-way
import { IpcMain, ipcMain, WebContents, BrowserWindow } from 'electron';
import { IAWSCredentials, IRekognitionFile } from 'interfaces';
import * as store from '../services/store.service';
import * as rekognitionSvc from '../services/rekognition.service';
import {
  AWS__GET_CREDENTIALS,
  AWS__REKOGNITION_FINISH,
  AWS__REKOGNITION_PROGRESS,
  AWS__SET_CREDENTIALS,
  AWS__START_REKOGNITION,
  EXIFTOOL__TAGGING_PROGRESS,
  EXIFTOOL__TAGGING_FINISH,
} from '../constants';

// IPC Renderer to main (one-way)
export function addIpcMainListeners__RendererToMain(
  ipcMain: IpcMain,
  browserWindow: BrowserWindow
): void {
  ipcMain.on(AWS__SET_CREDENTIALS, (_event, credentials: IAWSCredentials) => {
    store.setAWSCredentials(credentials);
  });

  ipcMain.on(AWS__START_REKOGNITION, (event, files: IRekognitionFile[]) => {
    const imagesAmount = files.length;
    let rekognizedImagesCounter = 0;
    function awsRekognitionProgressCallback(): void {
      rekognizedImagesCounter++;
      const progress = (rekognizedImagesCounter * 100) / imagesAmount;
      notifyAwsRekognitionProgress(browserWindow, progress);
    }
    function exifToolTaggingProgressCallback(): void {
      let taggedImagesCounter = 0;
      const progress = (taggedImagesCounter * 100) / imagesAmount;
      notifyExiftoolTaggingProgress(browserWindow, progress);
    }
    function awsRekognitionFinishCallback(): void {
      notifyAwsRekognitionFinish(browserWindow);
    }
    function exiftoolTaggingFinishCallback(): void {
      notifyExiftoolTaggingFinish(browserWindow);
    }
    rekognitionSvc.rekognizeImages(
      files,
      awsRekognitionProgressCallback,
      awsRekognitionFinishCallback,
      exifToolTaggingProgressCallback,
      exiftoolTaggingFinishCallback
    );
  });
}

// Two way ipc with ipcMain.handle
export function addIpcMainListeners__TwoWay(ipcMain: IpcMain): void {
  ipcMain.handle(AWS__GET_CREDENTIALS, () => {
    return store.getAWSCredentials();
  });
}

/* Main to Renderer (one-way) */

/* Notifies aws rekognition progress by percentage */
export function notifyAwsRekognitionProgress(
  browserWindow: BrowserWindow,
  progress: number
) {
  browserWindow.webContents.send(AWS__REKOGNITION_PROGRESS, progress);
}
/* Notifies aws rekognition finish */
export function notifyAwsRekognitionFinish(browserWindow: BrowserWindow) {
  browserWindow.webContents.send(AWS__REKOGNITION_FINISH);
}
/* Notifies exiftool tag progress by percentage */
export function notifyExiftoolTaggingProgress(
  browserWindow: BrowserWindow,
  progress: number
) {
  browserWindow.webContents.send(EXIFTOOL__TAGGING_PROGRESS, progress);
}
/* Notifies exiftool tagging finish */
export function notifyExiftoolTaggingFinish(browserWindow: BrowserWindow) {
  browserWindow.webContents.send(EXIFTOOL__TAGGING_FINISH);
}
