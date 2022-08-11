import PageComponentView from './pageComponentView';

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
    <div class="form-modal">
      <header class="form-modal__header">
        <h2 class="form-modal__title">Contactez-moi</h2>
        <img
          src="assets/icons/close.svg"
          class="form-modal__close-btn"
        />
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
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.form-modal__close-btn');
      if (!btn) return;

      handler();
    });
  }
}

export default new FormModalView(
  'Erreur de chargement du formulaire de contact'
);
