import MediaView from './mediaView';
import { MEDIAS_FOLDER } from '../utils/config';

/**
 * A PhotoView represents the rendering of a photo in the lightbox modal
 */
export default class PhotoView extends MediaView {
  /**
   * @override
   */
  _generateMediaMarkup() {
    return `
    <img src="${MEDIAS_FOLDER}photos/${this._data.image}" alt="${this._data.title}, closeup view" class="card-media__img" />
    `;
  }
}
