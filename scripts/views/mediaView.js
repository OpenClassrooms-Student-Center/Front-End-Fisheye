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
    super(document.querySelector('.lightbox-modal'), errorMessage);
  }
}
