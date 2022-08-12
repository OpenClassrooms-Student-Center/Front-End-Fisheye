/**
 * File used to store the state of the application and all its method to retrieve data and modify its internal value
 */

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
    photos: [],
  },
};

/**
 * Function used to retrieve the photographers data from the API and store it into the state
 * @returns {Promise} A resolve Promised if the function succeeded in retrieving the data, a rejected one otherwise
 * @author Werner Schmid
 */
export const getPhotographers = async () => {
  try {
    // Penser à remplacer par les données récupérées dans le json
    const photographers = [
      {
        name: 'Ma data test',
        id: 1,
        city: 'Paris',
        country: 'France',
        tagline: 'Ceci est ma data test',
        price: 400,
        portrait: 'account.png',
      },
      {
        name: 'Autre data test',
        id: 2,
        city: 'Londres',
        country: 'UK',
        tagline: 'Ceci est ma data test 2',
        price: 500,
        portrait: 'account.png',
      },
    ];
    state.photographers = [
      ...photographers,
      ...photographers,
      ...photographers,
    ];
  } catch (err) {
    throw err;
  }
};

/**
 * Function used to retrieve a single photographer from the API and store it into the state
 * @param {string} id The id of the photographer we want to retrieve
 * @returns {Promise} A resolve Promised if the function succeeded in retrieving the data, a rejected one otherwise
 * @author Werner Schmid
 */
export const getPhotographer = async id => {
  try {
    const photographer = {
      name: 'Tracy Galindo',
      id: 82,
      city: 'Montreal',
      country: 'Canada',
      tagline: 'Photographe freelance',
      price: 500,
      portrait: 'TracyGalindo.jpg',
    };
    state.photographer.data = photographer;
  } catch (err) {
    throw new err();
  }
};

/**
 * Function used to retrieve the medias of a single photographer from the API and store it into the state
 * @param {string} id The id of the photographer from whom we want to retrieve the medias
 * @returns {Promise} A resolve Promised if the function succeeded in retrieving the data, a rejected one otherwise
 * @author Werner Schmid
 */
export const getPhotographerPhotos = async id => {
  try {
    const photos = [
      {
        id: 8523492,
        photographerId: 82,
        title: 'Purple Tunnel',
        image: 'Art_Purple_light.jpg',
        likes: 24,
        date: '2018-05-05',
        price: 55,
      },
      {
        id: 75902334,
        photographerId: 82,
        title: 'Art Mine',
        image: 'Art_Mine.jpg',
        likes: 75,
        date: '2019-11-25',
        price: 55,
      },
    ];
    state.photographer.photos = [...photos, ...photos, ...photos];
  } catch (err) {
    throw new err();
  }
};
