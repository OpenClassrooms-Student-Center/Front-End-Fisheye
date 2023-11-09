/* eslint-disable no-unused-vars */

const createPhotographer = (data) => {
  const { name, portrait, city, country, tagline, id } = data;
  console.log(data);
  return { name, portrait, city, country, tagline, id };
};

export { createPhotographer };
