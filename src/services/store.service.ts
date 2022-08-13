// docs: https://github.com/sindresorhus/electron-store
import Store from 'electron-store';
import { IAWSCredentials, IAWSRekognitionSettings } from '../interfaces';

const store = new Store();

export function setAWSCredentials(awsCredentials: IAWSCredentials): void {
  store.set('awsAccessKeyId', awsCredentials.awsAccessKeyId);
  store.set('awsSecretAccessKey', awsCredentials.awsSecretAccessKey);
}

export function getAWSCredentials(): IAWSCredentials {
  return {
    awsAccessKeyId: String(store.get('awsAccessKeyId')),
    awsSecretAccessKey: String(store.get('awsSecretAccessKey')),
  }
}

export function setAWSRekognitionSettings(settings: IAWSRekognitionSettings): void {
  store.set('awsRekognitionSettings', settings);
}

export function getAWSRekognitionSettings(): IAWSRekognitionSettings {
  return {
    minConfidence: Number(store.get('awsRekognitionSettings.minConfidence')),
  }
}
