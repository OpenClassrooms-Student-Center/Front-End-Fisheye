import { getDatas } from './Api.js';
/**
 * This file provides a link to the photographers' database.
 */
const ApiPhotographers = () => {
  // CRUD if necessary

  /**
   * Function that retrieves all photographers from the JSON database
   * @returns {Promise<array>}
   */
  const getPhotographers = async () => {
    try {
      const photographers = await getDatas('/photographers.json');
      console.log(photographers);
      return photographers;
    } catch (error) {
      console.log(error.message);
    }
  };

  /**
   * Function that retrieves a photographer from the JSON database by id
   * @param {number} idP
   * @returns {Promise<object>}
   */
  const getPhotographerById = async (idP) => {
    try {
      let photographersData = await getPhotographers();
      photographersData = photographersData.photographers;
      const photographerDataFiltered = photographersData.find(
        (photographer) => photographer.id == idP
      );
      return photographerDataFiltered;
    } catch (error) {
      console.log(error.message);
    }
  };

  return { getPhotographers, getPhotographerById };
};

export { ApiPhotographers };
