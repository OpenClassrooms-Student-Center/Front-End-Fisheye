import View from './View';

/**
 * A PhotographerPhotosView represents the list of all photos / videos appearing in a photographer page
 */
class PhotographerPhotosView extends View {
  /**
   * constructor of the PhotographerPhotosView class
   * @param {string} errorMessage Default error message to display when we fail to render the View
   * @returns {Object} The new PhotographerPhotosView instance
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
 * The module exports an instance of the PhotographerPhotosView
 */
export default new PhotographerPhotosView(
  'Erreur de chargement des photos du photographe'
);
