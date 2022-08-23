/**
 * File used to store all controller methods : call the view rendering and the model data loading methods
 */
import * as model from './model';
import headerView from './views/headerView';
import mainView from './views/mainView';
import indexMainView from './views/indexMainView';
import photographerMainView from './views/photographerMainView';
import formModalView from './views/formModalView';
import bodyView from './views/bodyView';

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
const controlRenderFormModal = () => {
  // Render the contact form on a photographer page
  formModalView.render(model.state.photographer.data, false);
};

/**
 * The method takes care of displaying the contact form in a photographer page
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
const displayModal = () => {
  const modal = document.querySelector('.form-modal');
  modal.style.display = 'flex';
};

/**
 * The method takes care of hidding the contact form in a photographer page
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
const closeModal = () => {
  const modal = document.querySelector('.form-modal');
  modal.style.display = 'none';
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
 * The method takes care of rendering the main semantic view of a photographer page
 * @param {number} id ID of the photographer that will be rendered
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
const controlRenderMainPhotographerPage = async id => {
  try {
    // Get the photographer data from the API
    await model.getPhotographer(id);

    // Render the photographer main content
    photographerMainView.render(model.state.photographer);
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
      await controlRenderMainPhotographerPage(id);
      controlRenderFormModal();

      // EVENT LISTENERS
      photographerMainView.addHandlerClick(displayModal);
      photographerMainView.addHandlerFocus(addFocusAnimation);
      formModalView.addHandlerClick(closeModal);
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
