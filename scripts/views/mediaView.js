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
          <a href="#" class="card-media__like" role="link" aria-label="Liker l'image" data-id="${
            this._data.id
          }" data-liked="${this._data.liked ? true : false}">
            <svg class="icon-heart ${
              this._data.liked ? 'icon-heart--filled' : ''
            }" role="img" aria-label="likes">
              <use xlink:href="assets/icons/heart.svg#icon-heart"></use>
            </svg>
          </a>
        </div>
      </div>
    </article>
        `;
  }

  /**
   * Function used to add an event listener on the like buttons of the images
   * @param {function} handler handler function when we click on a like button for an image
   * @returns {undefined} No returned value by the function
   * @this {Object} the current PhotographerFilterFormView instance calling the addHandlerClick function
   * @author Werner Schmid
   */
  addHandlerLike(handler) {
    this._parentElement.addEventListener('click', event => {
      event.preventDefault();
      event.stopImmediatePropagation();
      const likeBtn = event.target.closest('.card-media__like');
      if (!likeBtn) return;

      handler(likeBtn);
    });
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
