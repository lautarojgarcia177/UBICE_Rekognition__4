import { padStart } from 'lodash';
import exiftool from 'node-exiftool';
import { IRekognitionFile } from '../interfaces';
const ep = new exiftool.ExiftoolProcess();

export async function writeMetadataOnRekognizedImages(
  images: IRekognitionFile[],
  exifToolProgressCallback
) {
  ep.open().then(() => {
    const promises: Promise<any>[] = [];
    for (let image of images) {
      if (!image.numbers.length) {
        image.numbers.push('#');
      } else {
        for (let number of image.numbers) {
          number = padStart(String(number), 5, '0');
        }
      }
      const promise = ep
        .writeMetadata(
          image.path,
          {
            'Keywords+': [...image.numbers],
          },
          ['overwrite_original']
        )
        .then(() => exifToolProgressCallback());
      promises.push(promise);
    }
    return Promise.all(promises).then(() => ep.close());
  });
}
