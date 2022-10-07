export default class LightBox {
  constructor (elements, index) {
    /* ENG: Retrieve the modal light box element from the html view */
    /* FRA: Récupérer l'élément de la lightbox modal de la vue html */
    this.target = document.getElementById('modal-lightbox');
    this.elements = elements;
    this.id = index;
    this.current = this.elements[this.id];
    this.render();
  };

  /**
   * ENG: This function will return the lightbox
   * FRA: Cette fonction va retourner la vue de la lightbox
   * @returns {HTMLElement}
   */
  getView = () => {
    /* FRA: Création de l'élement container, contenant la lightbox */
    /* ENG: Creation of the container element, containing the lightbox */
    const container = document.createElement('div');
    container.setAttribute('class', 'lightbox__container');

    /* FRA: Création de l'élement container, contenant le media */
    /* ENG: Creation of the container element, containing the media */
    const mediaContainer = document.createElement('div');
    mediaContainer.setAttribute('class', 'media-container');
    this.mediaContainer = mediaContainer;

    /* FRA: Title media element */
    /* ENG: Titre de l'element du media */
    const title = document.createElement('p');
    title.setAttribute('class', 'title');
    title.innerHTML = this.current.title;
    this.title = title;

    /* ENG: LightBox Arrow left creation */
    /* FRA: Création de la flèche gauche de la LightBox */
    const arrowLeft = document.createElement('button');
    arrowLeft.setAttribute('class', 'arrow-left');
    arrowLeft.setAttribute('aria-label', 'précédent');
    arrowLeft.innerHTML = '<i role="button" class="fas fa-chevron-left"></i>';
    /* ENG: On click display the previous media */
    /* FRA: Au clique, affichage du précédent media */
    arrowLeft.addEventListener('click', () => this.prevMedia());

    /* ENG: LightBox Arrow right creation */
    /* FRA: Création de la flèche droite de la LightBox */
    const arrowRight = document.createElement('button');
    arrowRight.setAttribute('class', 'arrow-right');
    arrowRight.setAttribute('aria-label', 'suivant');
    arrowRight.innerHTML = '<i role="button" class="fas fa-chevron-right"></i>';
    /* ENG: On click display the next media */
    /* FRA: Au clique, affichage du media suivant */
    arrowRight.addEventListener('click', () => this.nextMedia());

    /* ENG: Close lightbox button creation */
    /* FRA: Création d'un bouton de fermeture de la lightbox */
    const closeBtn = document.createElement('button');
    closeBtn.setAttribute('class', 'close');
    closeBtn.setAttribute('aria-label', 'fermer la vue rapproché');
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    this.closeBtn = closeBtn;
    /* ENG: On click close de lightbox */
    /* FRA: Au clique, fermeture de la lightbox */
    closeBtn.addEventListener('click', () => this.closeLightbox());

    mediaContainer.appendChild(this.getMedia());
    container.appendChild(mediaContainer);
    container.appendChild(title);
    container.appendChild(arrowLeft);
    container.appendChild(arrowRight);
    container.appendChild(closeBtn);

    return container;
  };

  /* ENG: Open the lightbox */
  /* FRA: Ouverture de la lightbox */
  openLightbox = () => {
    this.target.classList.add('open');
    document.body.classList.add('no-scroll');
    document.addEventListener('keydown', this.keyControl);
    this.target.focus();
  };

  /* ENG: Close the lightbox */
  /* FRA: Fermeture de la lightbox */
  closeLightbox = () => {
    this.target.classList.remove('open');
    document.body.classList.remove('no-scroll');
    document.removeEventListener('keydown', this.keyControl);
  };

  /* ENG: This function will keep the focus on the lightbox element */
  /* FRA: Cette fonction va permettre de garder le focus sur l'element de la lightbox */
  trackFocus = (e) => {
    if (e.target === this.closeBtn) {
      e.preventDefault();
      this.target.focus();
    };
  };

  /**
   * ENG: This function controls the keyboard inputs on the lightbox
   * FRA: Cette fonction controle les entrés clavier sur la lightbox
   * @param {KeybordEvent} e
   */
  keyControl = (e) => {
    switch (e.key) {
      case 'ArrowLeft':
        this.prevMedia();
        break;
      case 'ArrowRight':
        this.nextMedia();
        break;
      case 'Escape':
        this.closeLightbox();
        break;
      case 'Tab':
        this.trackFocus(e);
        break;
      default:
        break;
    };
  };

  nextMedia = () => {
    this.id = (this.id + 1 >= this.elements.length) ? 0 : this.id + 1;
    this.current = this.elements[this.id];
    this.title.innerHTML = this.current.title;
    this.mediaContainer.replaceChild(this.getMedia(), this.mediaContainer.children[0]);
  };

  prevMedia = () => {
    this.id = (this.id - 1 === -1) ? this.elements.length - 1 : this.id - 1;
    this.current = this.elements[this.id];
    this.title.innerHTML = this.current.title;
    this.mediaContainer.replaceChild(this.getMedia(), this.mediaContainer.children[0]);
  };

  /**
   * Cette fonction créer le html qui contient la media et le retourne
   * @returns {HTMLElement}
   */
  getMedia = () => {
    let media;

    if (this.current.img) {
      media = document.createElement('img');
      media.setAttribute('class', 'media');
      media.setAttribute('alt', this.current.alt);
      media.src = `assets/images/${this.current.photographerId}/` + this.current.img;
    } else {
      media = document.createElement('video');
      media.setAttribute('class', 'media');
      media.setAttribute('controls', 'true');
      media.innerHTML = `<source src="assets/images/${this.current.photographerId}/${this.current.video}" type="video/mp4">`;
    };

    this.media = media;

    return media;
  };

  /**
   * Cette fonction ajoute la vue au document
   */
  render = () => {
    this.target.innerHTML = '';
    this.target.appendChild(this.getView());
    this.openLightbox();
  };
}
