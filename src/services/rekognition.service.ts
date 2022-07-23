import { IRekognitionFile, IAWSCredentials } from '../interfaces';
import fs from 'fs';
import path from 'path';
import {
  RekognitionClient,
  DetectTextCommand,
} from '@aws-sdk/client-rekognition';
import * as store from './store.service';
import { writeMetadataOnRekognizedImages } from './exiftool.service';
import { uniq } from 'lodash';

export function rekognizeImages(images: IRekognitionFile[], awsProgressCallback, exifToolProgressCallback): void {
  // Rekognize images with AWS Rekognition
  const ubiceClient = new UBICEAWSClient(store.getAWSCredentials());
  const promises: Promise<any>[] = [];
  async function rekognitionPromise(image: IRekognitionFile) {
    const rekognition = await ubiceClient.rekognize(image.path);
    awsProgressCallback()
    image.numbers = rekognition;
  }
  for (let image of images) {
    promises.push(rekognitionPromise(image));
  }
  Promise.all(promises).then(() => {
    // Ask Exiftool to write metadata
    writeMetadataOnRekognizedImages(images).then(() => {
      // TODO Call onRekognitionFinish
      console.log(images);
    });
  });
}

function useRegex(input) {
  let regex = /^[0-9]+$/i;
  return regex.test(input);
}

class UBICEAWSClient {
  client: RekognitionClient;
  constructor(credentials: IAWSCredentials, region: string = 'us-west-1') {
    this.client = new RekognitionClient({
      credentials: {
        accessKeyId: credentials.awsAccessKeyId,
        secretAccessKey: credentials.awsSecretAccessKey,
      },
      region: region,
    });
  }
  async rekognize(imagePath: string, minConfidence: number = 95): Promise<any> {
    const image = fs.readFileSync(imagePath);
    const command = new DetectTextCommand({
      Image: {
          Bytes: image,
      },
      Filters: {
        WordFilter: {
          MinConfidence: minConfidence,
        },
      },
    });
    let commandResult = await this.client.send(command);
    const numbersArray = commandResult.TextDetections.filter((textDetection) =>
      useRegex(textDetection.DetectedText)
    ).map((textDetection) => textDetection.DetectedText);
    return uniq(numbersArray);
  }
}
