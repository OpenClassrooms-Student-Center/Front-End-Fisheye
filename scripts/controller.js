/**
 * File used to store all controller methods : call the view rendering and the model data loading methods
 */
import * as model from './model';
import headerView from './views/headerView';
import mainView from './views/mainView';
import indexMainView from './views/indexMainView';
import photographerMainView from './views/photographerMainView';
import formModalView from './views/formModalView';
import lightBoxModalView from './views/lightboxModalView';
import bodyView from './views/bodyView';
import { photographerFactory } from './factories/photographer';

/**
 * The method takes care of rendering the header semantic tag of the HTML page based on the url
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
const controlRenderHeader = () => {
  // Render the header of the page
  if (model.state.reload) {
    headerView.reload(model.state.url);
    return;
  }

  headerView.render(model.state.url);
};

/**
 * The method takes care of rendering the main semantic tag of the HTML page based on the url
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
const controlRenderMain = () => {
  // Render the main of the page
  mainView.render(model.state.url);
};

/**
 * The method takes care of rendering the contact form in a photographer page
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
const controlRenderFormModal = factory => {
  // Set the photographer Factory for the view
  formModalView.setPhotographerFactory(factory);

  // Render the contact form on a photographer page
  formModalView.render(model.state.photographer.data, false);
};

/**
 * The method takes care of displaying the contact form in a photographer page
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
const displayModal = () => {
  const modalBg = document.querySelector('.form-modal__background');
  modalBg.style.display = 'block';
  setTimeout(() => {
    modalBg.dataset.hidden = false;
  }, 500);
};

/**
 * The method takes care of hidding the contact form in a photographer page
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
const closeModal = () => {
  const modalBg = document.querySelector('.form-modal__background');
  modalBg.dataset.hidden = true;
  setTimeout(() => {
    modalBg.style.display = 'none';
  }, 1000);
};

/**
 * Function used to handle the submission of the contact form
 * @param {Object[]} datas Data transmitted by the form when submitting it
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
const submitFormModalForm = datas => {
  // Display an alert message
  alert('Your request was submitted !');

  // Print the data in the console
  datas.forEach(data => {
    console.log(`${data.name} : ${data.value}`);
  });

  // Close the contact form modal
  closeModal();
};

/**
 * Function used to render the lightbox containing the media to display
 * @param {Object} factory The photographer factory
 * @param {string} mediaId The id of the media we want to display
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
const controlRenderLightboxModal = (factory, mediaId = '') => {
  // Set the photographer Factory for the View
  lightBoxModalView.setPhotographerFactory(factory);

  // Update the media stored in the model
  model.updateDisplayedMedia(factory.mediasFactory.currentMedia(mediaId));

  // Render the lightbox modal view on a photographer page
  lightBoxModalView.render(model.state.displayedMedia, false);
};

/**
 * Function used to display the lightbox when hidden
 * @param {Object} factory the photographer factory
 * @param {string} mediaId The id of the media we want to display
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
const displayLightBox = (factory, mediaId) => {
  // Update the media in the model and the media displayed inside the view
  updateItemLightBox(factory, mediaId);

  // Display the lightbox view
  const lightBoxBg = document.querySelector('.lightbox-modal__background');
  lightBoxBg.style.display = 'block';
  setTimeout(() => {
    lightBoxBg.dataset.hidden = false;
  }, 500);
};

/**
 * Function used to close the lightbox when it is displayed
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
const closeLightBox = () => {
  const lightBoxBg = document.querySelector('.lightbox-modal__background');
  lightBoxBg.dataset.hidden = true;
  setTimeout(() => {
    lightBoxBg.style.display = 'none';
  }, 1000);
};

const navigateToAdjacentImage = (factory, behavior) => {
  // Update the media element in the model
  model.updateDisplayedMedia(factory.mediasFactory[behavior]());

  // Update the media in the model and the media displayed inside the view
  updateItemLightBox(factory, model.state.displayedMedia.id);
};

/**
 * Function used to update the content inside the lightbox modal
 * @param {Object} factory the photographer factory
 * @param {string} mediaId The id of the media we want to display
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
const updateItemLightBox = (factory, mediaId) => {
  // Update the media stored in the model
  model.updateDisplayedMedia(factory.mediasFactory.currentMedia(mediaId));

  // Update the current media in the view
  lightBoxModalView.updateMedia(model.state.displayedMedia).catch(err => {
    console.error(err);
  });
};

const addFocusAnimation = btn => {
  btn.dataset.firstFocus = false;
};

/**
 * The method takes care of rendering the main semantic view content in the main page, containing the list of photographers
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
const controlRenderMainPage = async () => {
  try {
    // Get the list of all photographers
    await model.getPhotographers();

    // Render the main content of the index page
    indexMainView.render(model.state.photographers);
  } catch (err) {
    throw err;
  }
};

/**
 * The method takes care of rendering the main semantic view of a photographer page and instanciate the photographer factory for the page
 * @param {number} id ID of the photographer that will be rendered
 * @returns {Object} The photographer factory for the user with the ID of id
 * @author Werner Schmid
 */
const controlRenderMainPhotographerPage = async id => {
  try {
    // Get the photographer data from the API
    await model.getPhotographer(id);

    // Get the photographer factory from the model
    const factory = photographerFactory(model.state.photographer);

    // Set the photographer Factory for the view
    photographerMainView.setPhotographerFactory(factory);

    // Render the photographer main content
    photographerMainView.render(model.state.photographer);

    // Returns the photographer factory
    return factory;
  } catch (err) {
    throw err;
  }
};

/**
 * Function used to handle the navigation in the site without reloading the page
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
const navigateTo = url => {
  model.setUrl(url);
  history.pushState(null, null, model.state.url);
  reload().catch(err => {
    console.error(err.message);
  });
};

/**
 * Function used to render the views of the page
 * @returns {Promise} a resolved promise if it achieved to render the views and a rejected one otherwise
 * @author Werner Schmid
 */
const renderComponents = async () => {
  try {
    // Non existing page
    if (
      model.state.url !== '/' &&
      model.state.url.slice(0, 13) !== '/photographer'
    ) {
      throw new Error('Not Found');
    }
    if (model.state.url === '/') {
      // Render the list of photographers if we are on the main page
      // Add the event listeners for the main page
      // DISPLAY
      await controlRenderMainPage();
      // EVENT LISTENERS
      if (!model.state.reload) bodyView.addHandlerClick(navigateTo);
      return;
    }

    // Render the photographer Header, the photographer Photo list and the form modal if we are on a photographer page
    // Add the event listeners for a photographer page
    if (model.state.url.slice(0, 13) === '/photographer') {
      // Get the id of the photographer that has to be rendered
      const id = Number(model.state.url.slice(14));
      if (isNaN(id)) throw new Error('Not Found');
      // DISPLAY
      const factory = await controlRenderMainPhotographerPage(id);
      controlRenderFormModal(factory);
      controlRenderLightboxModal(factory);

      // EVENT LISTENERS
      photographerMainView.addHandlerClick(displayModal);
      photographerMainView.addHandlerFocus(addFocusAnimation);
      photographerMainView.addHandlerClickMedias(displayLightBox);
      formModalView.addHandlerClick(closeModal);
      formModalView.addHandlerSubmit(submitFormModalForm);
      lightBoxModalView.addHandlerClick(closeLightBox, navigateToAdjacentImage);
      return;
    }
  } catch (err) {
    throw err;
  }
};

/**
 * Function used to reload the views of the page
 * @returns {Promise} a resolved promise if it achieved to reload the views and a rejected one otherwise
 * @author Werner Schmid
 */
const reload = async () => {
  try {
    // Reload the Header and the Main View in the page
    controlRenderHeader();
    controlRenderMain();

    // Render the components of the page
    await renderComponents();
  } catch (err) {
    throw err;
  }
};

/**
 * Router function used to initialize the whole web page and the initial state of the page
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
const init = async () => {
  try {
    // Get the url of the user and store it in the model
    const url = document.location.href.replace(document.location.origin, '');

    // Store the url into the state object
    model.setUrl(url);

    // Render the Header and the Main View in the page
    await Promise.all([
      headerView.addHandlerLoadPage(controlRenderHeader),
      mainView.addHandlerLoadPage(controlRenderMain),
    ]);

    // Render the components of the page
    await renderComponents();
    model.setReload(true);
  } catch (err) {
    throw err;
  }
};

/**
 * Initialisation of the application
 */
init().catch(err => {
  console.error(err.message);
});
window.addEventListener('popstate', event => {
  event.preventDefault();
  navigateTo(document.location.href.replace(document.location.origin, ''));
});
