/*********************************************************************************
*
* Factory method to create media
*
/*********************************************************************************/

import { MediaImage, MediaVideo } from '../metier/Media.js';

/**
 * manage media creation depend of its type (photo or video)
 * @param {object} data
 * @returns {object}
 */
const mediaFactory = (data) => {
  let media;
  if (data.image) {
    media = MediaImage(data);
  } else if (data.video) {
    media = MediaVideo(data);
  } else {
    console.log('Unknown data');
  }
  return media;
};

export { mediaFactory };
