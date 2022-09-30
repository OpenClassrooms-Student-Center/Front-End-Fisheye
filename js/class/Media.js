import CardInfos from './CardInfos.js';

export default class Media {
  /* ENG: Target Element gallery */
  /* FR: Cible de l'élement gallery */
  static target;
  /* ENG: Instances will store all medias */
  /* FR: Instances stockera tous les medias */
  static instances = [];
  /* ENG: Total likes number (displayed on the card photographer info) */
  /* FR: Nombre total de likes (affiché dans la carte infos du photographe) */
  static totalLikes = 0;

  constructor (data, target) {
    /* ENG: Data id */
    /* FRA: Donnée id */
    this.id = data.id;
    /* ENG: Photographer id */
    /* FRA: Photographe id */
    this.photographerId = data.photographerId;
    /* ENG: Media date */
    /* FRA: Date du media */
    this.date = data.date;
    /* ENG: Media likes number */
    /* FRA: Nombre de likes du media */
    this.likes = data.likes;
    /* ENG: Media title */
    /* FRA: Titre du media */
    this.title = data.title;
    /* ENG: Media image */
    /* FRA: Image du media */
    this.img = data.image;
    /* ENG: Media video */
    /* FRA: Video du media */
    this.video = data.video;
    /* ENG: Media price */
    /* FRA: Prix du media */
    this.price = data.price;
    /* ENG: Media alt */
    /* FRA: Alt du media */
    this.alt = data.alt;
    /* ENG: Media liked which is false by default */
    /* FRA: Media liké, est false par defaut */
    this.liked = false;
    /* ENG: Store the specific view into the element */
    /* FRA: Sotck la vue specifique dans l'element */
    this.element = this.getView();
    /* ENG: Target is the target where we'll store all the medias  to display them */
    /* FRA: Target est la cible on l'on va stocker tout les medias pour les afficher */
    Media.target = target;
    /* ENG: Total like incrementation */
    /* FRA: Incrementation du total de like */
    Media.totalLikes = Media.totalLikes + this.likes; /* (or Media.totalLikes += this.likes) */
    /* ENG: Put informations into the instance */
    /* FRA: Met les informations sur les medias dans l'instance */
    Media.instances = [...Media.instances, this];
  }

  static fill = () => {
    /* ENG: Reset the media target */
    /* FRA: Reset la cible ou on affiche les medias */
    Media.target.innerHTML = '';
    /* ENG: Display the new sorted content */
    /* FRA: Afficher le nouveau contenu trié */
    Media.instances.forEach(media => Media.target.appendChild(media.element));
  };

  /* ENG: Retrieve all media data and sort them by params */
  /* FRA: On récupere tout les medias pour les trier selon un parametre */
  static sortBy = (params) => {
    const element = [...Media.instances];
    switch (params) {
      case 'date':
        element.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'title':
        element.sort((a, b) => a.title.localeCompare(b.title));
        break;

      default:
        element.sort((a, b) => a.likes - b.likes);
        break;
    }
    /* ENG: Get the sorted element and put it into the media instance */
    /* FRA: Donnée du nom du photographe */
    Media.instances = element;
    /* ENG: Display the new sorted content */
    /* FRA: Afficher le nouveau contenu trié */
    Media.fill();
  };

  like = () => {
    /* ENG: If the media is liked, on click we remove 1 like an */
    /* FRA: Afficher le nouveau contenu trié */
    if (this.liked) {
      /* ENG: remove 1 to the media total like */
      /* FRA: enleve 1 au total de like d'un media */
      this.likes = this.likes - 1; /* (or this.likes -= 1) */
      /* ENG: remove 1 to the total likes */
      /* FRA: enleve 1 au total de likes */
      Media.totalLikes = Media.totalLikes - 1; /* (or Media.totalLikes -= 1) */
    } else {
      /* ENG: add 1 to the media total like */
      /* FRA: ajoute 1 au total de like d'un media */
      this.likes = this.likes + 1; /* (or this.likes += 1) */
      /* ENG: add 1 to the total likes */
      /* FRA: ajoute 1 au total de likes */
      Media.totalLikes = Media.totalLikes + 1; /* (or Media.totalLikes += 1) */
    };

    /* ENG: Toggle for filling the heart or not */
    /* FRA: Toggle pour remplir le coeur ou non */
    this.likeBtn.classList.toggle('fas');
    this.likeBtn.classList.toggle('far');
    /* ENG: Toggle liked or not */
    /* FRA: Toggle liked ou non */
    this.liked = !this.liked;

    /* ENG: Update the displayed like value of the media */
    /* FRA: Mise à jour de l'affichage de la valeur du like du media */
    this.likeCount.innerHTML = this.likes;

    /* ENG: Update the displayed likes value of the total count in the info card */
    /* FRA: Mise à jour de l'affichage de la valeur total des likes sur la carte info */
    CardInfos.updateTotalLike();
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

    if (this.video) {
      media.classList.add('video-overlay');
    };

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

  getLikeBtn = () => {
    /* ENG: Like button from fontawesome */
    /* FRA: Boutton like de fontawesome */
    const likeBtn = document.createElement('i');
    likeBtn.setAttribute('class', 'far fa-heart media__infos__likes-icon');
    /* ENG: The aria-label attribute is used to define a non-visible legend associated with an HTML element whose meaning is conveyed only by the visual. */
    /* FRA: L'attribut aria-label est utilisé pour définir une légende non-visible associée à un élément HTML dont le sens est transmis uniquement par le visuel. */
    likeBtn.setAttribute('aria-label', 'likes');
    likeBtn.setAttribute('role', 'button');
    /* ENG: tabindex will allow to make the element focusable in a precise order or to avoid it */
    /* FRA: tabindex va permettre de rendre l'element focusable dans un ordre précis ou bien de l'éviter */
    likeBtn.setAttribute('tabindex', '0');
    /* ENG: On click like button play the like function */
    /* FRA: Sur le lick du boutton like on joue la fonction like */
    likeBtn.addEventListener('click', this.like);
    /* ENG: If we press Enter on the heart icon, we can like the content */
    /* FRA: Si on appuie sur Entrée sur l'icon du coeur, on peut liker le contenu */
    likeBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.like();
      };
    });

    this.likeBtn = likeBtn;

    return likeBtn;
  };

  /**
   * ENG: Image / video element of the media card
   * FRA: Element image / video de la carte media
   * @returns {HTMLElement}
   */
  getThumbnail = () => {
    /* ENG: If it's an image return image tag, if it's a video then return video tag */
    /* FRA: Si c'est une image on retourne une balise image, si c'est une video on retourne une balise video */
    if (this.img) {
      return `<img class="media__link__img" src="assets/images/${this.photographerId}/${this.img}" alt="${this.title}">`;
    };

    if (this.video) {
      return `<video class="media__link__video" aria-label="${this.title}">
          <source src="assets/images/${this.photographerId}/${this.video}" type="video/mp4">
      </video>`;
    };

    return "<p>Aucun média n'a été trouvé</p>";
  };
}
