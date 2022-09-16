import PhotographerPageComponentView from './photographerPageComponentView';

/**
 * A LightBoxModalView represents the close-up view of a media when clicking on it while being on the photographer page
 */
class LightBoxModalView extends PhotographerPageComponentView {
  /**
   * constructor of the LightBoxModalView class
   * @param {string} errorMessage Default error message to display when we fail to render the View
   * @returns {Object} The new LightBoxModalView instance
   * @author Werner Schmid
   */
  constructor(errorMessage) {
    super(document.querySelector('body'), errorMessage, false);
  }

  /**
   * @override
   */
  _generateMarkup() {
    return this._photographerFactory.mediasFactory.getLightBox(this._data);
  }

  /**
   * Function used to update the view displayed inside the lightbox
   * @param {Object} media The new media we want to display inside the view
   * @returns {Promise} A Promise that will fulfill once the image has finished to load in the view
   * @this {Object} the current LightBoxModalView instance calling the addHandlerClick function
   * @author Werner Schmid
   */
  async updateMedia(media) {
    const newMediaMarkup =
      this._photographerFactory.mediasFactory[
        media.image ? 'getPhoto' : 'getVideo'
      ](media);
    const mediaEl = this._parentElement.querySelector('.lightbox-modal__media');
    const contentEl = mediaEl.parentElement;

    // Remove the previous media item
    mediaEl.remove();

    // Add the new media element to the content view
    contentEl.insertAdjacentHTML('afterbegin', newMediaMarkup);
    // Change the title of the media
    contentEl.querySelector('.lightbox-modal__title').textContent = media.title;

    // Return a fulfilled promise when the media finishes to load
    return new Promise((resolve, _) => {
      document
        .querySelector('.lightbox-modal__media')
        .addEventListener('load', event => {
          resolve();
        });
    });
  }

  /**
   * Function used to add an event listener on the close button subcomponent in the View
   * @param {function} closeBtnHandler Function that will be called when the click event happens to the close button of the lightbox
   * @returns {undefined} No returned value by the function
   * @this {Object} the current LightBoxModalView instance calling the addHandlerClick function
   * @author Werner Schmid
   */
  addHandlerClick(closeBtnHandler, controlsHandler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.lightbox-modal__close-btn');
      const link = e.target.closest('.lightbox-modal__navigation');
      if (!btn && !link) return;
      if (btn) {
        closeBtnHandler();
        return;
      }
      if (link) {
        e.preventDefault();
        const behavior = link.dataset.behavior;
        controlsHandler(this._photographerFactory, behavior);
      }
    });
  }
}

/**
 * The single existing instance of the LightBoxModalView in the application is instantiated
 */
const lightBoxModalView = new LightBoxModalView(
  "Erreur de chargement de la vue rapprochée d'une image"
);

/**
 * The module exports the single instance of the LightBoxModalView
 */
export default lightBoxModalView;
