import PhotographerPageComponentView from './photographerPageComponentView';

/**
 * A PhotographerFilterFormView represents the filter form's view, used to display the images in a certain order
 */
class PhotographerFilterFormView extends PhotographerPageComponentView {
  /**
   * constructor of the PhotographerFilterFormView class
   * @param {string} errorMessage Default error message to display when we fail to render the View
   * @returns {Object} The new PhotographerFilterFormView instance
   * @author Werner Schmid
   */
  constructor(errorMessage) {
    super(
      document.querySelector('.main__photographer-filter-form'),
      errorMessage
    );
  }

  /**
   * Function used to add an event listener when we click on a filter option
   * @param {function} handler Function that will be called when the click event happens on the form
   * @returns {undefined} No returned value by the function
   * @this {Object} the current PhotographerFilterFormView instance calling the addHandlerClick function
   * @author Werner Schmid
   */
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', event => {
      const input = event.target.closest(
        '.main__photographer-filter-option-choice'
      );
      if (!input) return;

      const checkedInput = document.querySelector(
        '.main__photographer-filter-option-choice[aria-checked="true"]'
      );

      handler(input, checkedInput, this._parentElement);
    });
  }

  /**
   * Function used to add an event listener when we click on the filter form
   * @param {function} handler Function that will be called when the mouseup event happens on the form
   * @returns {undefined} No returned value by the function
   * @this {Object} the current PhotographerFilterFormView instance calling the addHandlerClick function
   * @author Werner Schmid
   */
  addHandlerMouseUp(handler) {
    this._parentElement.addEventListener('mouseup', event => {
      const target = event.target.closest('.main__photographer-filter-input');

      handler(target);
    });
  }

  /**
   * Function used to add an event listener when we submit the filter option form
   * @param {function} handler Function that will be called when the filter form is submitted
   * @returns {undefined} No returned value by the function
   * @this {Object} the current PhotographerFilterFormView instance calling the addHandlerClick function
   * @author Werner Schmid
   */
  addHandlerSubmit(handler) {
    this._parentElement.addEventListener('submit', event => {
      event.preventDefault();

      handler(this._parentElement, this._photographerFactory);
    });
  }
  /**
   * @override
   */
  _generateMarkup() {
    return `
    <label class="main__photographer-filter-label" id="main__photographer-filter-label">Trier par</label>
    <div role="radiogroup" aria-labelledby="main__photographer-filter-label" class="main__photographer-filter-input">
      <span class="main__photographer-filter-choosen-option" aria-hidden="true">Popularité</span>
      <div class="main__photographer-filter-option-display" aria-hidden="true">
        <label for="option-0" class="main__photographer-filter-option-label">Popularité</label>
        <input id="option-0" role="radio" tabindex="0" aria-checked="true" type="radio" value="0" name="filter" checked class="main__photographer-filter-option-choice" />
        <label for="option-1" class="main__photographer-filter-option-label">Date</label>
        <input id="option-1" role="radio" tabindex="-1" aria-checked="false" type="radio" value="1" name="filter" class="main__photographer-filter-option-choice" />
        <label for="option-2" class="main__photographer-filter-option-label">Titre</label>
        <input id="option-2" role="radio" tabindex="-1" aria-checked="false" type="radio" value="2" name="filter" class="main__photographer-filter-option-choice" />
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-chevron-down" viewBox="0 0 16 16" role="img" aria-hidden="true">
        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
      </svg>
    </div>
    <input type="submit" class="main__photographer-submit-btn" aria-hidden="true" />
      `;
  }
}

/**
 * The single existing instance of the PhotographerFilterFormView in the application is instantiated
 */
const photographerFilterFormView = new PhotographerFilterFormView(
  "Erreur de chargement du filtre de la page d'un photographe"
);

/**
 * The module exports an instance of the PhotographerFilterFormView
 */
export default photographerFilterFormView;
