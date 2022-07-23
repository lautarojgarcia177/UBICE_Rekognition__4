// Docs: https://www.electronjs.org/docs/latest/tutorial/ipc#pattern-2-renderer-to-main-two-way
import { IpcMain, ipcMain, WebContents, BrowserWindow } from 'electron';
import { IAWSCredentials, IRekognitionFile } from 'interfaces';
import * as store from '../services/store.service';
import * as rekognitionSvc from '../services/rekognition.service';

// IPC Renderer to main (one-way)
export function addIpcMainListeners__RendererToMain(ipcMain: IpcMain, browserWindow: BrowserWindow): void {
  ipcMain.on('aws:set-credentials', (_event, credentials: IAWSCredentials) => {
    store.setAWSCredentials(credentials);
  });

  ipcMain.on('aws:start-rekognition', (event, files: IRekognitionFile[]) => {
    const imagesAmount = files.length;
    let rekognizedImagesCounter = 0;
    function awsRekognitionProgressCallback(): void {
      rekognizedImagesCounter++;
      const progress = rekognizedImagesCounter * 100 / imagesAmount;
      notifyAwsRekognitionProgress(browserWindow, progress);
    }
    rekognitionSvc.rekognizeImages(files, awsRekognitionProgressCallback, () => {});
  });
}

// Two way ipc with ipcMain.handle
export function addIpcMainListeners__TwoWay(ipcMain: IpcMain): void {
  ipcMain.handle('aws:get-credentials', () => {
    return store.getAWSCredentials();
  });
}

/* Main to Renderer (one-way) */

/* Notifies rekognition progress by percentage */
export function notifyAwsRekognitionProgress(browserWindow: BrowserWindow, progress: number) {
  browserWindow.webContents.send('aws:rekognition-progress', progress);
}

