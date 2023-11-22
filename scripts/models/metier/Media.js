/*********************************************************************************
*
* This file contains Media object management
*
/*********************************************************************************/

/**
 * Create object media with factory pattern
 * @param {object} data
 */
const Media = (data) => ({
  id: data.id,
  photographerId: data.photographerId,
  title: data.title,
  date: data.date,
  price: data.price,
  likes: data.likes,
  addLike() {
    this.likes += 1;
  },
  removeLike() {
    this.likes -= 1;
  },
  getLikes() {
    return this.likes;
  },
});

/**
 * function that inherits from Media and creates an image
 * @param {object} data
 * @returns {object}
 */
const MediaImage = (data) => {
  const newMedia = Media(data);
  const src = data.image;
  return { ...newMedia, type: 'image', src };
};

/**
 * function that inherits from Media and creates a video
 * @param {object} data
 * @returns {object}
 */
const MediaVideo = (data) => {
  const newMedia = Media(data);
  const src = data.video;
  return { ...newMedia, type: 'video', src };
};

export { MediaImage, MediaVideo };
