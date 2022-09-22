import PhotographerPageComponentView from './photographerPageComponentView';
import photographerFilterFormView from './photographerFilterFormView';

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
    </form>
    <div class="main__medias-list" role="list"></div>
    `;
  }

  /**
   * Function used to add an event listener on the image links subcomponents in the View
   * @param {function} handler Function that will be called when the click event happens to the close button of the form
   * @returns {undefined} No returned value by the function
   * @this {Object} the current FormModalView instance calling the addHandlerClick function
   * @author Werner Schmid
   */
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', e => {
      const link = e.target.closest('.card-media__link');
      if (!link) return;
      e.preventDefault();

      const mediaID = link.dataset.id;

      handler(this._photographerFactory, mediaID);
    });
  }

  /**
   * Function used to add an event listener on the like buttons of the images
   * @param {function} handler handler function when we click on a like button for an image
   * @returns {undefined} No returned value by the function
   * @this {Object} the current PhotographerFilterFormView instance calling the addHandlerClick function
   * @author Werner Schmid
   */
  addHandlerLikeImage(handler) {
    this._mediaViews.forEach(mediaView => {
      mediaView.view.addHandlerLike(handler);
    });
  }

  /**
   * Function used to add an event listener when we click on the filter form
   * @param {function} handler Function that will be called when the mouseup event happens on the form
   * @returns {undefined} No returned value by the function
   * @this {Object} the current PhotographerFilterFormView instance calling the addHandlerClick function
   * @author Werner Schmid
   */
  addHandlerMouseUpFilterForm(handler) {
    photographerFilterFormView.addHandlerMouseUp(handler);
  }
  /**
   * Function used to add an event listener when we select an option on the filter form
   * @param {function} handler Function that will be called when the click event happens on the form
   * @returns {undefined} No returned value by the function
   * @this {Object} the current PhotographerFilterFormView instance calling the addHandlerClick function
   * @author Werner Schmid
   */
  addHandlerClickFilterFormOption(handler) {
    photographerFilterFormView.addHandlerClick(handler);
  }

  /**
   * Function used to add an event listener when we submit the filter option form
   * @param {function} handler Function that will be called when the filter form is submitted
   * @returns {undefined} No returned value by the function
   * @this {Object} the current PhotographerFilterFormView instance calling the addHandlerClick function
   * @author Werner Schmid
   */
  addHandlerSubmitFilterForm(handler) {
    photographerFilterFormView.addHandlerSubmit(handler);
  }

  /**
   * @override
   */
  _postRender() {
    this._renderMediaList();
    photographerFilterFormView.setParentElement(
      document.querySelector('.main__photographer-filter-form')
    );
    photographerFilterFormView.setPhotographerFactory(
      this._photographerFactory
    );
    photographerFilterFormView.render(this._data);
  }

  /**
   * Function used to clear the list of medias and re-render it
   * @param {number} checkedValue the value that was checked in the form
   * @returns {undefined} No returned value by the function
   * @this {Object} the current PhotographerFilterFormView instance calling the addHandlerClick function
   * @author Werner Schmid
   */
  updateMediaList(checkedValue) {
    this._parentElement.querySelector('.main__medias-list').innerHTML = '';
    this._renderMediaList(checkedValue);
  }

  /**
   * Function used to render the list of medias in the view
   * @param {number} checkedValue the value that was checked in the form
   * @returns {undefined} No returned value by the function
   * @this {Object} the current PhotographerFilterFormView instance calling the addHandlerClick function
   * @author Werner Schmid
   */
  _renderMediaList(checkedValue = 0) {
    this._mediaViews =
      this._photographerFactory.mediasFactory.getMediaViews(checkedValue);
    this._mediaViews.forEach(({ data, view }) => {
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
