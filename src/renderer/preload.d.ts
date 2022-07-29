import { IAWSCredentials, IRekognitionFile } from '../interfaces';

declare global {
  interface Window {
    electron: {
      setAWSCredentials(credentials: IAWSCredentials): void,
      getAWSCredentials(): IAWSCredentials,
      startRekognition(files: IRekognitionFile[]): IRekognitionFile[],
      onRekognitionFinish(callback): void,
      onRekognitionProgress(callback): void,
      onExifToolTagProgress(callback): void,
      onExifToolTagFinish(callback): void,
      unsubscribeAllOnRekognitionProgress(): void,
      unsubscribeAllOnExiftoolTagProgress(): void,
      unsubscribeAllOnExifToolTagFinish(): void,
    };
  }
}

export {};
