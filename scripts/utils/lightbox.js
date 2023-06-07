/* eslint-disable class-methods-use-this */
/**
 * Class representing a LightBox.
 * @class
 */
class LightBox {
  /**
   * Create a LightBox.
   * @constructor
   * @param {Array} mediaArray - The array of media.
   * @param {string} photographer - The name of the photographer.
   */
  constructor(mediaArray, photographer) {
    this.photographer = photographer;
    this.mediaArray = mediaArray;
    this.lightboxBG = document.querySelector('.lightbox-Bg');
    this.lightbox = document.querySelector('.lightbox');
    this.lightboxMediaContainer = document.querySelector(
      '.lightbox_media-Container'
    );
    this.lightboxCloseBtn = document.querySelector('.lightbox_Close-btn');
    this.nextMedia = document.querySelector('.next');
    this.prevMedia = document.querySelector('.prev');
    this.currentMediaIndex = this.getCurrentMediaindex();
    this.prevMediaIndex = this.currentMediaIndex - 1;
    this.nextMediaIndex = this.currentMediaIndex + 1;
  }

  /**
   * Get the ID of the current media.
   * @returns {string|null} - The ID of the current media, or null if not found.
   */
  getCurrentMediaId() {
    const currentMedia = document.querySelector('.media-link.currentMedia');
    return currentMedia.id;
  }

  /**
   * Set the index of the current media.
   * @param {string} id - The ID of the current media.
   * @returns {Element|null} - The current media element, or null if not found.
   */
  setCurrentMediaIndex(id) {
    if (this.getCurrentMediaId()) {
      const currentMedia = document.querySelector('.currentMedia');
      currentMedia.classList.remove('currentMedia');
    }
    const currentMedia = document.getElementById(id);
    if (currentMedia) {
      currentMedia.classList.add('currentMedia');
    }
    return currentMedia;
  }

  /**
   * Get the index of the current media.
   * @returns {number} - The index of the current media.
   */
  getCurrentMediaindex() {
    const currentMediaId = this.getCurrentMediaId();
    // eslint-disable-next-line eqeqeq
    return this.mediaArray.findIndex((media) => media.id == currentMediaId);
  }

  /**
   * Get the media at the specified index and display it in the lightbox.
   * @param {number} index - The index of the media.
   */
  getMedia(index) {
    this.lightboxMediaContainer.innerHTML = '';

    const mediaTitle = this.mediaArray[index].title;
    const titleBlock = document.createElement('figcaption');
    titleBlock.classList.add('LightboxInTitle');
    titleBlock.innerHTML = mediaTitle;

    const mediaSrc = this.getMediaSrc(index);
    const mediaElement = this.getMediaType(index);
    mediaElement.classList.add('LightboxIn');
    mediaElement.setAttribute(
      'src',
      `./assets/images/${this.photographer}/${mediaSrc}`
    );
    mediaElement.setAttribute('alt', mediaTitle);
      this.lightboxMediaContainer.setAttribute('aria-labelledby', mediaTitle);
    this.lightboxMediaContainer.appendChild(mediaElement);
    this.lightboxMediaContainer.appendChild(titleBlock);

    const currentMedia = document.querySelector('.currentMedia');
    if (currentMedia) {
      if (
        this.currentMediaIndex > 0 &&
        this.currentMediaIndex < this.mediaArray.length
      ) {
        this.setCurrentMediaIndex(this.mediaArray[index].id);
      }
      if (index === this.mediaArray.length - 1) {
        this.nextMedia.classList.add('hidden');
        this.nextMedia.classList.remove('visible');
      } else {
        this.nextMedia.classList.remove('hidden');
        this.nextMedia.classList.add('visible');
      }
      if (this.currentMediaIndex === 0) {
        this.prevMedia.classList.add('hidden');
        this.prevMedia.classList.remove('visible');
      } else {
        this.prevMedia.classList.remove('hidden');
        this.prevMedia.classList.add('visible');
      }
    }
  }

  /**
   * Get the source of the media at the specified index.
   * @param {number} index - The index of the media.
   * @returns {string} - The source of the media.
   */
  getMediaSrc(index) {
    if (this.mediaArray[index].image) {
      return this.mediaArray[index].image;
    }
    if (this.mediaArray[index].video) {
      return this.mediaArray[index].video;
    }
    return '';
  }

  /**
   * Get the type of the media at the specified index.
   * @param {number} index - The index of the media.
   * @returns {HTMLImageElement|HTMLVideoElement} - The media element.
   */
  getMediaType(index) {
    if (this.getMediaSrc(index) === this.mediaArray[index].image) {
      return document.createElement('img');
    }
    const videoElement = document.createElement('video');
    videoElement.setAttribute('controls', 'true');
    return videoElement;
  }

  /**
   * Update the media displayed in the lightbox.
   * @param {number} index - The index of the media to update.
   */
  getMediaUpdate(index) {
    this.lightboxMediaContainer.innerHTML = '';

    const mediaTitle = this.mediaArray[index].title;
    const titleBlock = document.createElement('figcaption');
    titleBlock.classList.add('LightboxInTitle');
    titleBlock.innerHTML = mediaTitle;

    const mediaSrc = this.getMediaSrc(index);
    const mediaElement = this.getMediaType(index);
    mediaElement.classList.add('LightboxIn');
    mediaElement.setAttribute(
      'src',
      `./assets/images/${this.photographer}/${mediaSrc}`
    );
    mediaElement.setAttribute('alt', mediaTitle);

    this.lightboxMediaContainer.appendChild(mediaElement);
    this.lightboxMediaContainer.appendChild(titleBlock);

    const currentMedia = document.querySelector('.currentMedia');
    if (currentMedia) {
      if (
        this.currentMediaIndex > 0 &&
        this.currentMediaIndex < this.mediaArray.length
      ) {
        this.setCurrentMediaIndex(this.mediaArray[index].id);
      }
    }
    if (index === this.mediaArray.length - 1) {
      this.nextMedia.classList.add('hidden');
      this.nextMedia.classList.remove('visible');
    } else {
      this.nextMedia.classList.remove('hidden');
      this.nextMedia.classList.add('visible');
    }
    if (this.currentMediaIndex === 0) {
      this.prevMedia.classList.add('hidden');
      this.prevMedia.classList.remove('visible');
    } else {
      this.prevMedia.classList.remove('hidden');
      this.prevMedia.classList.add('visible');
    }
  }

  /**
   * Open the lightbox.
   */
  open() {
    if (this.lightboxBG) {
      this.lightboxCloseBtn.addEventListener('click', this.close.bind(this));
      this.lightboxCloseBtn.setAttribute('tabindex', '0');
      this.lightboxCloseBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === 13) {
          this.close.bind(this);
        }
      });
      this.lightboxBG.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.key === 27) {
          this.close();
        }
      });

      document.addEventListener('click', (e) => {
        if (e.target === this.lightboxBG && e.target !== this.lightbox) {
          this.close();
        }
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.key === 27) {
          this.close();
        }
      });

      this.prevMedia.addEventListener(
        'click',
        this.switchToPreviousMedia.bind(this)
      );
      this.nextMedia.addEventListener(
        'click',
        this.switchToNextMedia.bind(this)
      );

      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' || e.key === 37) {
          this.switchToPreviousMedia();
        }
        if (e.key === 'ArrowRight' || e.key === 39) {
          this.switchToNextMedia();
        }
      });
    }
    if (
      this.currentMediaIndex === 0 &&
      this.prevMedia.classList.contains('visible')
    ) {
      this.prevMedia.classList.add('hidden');

      this.prevMedia.classList.remove('visible');
    } else if (
      this.currentMediaIndex === this.mediaArray.length - 1 &&
      this.nextMedia.classList.contains('visible')
    ) {
      this.nextMedia.classList.add('hidden');
      this.nextMedia.classList.remove('visible');
    }

    const body = document.getElementById('main-photographer');
    body.setAttribute('aria-hidden', 'true');
    this.lightboxBG.classList.remove('hidden');
    this.lightboxBG.classList.add('visible');
    this.lightboxBG.setAttribute('aria-hidden', 'false');
    this.getMedia(this.currentMediaIndex);
  }

  /**
   * Close the lightbox.
   */
  close() {
    const currentMedia = document.querySelector('.currentMedia');
    currentMedia.classList.remove('currentMedia');
    const body = document.getElementById('main-photographer');
    body.setAttribute('aria-hidden', 'false');
    this.lightboxBG.classList.remove('visible');
    this.lightboxBG.classList.add('hidden');
    this.lightboxBG.setAttribute('aria-hidden', 'true');
    this.lightboxMediaContainer.innerHTML = '';
  }

  /**
   * Switch to the next media.
   */
  switchToNextMedia() {
    this.currentMediaIndex = this.nextMediaIndex;
    this.nextMediaIndex = this.currentMediaIndex + 1;
    this.prevMediaIndex = this.currentMediaIndex - 1;
    this.getMediaUpdate(this.currentMediaIndex);
  }

  /**
   * Switch to the previous media.
   */
  switchToPreviousMedia() {
    this.currentMediaIndex = this.prevMediaIndex;
    this.nextMediaIndex = this.currentMediaIndex + 1;
    this.prevMediaIndex = this.currentMediaIndex - 1;
    this.getMediaUpdate(this.currentMediaIndex);
  }
}

// eslint-disable-next-line import/prefer-default-export
export default LightBox;
