import exiftool from 'node-exiftool';
import { IRekognitionFile } from '../interfaces';
const ep = new exiftool.ExiftoolProcess();

export async function writeMetadataOnRekognizedImages(
  images: IRekognitionFile[]
) {
  ep.open().then(() => {
    const promises: Promise<any>[] = [];
    for (let image of images) {
      const promise = ep.writeMetadata(
        image.path,
        {
          'Keywords+': [...image.numbers],
        },
        ['overwrite_original']
      );
      promises.push(promise);
    }
    return Promise.all(promises);
  });
}
