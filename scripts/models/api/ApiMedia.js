import { getDatas } from './Api.js';
/**
 * This file links to the media database.
 */
const ApiMedia = () => {
  // CRUD if necessary
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
   * @returns {Promise<array>}
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
