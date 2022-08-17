import View from './View';

/**
 * A PhotographerMediasView represents the list of all photos / videos appearing in a photographer page
 */
class PhotographerMediasView extends View {
  /**
   * constructor of the PhotographerMediasView class
   * @param {string} errorMessage Default error message to display when we fail to render the View
   * @returns {Object} The new PhotographerMediasView instance
   * @author Werner Schmid
   */
  constructor(errorMessage) {
    super(document.querySelector('.main__photographer-photos'), errorMessage);
  }

  /**
   * @override
   */
  _generateMarkup() {
    return `
    `;
  }
}

/**
 * The single existing instance of the PhotographerMediasView in the application is instantiated
 */
const photographerMediasView = new PhotographerMediasView(
  'Erreur de chargement des photos du photographe'
);

/**
 * The module exports an instance of the PhotographerMediasView
 */
export default photographerMediasView;
