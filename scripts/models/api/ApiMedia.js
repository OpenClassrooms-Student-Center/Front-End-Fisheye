/*********************************************************************************
*
* This file links to the media database.
*
/*********************************************************************************/

import { getDatas } from './Api.js';

const ApiMedia = () => {
  // CRUD if necessary

  /**
   * Function that retrieves all medias from the JSON database
   * @async
   * @returns {Promise<array>}
   */
  const getMedias = async () => {
    try {
      return await getDatas('media.json');
    } catch (error) {
      console.log(error.message);
    }
  };

  /**
   * Function that retrieves a media from the JSON database by photographer id
   * @async
   * @param {number} idP
   * @returns {Promise<array>}
   */
  const getMediasByPhotographerId = async (idP) => {
    try {
      let mediasData = await getMedias();
      mediasData = mediasData.media;
      return mediasData.filter((media) => media.photographerId == idP);
    } catch (error) {
      console.log(error.message);
    }
  };
  return { getMedias, getMediasByPhotographerId };
};
export { ApiMedia };
