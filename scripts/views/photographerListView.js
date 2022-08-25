import View from './View';
import { photographerFactory } from '../factories/photographer';

/**
 * A PhotographerListView represents the list of all photographers appearing in the main page
 */
class PhotographerListView extends View {
  /**
   * constructor of the PhotographerListView class
   * @param {string} errorMessage Default error message to display when we fail to render the View
   * @returns {Object} The new PhotographerListView instance
   * @author Werner Schmid
   */
  constructor(errorMessage) {
    super(document.querySelector('.main__photographer-list'), errorMessage);
  }

  /**
   * @override
   */
  _generateMarkup() {
    return this._data
      .map(result =>
        photographerFactory({ data: result, medias: [] }).getUserCard()
      )
      .join('\n');
  }
}

/**
 * The single existing instance of the PhotographerListView in the application is instantiated
 */
const photographerListView = new PhotographerListView(
  'Erreur de chargement de la liste des photographes'
);

/**
 * The module exports an instance of the PhotographerListView
 */
export default photographerListView;
