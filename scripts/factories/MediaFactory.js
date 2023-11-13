/* eslint-disable no-unused-vars */
import { createMediaImage, createMediaVideo } from '../models/Media.js';

const MediaFactory = (data) => {
  let media;
  if (data.image) {
    media = createMediaImage(data);
  } else if (data.video) {
    media = createMediaVideo(data);
  } else {
    throw new Error('Unknown data');
  }
  return media;
};

export { MediaFactory };
