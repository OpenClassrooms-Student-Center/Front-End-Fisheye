import MediaView from './mediaView';
import { MEDIAS_FOLDER } from '../utils/config';

/**
 * A VideoView represents the rendering of a video in the lightbox modal
 */
export default class VideoView extends MediaView {
  /**
   * @override
   */
  _generateMediaMarkup() {
    return `
    <video class="card-media__img" role="img" aria-label="${this._data.title}, closeup view">
      <source src="${MEDIAS_FOLDER}/videos/${this._data.video}" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    `;
  }
}
