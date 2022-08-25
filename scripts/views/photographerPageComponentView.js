import View from './View';

/**
 * A PhotographerPageComponentView represents a view displayed in the Photographer Page
 */
class PhotographerPageComponentView extends View {
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
}

/**
 * The module export the PhotographerPageComponentView class
 */
export default PhotographerPageComponentView;
