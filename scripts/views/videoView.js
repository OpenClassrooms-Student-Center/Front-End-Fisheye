import MediaView from './mediaView';

/**
 * A VideoView represents the rendering of a video in the lightbox modal
 */
export default class VideoView extends View {
  /**
   * @override
   */
  _generateMarkup() {
    return `
    <video width="320" height="240" poster="/images/w3schools_green.jpg" controls>
      <source src="movie.mp4" type="video/mp4">
      <source src="movie.ogg" type="video/ogg">
      Your browser does not support the video tag.
    </video>
        `;
  }
}
