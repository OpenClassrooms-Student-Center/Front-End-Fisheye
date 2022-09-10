import PageComponentView from './pageComponentView';

/**
 * A FormModalView represents the form used to contact a photographer
 */
class FormModalView extends PageComponentView {
  /**
   * constructor of the FormModalView class
   * @param {string} errorMessage Default error message to display when we fail to render the View
   * @returns {Object} The new FormModalView instance
   * @author Werner Schmid
   */
  constructor(errorMessage) {
    super(document.querySelector('body'), errorMessage, false);
  }

  /**
   * @override
   */
  _generateMarkup() {
    return this._photographerFactory.getFormModal();
  }

  /**
   * Store the photographer factory into the view
   * @param {Object} factory the photographer factory
   * @returns {undefined} No returned value by the function
   * @this {Object} the current PhotographerMainView instance calling the addHandlerClick function
   * @author Werner Schmid
   */
  setPhotographerFactory(factory) {
    this._photographerFactory = factory;
  }

  /**
   * Handles the load event to render
   * @param {function} handler handler function that will be invoked when the load event listener will be triggered
   * @return {Promise} A Promise that will resolve once the whole page is rendered and the given handler executed
   * @author Werner Schmid
   */
  addHandlerLoadPage(handler) {
    return new Promise((resolve, _) => {
      window.addEventListener('load', event => {
        event.preventDefault();
        handler();
        resolve();
      });
    });
  }

  /**
   * Function used to add an event listener on the close button subcomponent in the View
   * @param {function} handler Function that will be called when the click event happens to the close button of the form
   * @returns {undefined} No returned value by the function
   * @this {Object} the current FormModalView instance calling the addHandlerClick function
   * @author Werner Schmid
   */
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.form-modal__close-btn');
      if (!btn) return;

      handler();
    });
  }
}

/**
 * The single existing instance of the FormModalView in the application is instantiated
 */
const formModalView = new FormModalView(
  'Erreur de chargement du formulaire de contact'
);

/**
 * The module exports the single instance of the FormModalView
 */
export default formModalView;
