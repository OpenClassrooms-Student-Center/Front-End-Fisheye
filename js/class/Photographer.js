import FormContact from './FormContact.js';

/**
 * class Photographer
 */
export default class Photographer {
  /* ENG: Instances will store all photographers */
  /* FR: Instances stockera tous les photographes */
  static instances = [];
  /* ENG: When we have nothing to show about photographers and it's empty, we display the div */
  /* FRA: Quand on n'a rien à montrer sur les photographes et que c'est vide, on affiche la div */
  static emptyTarget = document.getElementById('no-photographer');

  constructor (data) {
    /* ENG: Data id */
    /* FRA: Donnée id */
    this.id = data.id;
    /* ENG: Data photographer profile image */
    /* FRA: Donnée concernant la photo profil du photographe */
    this.portrait = data.portrait;
    /* ENG: Data photographer's name */
    /* FRA: Donnée du nom du photographe */
    this.name = data.name;
    /* ENG: Data photographer's city */
    /* FRA: Donnée de la ville du photographe */
    this.city = data.city;
    /* ENG: Data photographer's country */
    /* FRA: Donnée du pays du photographe */
    this.country = data.country;
    /* ENG: Data photographer's tagline */
    /* FRA: Donnée de la tagline du photographe */
    this.tagline = data.tagline;
    /* ENG: Data photographer's price per day */
    /* FRA: Donnée  sur le prix par jour du photographe */
    this.price = data.price;
    /* ENG: Put informations into the instance */
    /* FRA: Met les informations sur les photographes dans l'instance */
    Photographer.instances = [...Photographer.instances, this];
    /* ENG: store the specific view into the element (card view on homepage or header view on photographer profile) */
    /* FRA: Stock la vue specifique dans l'element (La vue de la card sur la page de la homepage ou la vue du header dans le profile du photographe) */
    this.element = this.getView();
  };

  /**
   * ENG: This function choose the photographer's view according the returned page
   * FRA: Cette fonction choisit la vue du photographe en fonction de la page renvoyée
   * @returns {HTMLElement}
   */
  getView = () => {
    /* ENG: Get the url content after the '/' */
    /* FRA : Récupère le contenu de l'url après le '/' */
    let path = window.location.pathname.split('/');
    path = path[path.length - 1];

    switch (path) {
      /* ENG: This following code was necessary for the good function of the switch */
      /* FRA: Le code suivant était nécessaire au bon fonctionnement du switch */
      /* ENG: home page case we display the photographer's card */
      /* FR: Dans le cas de la homepage qui est la card avec les informations du photographe */
      case '':
      case 'index.html':
        return this.thumbnail(); /* ENG: Photographer card view into homepage */ /* FRA: Card avec les informations du photographer sur le homepage */
      case 'photographer.html':
        return this.profile();
      default:
        break;
    }
  };

  /**
   * ENG: Photographer card element view on the home page
   * FRA:  Element de la vue de la card du photographe sur la homepage
   * @returns {HTMLElement}
   */
  thumbnail = () => {
    const element = document.createElement('article');
    element.setAttribute('class', 'photographer-thumbnail');

    element.innerHTML =
    `
      <a class="photographer__profile" href="photographer.html?id=${this.id}">
        <img class="photographer__profile__img" src="assets/images/Photographers/${this.portrait}" alt="${this.name}">
        <h2 class="photographer__profile__name">${this.name}</h2>
      </a>
      <div class="photographer__infos">
        <p class="photographer__infos__city">${this.city}, ${this.country}</p>
        <p class="photographer__infos__tagline">${this.tagline}</p>
        <p class="photographer__infos__price">${this.price}€/jour</p>
      </div>
    `;

    return element;
  };

  /**
   * ENG: Photographer profile element view on the photographer's page
   * FR: Element profile de la vue du photographe sur la page photographe
   * @returns {HTMLElement}
   */
  profile = () => {
    /* FR: Elements du profil */
    /* ENG: Profile elements */
    const container = document.createElement('section');
    container.setAttribute('id', 'photographer-profile');
    container.setAttribute('class', 'photographer-profile');

    const infosElement = document.createElement('div');
    infosElement.setAttribute('class', 'photographer__infos');

    /* ENG: Infos Content Element */
    /* FR: Contenu de l'element infos */
    infosElement.innerHTML =
    `
      <h1 class="photographer__infos__name">${this.name}</h1>
      <p class="photographer__infos__city">${this.city}, ${this.country}</p>
      <p class="photographer__infos__tagline">${this.tagline}</p>
    `;

    const contactBtn = document.createElement('button');
    contactBtn.setAttribute('id', 'contact-btn');
    contactBtn.setAttribute('class', 'btn photographer__btn');
    contactBtn.setAttribute('aria-label', 'Contacter le photographe');
    contactBtn.innerHTML = 'Contactez-moi';

    const pictureElement = document.createElement('img');
    pictureElement.setAttribute('class', 'photographer__img');
    pictureElement.setAttribute('alt', this.name);
    pictureElement.setAttribute('src', `assets/images/photographers/${this.portrait}`);

    /* ENG: Add previous created element to the container */
    /* FR: Ajout des elements créé précédement au container */
    container.appendChild(infosElement);
    container.appendChild(contactBtn);
    container.appendChild(pictureElement);

    /* ENG: Add event listener on the button click to open contact form */
    /* FR: Ajout d'une écoute d'evenement sur le clique du boutton pour ouvrir le formulaire de contact */
    contactBtn.addEventListener('click', () => FormContact.open());

    return container;
  };
}
