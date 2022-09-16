import View from './View';

/**
 * A MediaView represents the rendering of a media (video or photo) in the lightbox modal
 */
export default class MediaView extends View {
  /**
   * constructor of the MediaView class
   * @param {string} errorMessage Default error message to display when we fail to render the View
   * @this {Object} The new MediaView instance that will be created using the constructor
   * @returns {Object} The new MediaView instance
   * @author Werner Schmid
   */
  constructor(errorMessage) {
    super(document.querySelector('.main__medias-list'), errorMessage, false);
  }

  /**
   * @override
   */
  _generateMarkup() {
    return `
    <article class="card-media" role="listitem">
      <a href="#" class="card-media__link" data-id="${
        this._data.id
      }" role="link" aria-labelledby="card-media__title--${this._data.id}">
        ${this._generateMediaMarkup()}
      </a>
      <div class="card-media__description">
        <h3 class="card-media__title" id="card-media__title--${this._data.id}">
          ${this._data.title}
        </h3>
        <div class="card-media__like-description">
          <span class="card-media__nb-likes" aria-label="Nombre de likes">${
            this._data.likes
          }</span>
          <a href="/media/${
            this._data.id
          }/like" class="card-media__like" role="link" aria-label="Liker l'image">
            <svg class="icon-heart icon-heart--filled" role="img" aria-label="likes">
              <use xlink:href="assets/icons/heart.svg#icon-heart"></use>
            </svg>
          </a>
        </div>
      </div>
    </article>
        `;
  }

  /**
   * Template method used to generate the markup for a specific media
   * @returns {string} The markup displayed by the Media
   * @author Werner Schmid
   */
  _generateMediaMarkup() {
    return '';
  }
}
