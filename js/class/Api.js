/**
 * class Api
 */
export default class Api {
  static photographers;
  static media;

  /**
   * ENG: This function retrieves all json data
   * FRA: Cette fonction récupère toutes les données json
   */
  static init = async () => {
    /* ENG: Retrieve json data with fetch */
    /* FRA: Récuperation des donnéees json avec fetch */
    const request = await fetch('../../data/photographers.json');

    /* ENG: If the request is ok */
    /* FR: Si la requête est ok */
    if (request.ok) {
      console.log('Data loaded !');
    /* ENG: If the request is not ok we display a message and the status code */
    /* FRA: Si la requête n'est pas correct on affiche un message et le code du status */
    } else if (!request.ok) {
      console.log('Data no found', `status code: ${request.status}`);
    };

    /* ENG: Store json data from the request into a variable */
    /* FRA: Stocker les données json de la requête dan une variable */
    const data = await request.json();

    /* ENG: Store photographers data into the static photographers into Api class */
    /* FRA: Stocker les données des photographes dans static photographers dans Api class */
    Api.photographers = data.photographers;
    Api.medias = data.media;
  };

  /* GETTERS */

  /**
   * ENG: Get all Photographers
   * FRA: Obtenir tous les photographes
   * @returns {object}
   */
  static getAllPhotographers = () => {
    return Api.photographers;
  };

  /**
   * ENG: Get photographer by id
   * FRA: Obtenir le photogaphe par son id
   * @param {number} id
   * @returns {object}
   */
  static getPhotographerById = (id) => {
    id = parseInt(id, 10);

    if (!isNaN(id)) {
      const res = Api.photographers.find(photographer => photographer.id === id);
      return res;
    }
  };

  /**
   * ENG: Get photogapher's media
   * FRA: Obtenir les media d'un photographe par son id
   * @param {number} id
   */
  static getPhotographerMedia = (id) => {
    id = parseInt(id);
    return Api.medias.filter(media => media.photographerId === id);
  };
}
