import Media from './Media.js';

export default class Photo extends Media {
  constructor(media, name) {
    super(media, name);
    this._pathMedia = media.image;
    this._tag = 'img';
    this._path = `../assets/Sample_Photos/${this._pathName}/${this._pathMedia}`;
  }

  get tag() {
    return this._tag;
  }

  get path() {
    return this._path;
  }

  createCard() {
    console.log(this);
    const article = `<${this._tag} src=${this._path} role="Image link" aria-Label="${this.media.title}, vue de présentation}" tabindex="0" class="photo"></${this.media.tag}>
                  <aside class="media__aside">
                      <span class="photo__title" >${this.media.title}</span>
                      <span class="photo__likes" aria-label=${this.media.userLike ? 'enlever like' : 'ajouter like'} tabindex="0">
                          <span>${this.media.likes}</span>
                          <i class="fas fa-heart" role="Image" aria-label="likes">
                      </i></span>
                  </aside>`;

    const card = document.createElement('article');
    card.classList.add('cardMedia');
    card.innerHTML = article;
    return card;
  }
}
