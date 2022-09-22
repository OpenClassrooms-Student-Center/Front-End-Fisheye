import PhotographerPageComponentView from './photographerPageComponentView';
import photographerMediasView from './photographerMediasView';
import photographerHeaderView from './photographerHeaderView';
import photographerMainFooterView from './photographerFooterView';

/**
 * A PhotographerPhotosView represents the content of the main semantic view in a photographer page
 */
class PhotographerMainView extends PhotographerPageComponentView {
  /**
   * constructor of the PhotographerMainView class
   * @param {string} errorMessage Default error message to display when we fail to render the View
   * @returns {Object} The new PhotographerMainView instance
   * @author Werner Schmid
   */
  constructor(errorMessage) {
    super(document.querySelector('.main'), errorMessage);
  }

  /**
   * @override
   */
  render(data) {
    // Set the data-main-page parameter to false on the main component
    this._parentElement.dataset.MainPage = false;
    // Check the passed data and render an error message if the data isn't set
    if (!this._checkData(data)) return;
    const { data: photographerData, medias } = data;

    // Update the parent elements of the subviews
    photographerHeaderView.setParentElement(
      document.querySelector('.main__photographer-infos')
    );
    photographerMediasView.setParentElement(
      document.querySelector('.main__photographer-medias')
    );
    photographerMainFooterView.setParentElement(
      document.querySelector('.main__photographer-footer')
    );

    // Render the subviews
    photographerHeaderView.render(photographerData);
    photographerMediasView.render(medias);
    photographerMainFooterView.render(photographerData);
  }

  /**
   * Function used to add an event listener on the open button subcomponent in the View
   * @param {function} handler Function that will be called when the click event happens to the open button
   * @returns {undefined} No returned value by the function
   * @this {Object} the current PhotographerMainView instance calling the addHandlerClick function
   * @author Werner Schmid
   */
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--open');
      if (!btn) return;

      handler();
    });
  }

  /**
   * Function used to add an event listener on the when we focus the open button in the View
   * @param {function} handler Function that will be called when the focus or hover event happens to the open button
   * @returns {undefined} No returned value by the function
   * @this {Object} the current PhotographerMainView instance calling the addHandlerClick function
   * @author Werner Schmid
   */
  addHandlerFocus(handler) {
    [('focus', 'mouseover')].forEach(el => {
      this._parentElement.addEventListener(el, e => {
        const btn = e.target.closest('.btn--open');
        if (!btn) return;

        handler(btn);
      });
    });
  }

  /**
   * @override
   */
  setPhotographerFactory(factory) {
    // Set the photographer factory variable for the photographer View
    this._photographerFactory = factory;

    // Pass the photographer factory to the photographerHeaderView and the photographerMediasView
    photographerHeaderView.setPhotographerFactory(factory);
    photographerMediasView.setPhotographerFactory(factory);
    photographerMainFooterView.setPhotographerFactory(factory);
  }

  /**
   * Function used to handle when a click happens on a media element
   * @param {function} handler Function called when we click on the media view
   */
  addHandlerClickMedias(handler) {
    photographerMediasView.addHandlerClick(handler);
  }

  /**
   * Function used to add an event listener when we click on the filter form
   * @param {function} handler Function that will be called when the mouseup event happens on the form
   * @returns {undefined} No returned value by the function
   * @this {Object} the current PhotographerFilterFormView instance calling the addHandlerClick function
   * @author Werner Schmid
   */
  addHandlerMouseUpFilterForm(handler) {
    photographerMediasView.addHandlerMouseUpFilterForm(handler);
  }

  /**
   * Function used to add an event listener when we select an option on the filter form
   * @param {function} handler Function that will be called when the click event happens on the form
   * @returns {undefined} No returned value by the function
   * @this {Object} the current PhotographerFilterFormView instance calling the addHandlerClick function
   * @author Werner Schmid
   */
  addHandlerClickFilterFormOption(handler) {
    photographerMediasView.addHandlerClickFilterFormOption(handler);
  }

  /**
   * Function used to add an event listener when we submit the filter option form
   * @param {function} handler Function that will be called when the filter form is submitted
   * @returns {undefined} No returned value by the function
   * @this {Object} the current PhotographerFilterFormView instance calling the addHandlerClick function
   * @author Werner Schmid
   */
  addHandlerSubmitFilterForm(handler) {
    photographerMediasView.addHandlerSubmitFilterForm(handler);
  }

  /**
   * Function used to add an event listener on the like buttons of the images
   * @param {function} handler handler function when we click on a like button for an image
   * @returns {undefined} No returned value by the function
   * @this {Object} the current PhotographerFilterFormView instance calling the addHandlerClick function
   * @author Werner Schmid
   */
  addHandlerLikeImage(handler) {
    photographerMediasView.addHandlerLikeImage(handler);
  }
}

/**
 * The single existing instance of the PhotographerMainView in the application is instantiated
 */
const photographerMainView = new PhotographerMainView(
  'Erreur de chargement du contenu principal'
);

/**
 * The module exports the single instance of the PhotographerMainView
 */
export default photographerMainView;
