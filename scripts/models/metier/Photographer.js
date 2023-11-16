/**
 * create object photographer
 * @param {object} data
 * @returns {object}
 */
const Photographer = (data) => {
  const { name, portrait, city, country, tagline, id, price } = data;
  return { name, portrait, city, country, tagline, id, price };
};

export { Photographer };
