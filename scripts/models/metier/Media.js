/**
 * Create media and add function to it
 * @param {object} data
 * @returns {object}
 */
const createMedia = (data) => {
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

const addLike = (numLikes) => {
  return (numLikes += 1);
};
const removeLike = (numLikes) => {
  return (numLikes -= 1);
};

/**
 * function that inherits from createMedia and creates an object image
 * @param {object} data
 * @returns {object}
 */
const createMediaImage = (data) => {
  const newMedia = createMedia(data);
  const src = data.image;
  return { type: 'image', src, ...newMedia };
};

/**
 * function that inherits from createMedia and creates an object video
 * @param {object} data
 * @returns {object}
 */
const createMediaVideo = (data) => {
  const newMedia = createMedia(data);
  const src = data.video;
  return { type: 'video', src, ...newMedia };
};

export { createMediaImage, createMediaVideo, addLike, removeLike };
