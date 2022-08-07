import { IRekognitionFile } from '../interfaces';
import { writeMetadataOnRekognizedImages } from './exiftool.service';
import ubiceAWSClient from '../classes/aws.client';

export function rekognizeImages(
  images: IRekognitionFile[],
  awsRekognitionProgressCallback,
  awsRekognitionFinishCallback,
  exifToolTaggingProgressCallback,
  exifToolTaggingFinishCallback
): void {
  // Rekognize images with AWS Rekognition
  const promises: Promise<any>[] = [];
  async function rekognitionPromise(image: IRekognitionFile) {
    const rekognition = await ubiceAWSClient.rekognize(image.path);
    awsRekognitionProgressCallback();
    image.numbers = rekognition;
  }
  for (let image of images) {
    promises.push(rekognitionPromise(image));
  }
  Promise.all(promises).then(() => {
    awsRekognitionFinishCallback();
    // Ask Exiftool to write metadata
    writeMetadataOnRekognizedImages(images, exifToolTaggingProgressCallback)
      .then(() => exifToolTaggingFinishCallback())
      .catch((err) => exifToolTaggingFinishCallback(err));
  });
}
