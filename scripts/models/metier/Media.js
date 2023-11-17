/**
 * Create media and add function to it
 * @param {object} data
 * @returns {object}
 */
const Media = (data) => {
  const { id, photographerId, title, description, likes, date, price } = data;
  return {
    id,
    photographerId,
    title,
    description,
    likes,
    date,
    price,
  };
};

/**
 * function that inherits from Media and creates an object image
 * @param {object} data
 * @returns {object}
 */
const MediaImage = (data) => {
  const newMedia = Media(data);
  const src = data.image;
  return { type: 'image', src, ...newMedia };
};

/**
 * function that inherits from Media and creates an object video
 * @param {object} data
 * @returns {object}
 */
const MediaVideo = (data) => {
  const newMedia = Media(data);
  const src = data.video;
  return { type: 'video', src, ...newMedia };
};

export { MediaImage, MediaVideo };
