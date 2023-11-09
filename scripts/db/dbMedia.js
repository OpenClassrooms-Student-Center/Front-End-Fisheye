/* eslint-disable no-unused-vars */

import { getDatas } from './Api.js';

/**
 * Ce fichier permet de faire le lien avec la base de donnée des medias
 */
function DbMedia() {
  /**
   * Function that retrieves all medias from the JSON database
   * @returns {Promise<array>}
   */
  const getMedias = async () => {
    try {
      const medias = getDatas('../../data/media.json');
      console.log(medias);
      return medias;
    } catch (error) {
      console.log(error.message);
    }
  };
  //TODO readByIdPhotographer()

  // const getMediaType(media) {

  // }
}
