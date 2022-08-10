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
    // Tag requirement:
    // - Images with no numbers should have #
    // - Images with numbers should have 5 chars length and fill the start with 0's
    for (let image of images) {
      if (!image.numbers.length) {
        image.numbers.push('#');
      } else {
        const numbersForTag: Array<string> = [];
        for (let number of image.numbers) {
          numbersForTag.push(padStart(String(number), 5, '0'));
        }
        image.numbers = numbersForTag;
      }
      const promise = ep
        .writeMetadata(
          image.path,
          {
            'Keywords+': [...image.numbers],
          },
          ['overwrite_original']
        )
        .then(() => exifToolProgressCallback())
        .catch(err => exifToolProgressCallback(err));
      promises.push(promise);
    }
    return Promise.all(promises).then(() => ep.close());
  });
}
