/*********************************************************************************
*
* This file contains Photographer object management
*
/*********************************************************************************/

/**
 * create object photographer with factory pattern
 * @param {object} data
 */
const Photographer = (data) => ({
  name: data.name,
  portrait: data.portrait,
  city: data.city,
  country: data.country,
  tagline: data.tagline,
  id: data.id,
  price: data.price,
});

export { Photographer };
