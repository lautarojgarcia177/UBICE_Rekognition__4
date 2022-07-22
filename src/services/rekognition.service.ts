import { IRekognitionFile, IAWSCredentials } from '../interfaces';
import fs from 'fs';
import path from 'path';
import {
  RekognitionClient,
  DetectTextCommand,
} from '@aws-sdk/client-rekognition';
import * as store from './store.service';

export function rekognizeImages(images: IRekognitionFile[]): void {
  const ubiceClient = new UBICEAWSClient(store.getAWSCredentials());
  // images.map(async (image) => {
  //   const rekognitions = await ubiceClient.rekognize(image.path);
  //   console.log('REKONOZIO UNAAAAA', image.name, rekognitions);
  // });
  // TODO: Call exiftool to write metadata
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
  rekognize(imagePath: string, minConfidence: number = 95) {
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
    return this.client.send(command)
    // .then((res) => {
    //   console.log(res);
    //   res.TextDetections.filter((textDetection) =>
    //     useRegex(textDetection.DetectedText)
    //   )
    //     .filter((textDetection) => (textDetection.Type === 'WORD' || textDetection.Type === 'LINE'))
    //     .map((textDetection) => textDetection.DetectedText);
    // });
  }
}
