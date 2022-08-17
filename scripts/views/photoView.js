import MediaView from './mediaView';

/**
 * A PhotoView represents the rendering of a photo in the lightbox modal
 */
export default class PhotoView extends MediaView {
  /**
   * @override
   */
  _generateMarkup() {
    return `
    <picture>
      <source srcset="/media/cc0-images/surfer-240-200.jpg" media="(min-width: 800px)">
      <img src="/media/cc0-images/painted-hand-298-332.jpg" alt="" />
    </picture>
        `;
  }
}
