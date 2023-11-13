/* eslint-disable no-unused-vars */

const createPhotographer = (data) => {
  const { name, portrait, city, country, tagline, id, price } = data;
  return { name, portrait, city, country, tagline, id, price };
};

export { createPhotographer };
