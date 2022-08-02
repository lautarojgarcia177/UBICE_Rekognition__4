export interface IAWSCredentials {
  awsAccessKeyId: string;
  awsSecretAccessKey: string;
}

export interface IRekognitionFile {
  id: number,
  name: string,
  path: string,
  numbers: number[] | string[],
}
