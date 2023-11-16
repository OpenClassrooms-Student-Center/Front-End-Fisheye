/**
 * Create media and add function to it
 * @param {object} data
 * @returns {object}
 */
const createMedia = (data) => {
  const { id, photographerId, title, description, likes, date, price } = data;
  // console.log(data);
  const addLike = function () {
    this.likes++;
  };
  const removeLike = function () {
    this.likes--;
  };
  return {
    id,
    photographerId,
    title,
    description,
    likes,
    date,
    price,
    addLike,
    removeLike,
  };
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

export { createMediaImage, createMediaVideo };
