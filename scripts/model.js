/**
 * File used to store the state of the application and all its method to retrieve data and modify its internal value
 */
import { AJAX_GET } from './utils/helpers';

/**
 *
 * @param {Object} state Object representing the state of the application
 * @param {string} state.url Current url of the application
 * @param {array} state.photographers Current photographers in the application, retrieved using an AJAX call to the photographer data
 * @param {Object} state.photographer Current photographer displayed in the application
 * @param {Object} state.photographer.data Current photographer general informations (name, address, ...)
 * @param {array} state.photographer.photos Current photographer's medias
 * @author Werner Schmid
 */
export const state = {
  url: '',
  photographers: [],
  photographer: {
    data: {},
    medias: [],
  },
};

/**
 * Function used to retrieve the photographers data from the API and store it into the state
 * @returns {Promise} A resolved Promised if the function succeeded in retrieving the data, a rejected one otherwise
 * @author Werner Schmid
 */
export const getPhotographers = async () => {
  try {
    // Retrieve the photographers from the JSON file
    const { photographers } = await AJAX_GET(
      __dirname + 'data/photographers.json'
    );

    // Store the datas into the model
    state.photographers = photographers;
  } catch (err) {
    throw err;
  }
};

/**
 * Function used to retrieve a single photographer from the API and store it into the state
 * @param {number} id The id of the photographer we want to retrieve
 * @returns {Promise} A resolve Promised if the function succeeded in retrieving the data, a rejected one otherwise
 * @author Werner Schmid
 */
export const getPhotographer = async id => {
  try {
    // Retrieve the data of the photograph from the JSON file
    const { photographers } = await AJAX_GET(
      __dirname + 'data/photographers.json'
    );
    const photographer = photographers.find(
      photographer => photographer.id === id
    );

    // Store the photograph into the model
    state.photographer.data = photographer;
  } catch (err) {
    throw err;
  }
};

/**
 * Function used to retrieve the medias of a single photographer from the API and store it into the state
 * @param {number} id The id of the photographer from whom we want to retrieve the medias
 * @returns {Promise} A resolve Promised if the function succeeded in retrieving the data, a rejected one otherwise
 * @author Werner Schmid
 */
export const getPhotographerMedias = async id => {
  try {
    // Retrieve the data of the medias from the JSON file
    const { media } = await AJAX_GET(__dirname + 'data/photographers.json');

    // Filter the medias by keeping only the medias done by the desired photographer
    const photographerMedias = media.filter(item => item.photographerId === id);

    // Store the medias in the model
    state.photographer.medias = photographerMedias;
  } catch (err) {
    throw err;
  }
};
