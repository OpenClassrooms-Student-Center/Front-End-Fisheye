export default class Lightbox {
  static init() {
    const links = Array.from(document.querySelectorAll('.media__article a'));
    const media = links.map((link) => link.getAttribute('href'));
    const titles = links.map((title) => title.getAttribute('alt'));
    links.forEach((link) =>
      link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('body').classList.add('noscroll');
        const lightbox = new Lightbox(
          e.currentTarget.getAttribute('href'),
          media,
          e.currentTarget.getAttribute('alt'),
          titles,
        );
      }),
    );
  }

  constructor(url, media, title, titles) {
    this.titles = titles;
    this.element = this.buildDOM();
    this.media = media;
    this.loadMedia(url, title);
    this.onKeyUp = this.onKeyUp.bind(this);
    document.body.appendChild(this.element);
    document.addEventListener('keyup', this.onKeyUp);
  }

  static getExtensionUrl(url) {
    return url.split('.').pop();
  }

  buildDOM() {
    const dom = document.createElement('div');
    dom.classList.add('lightbox');
    dom.innerHTML = `
      <button class="lightbox__close">
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <title>Close dialog</title>
          <path d="M42 4.23L37.77 0L21 16.77L4.23 0L0 4.23L16.77 21L0 37.77L4.23 42L21 25.23L37.77 42L42 37.77L25.23 21L42 4.23Z" fill="#911C1C"/>
        </svg>
      </button>
      <button class="lightbox__next">
        <svg width="30" height="48" viewBox="0 0 30 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <title>Next image</title>
          <path d="M0.360108 5.64L18.6801 24L0.360107 42.36L6.00011 48L30.0001 24L6.00011 3.88195e-06L0.360108 5.64Z" fill="#911C1C"/>
        </svg>
      </button>
      <button class="lightbox__prev">
        <svg width="30" height="48" viewBox="0 0 30 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <title>Previous image</title>
          <path d="M29.6399 42.36L11.3199 24L29.6399 5.64L23.9999 -2.46532e-07L-0.000107861 24L23.9999 48L29.6399 42.36Z" fill="#911C1C"/>
        </svg>
      </button>
      <div class="lightbox__container" aria-label="image closeup view">
        <figure class="lightbox__container__figure">
        </figure>
      </div>
      `;
    dom
      .querySelector('.lightbox__close')
      .addEventListener('click', this.close.bind(this));
    dom
      .querySelector('.lightbox__next')
      .addEventListener('click', this.next.bind(this));
    dom
      .querySelector('.lightbox__prev')
      .addEventListener('click', this.prev.bind(this));
    return dom;
  }

  loadMedia(url, title) {
    this.url = null;
    const figure = this.element.querySelector('.lightbox__container__figure');
    figure.innerHTML = '';
    if (Lightbox.getExtensionUrl(url) === 'mp4') {
      figure.classList.add('lightbox__container__figure--mp4');
      const video = document.createElement('video');
      video.setAttribute('controls', '');
      video.setAttribute('alt', title);
      const source = document.createElement('source');
      source.setAttribute('src', url);
      source.setAttribute('type', 'video/mp4');
      video.appendChild(source);
      const figcaption = document.createElement('figcaption');
      figcaption.classList.add('lightbox__container__title');
      figcaption.innerText = title;
      figure.appendChild(video);
      figure.appendChild(figcaption);
    } else if (Lightbox.getExtensionUrl(url) === 'jpg') {
      if (figure.classList.contains('lightbox__container__figure--mp4')) {
        figure.classList.remove('lightbox__container__figure--mp4');
      }
      const image = document.createElement('img');
      image.setAttribute('src', url);
      image.setAttribute('alt', title);
      const figcaption = document.createElement('figcaption');
      figcaption.classList.add('lightbox__container__title');
      figcaption.innerText = title;
      figure.appendChild(image);
      figure.appendChild(figcaption);
    } else {
      throw new Error('unknow file');
    }
    this.url = url;
  }

  next(e) {
    e.preventDefault();
    let i = this.media.findIndex((media) => media === this.url);
    if (i === this.media.length - 1) {
      i = -1;
    }
    this.loadMedia(this.media[i + 1], this.titles[i + 1]);
  }

  prev(e) {
    e.preventDefault();
    let i = this.media.findIndex((media) => media === this.url);
    if (i === 0) {
      i = this.media.length;
    }
    this.loadMedia(this.media[i - 1], this.titles[i - 1]);
  }

  onKeyUp(e) {
    e.preventDefault();

    if (e.key === 'Escape') {
      this.close(e);
    } else if (e.key === 'ArrowLeft') {
      this.prev(e);
    } else if (e.key === 'ArrowRight') {
      this.next(e);
    }
  }

  close(e) {
    e.preventDefault();
    this.element.parentElement.removeChild(this.element);
    document.querySelector('body').classList.remove('noscroll');
    document.removeEventListener('keyup', this.onKeyUp);
  }
}
