import { IAWSCredentials, IAWSRekognitionSettings, IRekognitionFile } from '../interfaces';

declare global {
  interface Window {
    electron: {
      setAWSCredentials(credentials: IAWSCredentials): void,
      getAWSCredentials(): IAWSCredentials,
      setAWSRekognitionSettings(settings: IAWSRekognitionSettings): void,
      getAWSRekognitionSettings(): IAWSRekognitionSettings,
      startRekognition(files: IRekognitionFile[]): IRekognitionFile[],
      onRekognitionFinish(callback): void,
      onRekognitionProgress(callback): void,
      unsubscribeAllOnRekognitionProgress(): void,
      onError(callback): void,
    };
  }
}

export {};
