/* eslint-disable no-unused-vars */
import createMediaImage from '../models/Media.js';
import createMediaVideo from '../models/Media.js';
const MediaFactory = (data) => {
  if (data.image) {
    return createMediaImage(data);
  } else if (data.video) {
    return createMediaVideo(data);
  } else {
    throw 'Unknown data';
  }
};

export { MediaFactory };
