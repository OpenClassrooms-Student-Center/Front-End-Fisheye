/*********************************************************************************
*
* This file links to the photographers' database.
*
/*********************************************************************************/

import { getDatas } from './Api.js';

const ApiPhotographers = () => {
  // CRUD if necessary

  /**
   * Function that retrieves all photographers from the JSON database
   * @async
   * @returns {Promise<array>}
   */
  const getPhotographers = async () => {
    try {
      return await getDatas('/photographers.json');
    } catch (error) {
      console.log(error.message);
    }
  };

  /**
   * Function that retrieves a photographer from the JSON database by id
   * @async
   * @param {number} idP
   * @returns {Promise<object>}
   */
  const getPhotographerById = async (idP) => {
    try {
      let photographersData = await getPhotographers();
      photographersData = photographersData.photographers;
      return photographersData.find((photographer) => photographer.id == idP);
    } catch (error) {
      console.log(error.message);
    }
  };

  return { getPhotographers, getPhotographerById };
};

export { ApiPhotographers };
