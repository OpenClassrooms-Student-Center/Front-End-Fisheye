/**
 * File used to store the state of the application and all its method to retrieve data and modify its internal value
 */
import { AJAX_GET } from './utils/helpers';

/**
 *
 * @param {Object} state Object representing the state of the application
 * @param {string} state.url Current url of the application
 * @param {boolean} state.reload Variable that states if the user is reload a page or if it is the first time it is accessing the site
 * @param {array} state.photographers Current photographers in the application, retrieved using an AJAX call to the photographer data
 * @param {Object} state.photographer Current photographer displayed in the application
 * @param {Object} state.photographer.data Current photographer general informations (name, address, ...)
 * @param {array} state.photographer.photos Current photographer's medias
 * @author Werner Schmid
 */
export const state = {
  url: '',
  reload: false,
  photographers: [],
  photographer: {
    data: {},
    medias: [],
  },
  displayedMedia: {},
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
const getPhotographerData = async id => {
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
    // localStorage liked medias
    const likedMedias = localStorage.getItem('likes');
    const data = likedMedias
      ? JSON.parse(likedMedias).map(media => {
          return {
            id: Number.parseInt(media.id),
          };
        })
      : null;

    // Filter the medias by keeping only the medias done by the desired photographer
    const photographerMedias = media.filter(item => {
      // Convert the item's date from a string to a date object
      item.date = new Date(item.date);

      // Add a like if the item is stored in the localStorage
      if (data && data.some(dataItem => item.id === dataItem.id)) {
        item.likes++;
        item.liked = true;
      } else {
        item.liked = false;
      }

      // filter condition
      return item.photographerId === id;
    });

    // Store the medias in the model
    state.photographer.medias = photographerMedias;
  } catch (err) {
    throw err;
  }
};

/**
 * Function used to retrieve a single photographer and his media from the API and store it into the state
 * @param {number} id The id of the photographer we want to retrieve
 * @returns {Promise} A resolve Promised if the function succeeded in retrieving the data, a rejected one otherwise
 * @author Werner Schmid
 */
export const getPhotographer = async id => {
  try {
    // Retrieve the data of the photograph and his medias
    await Promise.all([getPhotographerData(id), getPhotographerMedias(id)]);
  } catch (err) {
    throw err;
  }
};

/**
 * Function used to set the stored url of the state
 * @param {string} url new url of the webpage
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
export const setUrl = url => {
  state.url = url;
};

/**
 * Function used to change the value of the reload parameter
 * @param {boolean} value New true/false value of the reload variable
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
export const setReload = value => {
  state.reload = value;
};

/**
 * Function used to change the displayed media we are showing on the lightbox
 * @param {Object} media New value for the stored media
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
export const updateDisplayedMedia = media => {
  state.displayedMedia = media;
};

/**
 * Function used to simulate the like on a media by the user
 * @param {number} mediaId media we want to store in the user liked medias in the local Storage
 * @param {boolean} newStatus the new liked status of the media
 * @returns {number} 1 if a like was added, -1 if a like was removed, 0 otherwise
 * @author Werner Schmid
 */
export const likeImage = (mediaId, newStatus) => {
  let likedMedias = localStorage.getItem('likes');
  if (!likedMedias && !newStatus) return 0;

  if (!likedMedias) {
    localStorage.setItem('likes', JSON.stringify([{ id: mediaId }]));
    return 1;
  }

  const data = JSON.parse(likedMedias).map(media => {
    return {
      id: Number.parseInt(media.id),
    };
  });
  if (newStatus && data.some(media => media.id === mediaId)) return 0;

  if (!newStatus && !data.some(media => media.id === mediaId)) return 0;

  if (newStatus) {
    data.push({ id: mediaId });
    localStorage.setItem('likes', JSON.stringify(data));
    return 1;
  }

  const newData = data.filter(media => media.id !== mediaId);
  localStorage.setItem('likes', JSON.stringify(newData));
  return -1;
};
