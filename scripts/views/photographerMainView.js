import View from './View';
import photographerMediasView from './photographerMediasView';
import photographerHeaderView from './photographerHeaderView';

/**
 * A PhotographerPhotosView represents the content of the main semantic view in a photographer page
 */
class PhotographerMainView extends View {
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
    // Check the passed data and render an error message if the data isn't set
    if (!this._checkData(data)) return;
    const { data: photographerData, medias } = data;
    // Update the parent elements of the subviews
    photographerHeaderView.setParentElement(
      document.querySelector('.main__photographer-infos')
    );
    photographerMediasView.setParentElement(
      document.querySelector('.main__photographer-photos')
    );

    // Render the subviews
    photographerHeaderView.render(photographerData);
    photographerMediasView.render(medias);
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
