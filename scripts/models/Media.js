/* eslint-disable no-unused-vars */
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

const createMediaImage = (data) => {
  // console.log("it's an image");
  const newMedia = createMedia(data);
  const src = data.image;
  return { type: 'image', src, ...newMedia };
};

const createMediaVideo = (data) => {
  // console.log("it's a video");
  const newMedia = createMedia(data);
  const src = data.video;
  return { type: 'video', src, ...newMedia };
};

export { createMediaImage, createMediaVideo };
