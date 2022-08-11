import View from './View';

class PhotographerHeaderView extends View {
  /**
   * constructor of the PhotographerHeaderView class
   * @param {string} errorMessage Default error message to display when we fail to render the View
   * @returns {Object} The new PhotographerHeaderView instance
   * @author Werner Schmid
   */
  constructor(errorMessage) {
    super(document.querySelector('.main__photographer-infos'), errorMessage);
  }

  /**
   * @override
   */
  _generateMarkup() {
    return `
    <button class="btn btn--open">Contactez-moi</button>
    `;
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--open');
      if (!btn) return;

      handler();
    });
  }
}

export default new PhotographerHeaderView(
  "Erreur de chargement de l'en-tête du photographe"
);
