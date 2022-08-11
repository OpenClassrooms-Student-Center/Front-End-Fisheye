import * as model from './model';
import headerView from './views/headerView';
import mainView from './views/mainView';
import photographerListView from './views/photographerListView';
import photographerHeaderView from './views/photographerHeaderView';
import photographerPhotosView from './views/photographerPhotosView';
import formModalView from './views/formModalView';

const controlRenderHeader = () => {
  // Render the header of the page
  headerView.render(model.state.url);
};

const controlRenderMain = () => {
  // Render the main of the page
  mainView.render(model.state.url);
};

const controlRenderFormModal = () => {
  // Render the contact form on a photographer page
  formModalView.render(model.state.photographer.data);
};
const displayModal = () => {
  const modal = document.querySelector('.form-modal');
  modal.style.display = 'flex';
};

const closeModal = () => {
  const modal = document.querySelector('.form-modal');
  modal.style.display = 'none';
};

const controlRenderMainPage = () => {
  model.getPhotographers();
  photographerListView.setParentElement(
    document.querySelector('.main__photographer-list')
  );
  photographerListView.render(model.state.photographers);
};

const controlRenderPhotographerPage = id => {
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
    controlRenderPhotographerPage.bind(photographerHeaderView, id)
  );
  formModalView.addHandlerLoadPage(controlRenderFormModal);

  // EVENT LISTENERS
  window.addEventListener('load', () => {
    photographerHeaderView.addHandlerClick(displayModal);
    formModalView.addHandlerClick(closeModal);
  });
};

init();
