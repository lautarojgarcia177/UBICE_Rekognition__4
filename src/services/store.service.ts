// docs: https://github.com/sindresorhus/electron-store
import Store from 'electron-store';
import { IAWSCredentials } from '../interfaces';

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
