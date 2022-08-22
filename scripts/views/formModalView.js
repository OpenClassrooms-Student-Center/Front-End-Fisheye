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
    super(document.querySelector('body'), errorMessage);
    this._clearContent = false;
  }

  /**
   * @override
   */
  _generateMarkup() {
    return `
    <div class="form-modal" role="dialog" aria-labelledby="#form-modal__title" aria-modal="true">
      <header class="form-modal__header">
        <h2 id="form-modal__title" class="form-modal__title">Contactez-moi</h2>
        <img src="assets/icons/close.svg" class="form-modal__close-btn" aria-label="Close" />
      </header>
      <form class="form-modal__form">
        <div class="form-modal__input">
          <label class="form-modal__input-label">Prénom</label>
          <input
            class="form-modal__input-field form-modal__input-field--text"
          />
        </div>
        <button class="form-modal__submit-btn btn">Envoyer</button>
      </form>
    </div>
      `;
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
