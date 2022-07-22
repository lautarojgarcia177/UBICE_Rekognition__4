import { IAWSCredentials, IRekognitionFile } from '../interfaces';

declare global {
  interface Window {
    electron: {
      setAWSCredentials(credentials: IAWSCredentials): void,
      getAWSCredentials(): IAWSCredentials,
      startRekognition(files: IRekognitionFile[]): IRekognitionFile[]
    };
  }
}

export {};
