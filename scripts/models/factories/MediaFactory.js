import { createMediaImage, createMediaVideo } from '../metier/Media.js';
/**
 * manage media creation depend of its type (photo or video)
 * @param {object} data
 * @returns {object}
 */
const mediaFactory = (data) => {
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

export { mediaFactory };
