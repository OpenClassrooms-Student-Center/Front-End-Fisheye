import View from './View';
import photographerListView from './photographerListView';

/**
 * A IndexMainView represents the content of the main semantic view in the index page
 */
class IndexMainView extends View {
  /**
   * constructor of the IndexMainView class
   * @param {string} errorMessage Default error message to display when we fail to render the View
   * @returns {Object} The new IndexMainView instance
   * @author Werner Schmid
   */
  constructor(errorMessage) {
    super(document.querySelector('.main'), errorMessage);
  }

  /**
   * @override
   */
  render(data) {
    // Check the passed data and render an error message if the data isn't set
    if (!this._checkData(data)) return;
    // Update the parent elements of the subviews
    photographerListView.setParentElement(
      document.querySelector('.main__photographer-list')
    );

    // Render the subviews
    photographerListView.render(data);
  }
}

/**
 * The single existing instance of the IndexMainView in the application is instantiated
 */
const indexMainView = new IndexMainView(
  'Erreur de chargement du contenu principal'
);

/**
 * The module exports the single instance of the IndexMainView
 */
export default indexMainView;
