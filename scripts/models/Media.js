/* eslint-disable no-unused-vars */
const createMedia = (data) => {
  const { id, photographerId, title, likes, date, price } = data;
  console.log(data);
  console.log(id, photographerId, title, likes, date, price);
  const addLike = function () {
    this.likes++;
  };
  const removeLike = function () {
    this.likes--;
  };
  return { id, photographerId, title, likes, date, price, addLike, removeLike };
};

const createMediaImage = (data) => {
  const media = createMedia(data);
  return { type: 'image', ...media };
};

const createMediaVideo = (data) => {
  const media = createMedia(data);
  return { type: 'video', ...media };
};
