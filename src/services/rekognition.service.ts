import { IRekognitionFile } from '../interfaces';
import * as exiftoolService from './exiftool.service';
import ubiceAWSClient from '../classes/aws.client';

export function rekognizeImages(
  images: IRekognitionFile[],
  rekognitionProgressCallback,
  rekognitionFinishCallback
): void {
  // Rekognize images with AWS Rekognition
  const promises: Promise<any>[] = [];
  async function rekognitionPromise(image: IRekognitionFile) {
    const rekognition = await ubiceAWSClient.rekognize(image.path);
    image.numbers = rekognition;
    await exiftoolService.writeMetadataOnRekognizedImage(image);
    rekognitionProgressCallback();
  }
  for (let image of images) {
    promises.push(rekognitionPromise(image));
  }
  Promise.all(promises).then(() => {
    rekognitionFinishCallback();
  });
}
