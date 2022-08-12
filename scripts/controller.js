/**
 * File used to store all controller methods : call the view rendering and the model data loading methods
 */
import * as model from './model';
import headerView from './views/headerView';
import mainView from './views/mainView';
import photographerListView from './views/photographerListView';
import photographerHeaderView from './views/photographerHeaderView';
import photographerPhotosView from './views/photographerPhotosView';
import formModalView from './views/formModalView';

/**
 * The method takes care of rendering the header semantic tag of the HTML page based on the url
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
const controlRenderHeader = () => {
  // Render the header of the page
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
  formModalView.render(model.state.photographer.data);
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

/**
 * The method takes care of rendering the main semantic view content in the main page, containing the list of photographers
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
const controlRenderMainPage = () => {
  model.getPhotographers();
  photographerListView.setParentElement(
    document.querySelector('.main__photographer-list')
  );
  photographerListView.render(model.state.photographers);
};

/**
 * The method takes care of rendering the main semantic view of a photographer page
 * @param {string} id ID of the photographer that will be rendered
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
const controlRenderMainPhotographerPage = id => {
  // Render the header of the photographer
  model.getPhotographer(id);
  photographerHeaderView.setParentElement(
    document.querySelector('.main__photographer-infos')
  );
  photographerHeaderView.render(model.state.photographer.data);
  // Render the list of photos of the photographer
  model.getPhotographerPhotos('id');
  photographerPhotosView.setParentElement(
    document.querySelector('.main__photographer-photos')
  );
  photographerPhotosView.render(model.state.photographer.photos);
};

/**
 * Function used to initialize the whole web page and the initial state of the page
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
const init = () => {
  // Get the url of the user and store it in the model
  const url = document.location.href.replace(document.location.origin, '');

  // Store the url into the state object
  model.state.url = url;

  // Render the Header and the Main View in the page
  headerView.addHandlerLoadPage(controlRenderHeader);
  mainView.addHandlerLoadPage(controlRenderMain);

  // Render the list of photographers if we are on the main page
  // Add the event listeners for the main page
  if (model.state.url === '/') {
    // DISPLAY
    mainView.addHandlerLoadPage(controlRenderMainPage);
    return;
  }

  // Render the photographer Header, the photographer Photo list and the form modal if we are on a photographer page
  // Add the event listeners for a photographer page
  // TODO : Get the id of the photographer to be rendered
  const id = 'id';
  // DISPLAY
  mainView.addHandlerLoadPage(
    controlRenderMainPhotographerPage.bind(photographerHeaderView, id)
  );
  formModalView.addHandlerLoadPage(controlRenderFormModal);

  // EVENT LISTENERS
  window.addEventListener('load', () => {
    photographerHeaderView.addHandlerClick(displayModal);
    formModalView.addHandlerClick(closeModal);
  });
};

/**
 * Initialisation of the application
 */
init();
