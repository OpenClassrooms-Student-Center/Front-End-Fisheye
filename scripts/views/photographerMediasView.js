import PhotographerPageComponentView from './photographerPageComponentView';

/**
 * A PhotographerMediasView represents the list of all photos / videos appearing in a photographer page
 */
class PhotographerMediasView extends PhotographerPageComponentView {
  /**
   * constructor of the PhotographerMediasView class
   * @param {string} errorMessage Default error message to display when we fail to render the View
   * @returns {Object} The new PhotographerMediasView instance
   * @author Werner Schmid
   */
  constructor(errorMessage) {
    super(document.querySelector('.main__photographer-medias'), errorMessage);
  }

  /**
   * @override
   */
  _generateMarkup() {
    return `
    <form action="/" class="main__photographer-filter-form">
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
    </form>
    <div class="main__medias-list" role="list"></div>
    `;
  }

  /**
   * @override
   */
  _postRender() {
    this._photographerFactory.mediaViews.forEach(({ data, view }) => {
      view.setParentElement(
        this._parentElement.querySelector('.main__medias-list')
      );
      view.render(data, false);
    });
  }
}

/**
 * The single existing instance of the PhotographerMediasView in the application is instantiated
 */
const photographerMediasView = new PhotographerMediasView(
  'Erreur de chargement des médias du photographe'
);

/**
 * The module exports an instance of the PhotographerMediasView
 */
export default photographerMediasView;
