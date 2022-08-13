// Docs: https://www.electronjs.org/docs/latest/tutorial/ipc#pattern-2-renderer-to-main-two-way
import { IpcMain, ipcMain, WebContents, BrowserWindow } from 'electron';
import { IAWSCredentials, IAWSRekognitionSettings, IRekognitionFile } from 'interfaces';
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
  EXIFTOOL_ERROR,
  APP__ERROR,
  AWS__SET_REKOGNITION_SETTINGS,
  AWS__GET_REKOGNITION_SETTINGS,
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

  ipcMain.on(AWS__START_REKOGNITION, (event, files: IRekognitionFile[]) => {
    const imagesAmount = files.length;
    let rekognizedImagesCounter = 0;
    function awsRekognitionProgressCallback(): void {
      rekognizedImagesCounter++;
      const progress = (rekognizedImagesCounter * 100) / imagesAmount;
      notifyAwsRekognitionProgress(browserWindow, progress);
    }
    function exifToolTaggingProgressCallback(err?: any): void {
      if (err) {
        console.warn('Error etiquetando imagenes con Exiftool', err);
        notifyError(browserWindow, EXIFTOOL_ERROR, err);
        return;
      }
      let taggedImagesCounter = 0;
      const progress = (taggedImagesCounter * 100) / imagesAmount;
      notifyExiftoolTaggingProgress(browserWindow, progress);
    }
    function awsRekognitionFinishCallback(): void {
      notifyAwsRekognitionFinish(browserWindow);
    }
    function exiftoolTaggingFinishCallback(err?: any): void {
      if (err) {
        console.warn('Error etiquetando imagenes con Exiftool', err);
        notifyError(browserWindow, EXIFTOOL_ERROR, err);
        return;
      }
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
  ipcMain.handle(AWS__GET_REKOGNITION_SETTINGS, () => {
    return store.getAWSRekognitionSettings();
  });
}

// Main to Renderer (one-way)
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

/* Notifies error */
export function notifyError(browserWindow: BrowserWindow, errCode: string, err) {
  browserWindow.webContents.send(errCode, err);
}
