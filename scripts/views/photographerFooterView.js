import PhotographerPageComponentView from './photographerPageComponentView';

/**
 * A PhotographerMainFooterView represents the footer informations of a Photographer
 */
class PhotographerMainFooterView extends PhotographerPageComponentView {
  /**
   * constructor of the PhotographerMainFooterView class
   * @param {string} errorMessage Default error message to display when we fail to render the View
   * @returns {Object} The new PhotographerMainFooterView instance
   * @author Werner Schmid
   */
  constructor(errorMessage) {
    super(document.querySelector('.main__photographer-footer'), errorMessage);
  }

  /**
   * @override
   */
  _generateMarkup() {
    return this._photographerFactory.getUserFooter();
  }
}

/**
 * The single existing instance of the PhotographerMainFooterView in the application is instantiated
 */
const photographerMainFooterView = new PhotographerMainFooterView(
  'Erreur de chargement du pied de page du photographe'
);

/**
 * The module exports an instance of the PhotographerMainFooterView
 */
export default photographerMainFooterView;
