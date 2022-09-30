import Media from './Media.js';

export default class Image extends Media {
  constructor (data, target) {
    super(data, target);
    /* ENG: Media image */
    /* FRA: Image du media */
    this.img = data.image;
    /* ENG: Media alt */
    /* FRA: Alt du media */
    this.alt = data.alt;
    /* ENG: Store the specific view into the element */
    /* FRA: Sotck la vue specifique dans l'element */
    this.element = this.getView();
  };

  /**
   * ENG: This function will return the media card
   * FRA: Cette fonction va retourner la vue d'une carte media
   * @returns {HTMLElement}
   */
  getView = () => {
    const container = document.createElement('article');
    container.setAttribute('class', 'media');

    const media = document.createElement('a');
    media.setAttribute('href', '#');
    media.setAttribute('role', 'button');
    media.setAttribute('class', 'media__link');

    media.innerHTML = this.getThumbnail();

    const footer = document.createElement('footer');
    footer.setAttribute('class', 'media__infos');
    footer.innerHTML = `<p class="media__infos__title">${this.title}</p>`;

    /* ENG: We create a div about the like */
    /* FRA: On créer une div concernant le like */
    const like = document.createElement('div');
    like.setAttribute('class', 'media__infos__likes');

    /* ENG: This span will be inside the div like */
    /* FRA: Cette span sera à l'intérieur de la div like */
    const likeNb = document.createElement('span');
    likeNb.setAttribute('class', 'media__infos__likes-nb');
    likeNb.innerHTML = this.likes;

    /* ENG: We store the span iin a variable likeCount preceded by a this */
    /* FRA: On stock la span dans une variable likeCount précédé d'un this */
    this.likeCount = likeNb;

    /* ENG: we append the child about the div like */
    /* FRA: on fait apparaitre l'enfant à propos de la div like */
    like.appendChild(likeNb);
    like.appendChild(this.getLikeBtn());
    footer.appendChild(like);
    container.appendChild(media);
    container.appendChild(footer);

    return container;
  };

  /**
   * ENG: Image / video element of the media card
   * FRA: Element image / video de la carte media
   * @returns {HTMLElement}
   */
  getThumbnail = () => {
    if (this.img) {
      return `<img class="media__link__img" src="assets/images/${this.photographerId}/${this.img}" alt="${this.title}">`;
    };
    return "<p>Aucun média n'a été trouvé</p>";
  };
}
