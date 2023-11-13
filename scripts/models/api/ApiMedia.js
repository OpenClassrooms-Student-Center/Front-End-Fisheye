/* eslint-disable no-unused-vars */

import { getDatas } from './Api.js';
/**
 * Ce fichier permet de faire le lien avec la base de donnée des medias
 */
const ApiMedia = () => {
  /**
   * Function that retrieves all medias from the JSON database
   * @returns {Promise<array>}
   */
  const getMedias = async () => {
    try {
      const medias = await getDatas('media.json');
      return medias;
    } catch (error) {
      console.log(error.message);
    }
  };
  /**
   * Function that retrieves a media from the JSON database by photographer id
   * @param {number} idP
   * @returns {Promise<object>}
   */
  const getMediasByPhotographerId = async (idP) => {
    try {
      let mediasData = await getMedias();
      mediasData = mediasData.media;
      const mediasDataFiltered = mediasData.filter(
        (media) => media.photographerId == idP
      );
      return mediasDataFiltered;
    } catch (error) {
      console.log(error.message);
    }
  };
  return { getMedias, getMediasByPhotographerId };
};
export { ApiMedia };
