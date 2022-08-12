import PageComponentView from './pageComponentView';

/**
 * A BodyView Represent the whole rendered content in the page
 */
class BodyView extends PageComponentView {
  /**
   * constructor of the BodyView class
   * @param {string} errorMessage Default error message to display when we fail to render the View
   * @returns {Object} The new BodyView instance
   * @author Werner Schmid
   */
  constructor(errorMessage) {
    super(document.querySelector('body'), errorMessage);
    this._clearContent = false;
  }

  /**
   * Function used to add an event listener on the links in the page
   * @param {function} handler Function that will be called when the click event happens to the clicked link
   * @returns {undefined} No returned value by the function
   * @this {Object} the current BodyView instance calling the addHandlerClick function
   * @author Werner Schmid
   */
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', e => {
      e.preventDefault();
      const link = e.target.closest('a');
      if (!link) return;

      handler(link.pathname);
    });
  }
}

/**
 * The module exports an instance of the BodyView
 */
export default new BodyView('Erreur de chargement de la page');
