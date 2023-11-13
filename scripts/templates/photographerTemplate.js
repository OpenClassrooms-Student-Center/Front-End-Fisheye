/* eslint-disable no-unused-vars */
import { createPhotographer } from '../models/Photographer.js';
import { MediaFactory } from '../factories/MediaFactory.js';
/**
 * Vue of photographer's page
 * @param {object} photographer
 * @returns {html}
 */
function PhotographerTemplate(photographer) {
  const { name, portrait, city, country, tagline, price } =
    createPhotographer(photographer);
  // const { name, portrait, city, country, tagline, price } = photographer;
  console.log(photographer);
  /**
   * Function that creates a div to display the photographer's profile
   * @returns {html}
   */
  const createPhotographerProfile = () => {
    // div container
    const photographerHeader = document.createElement('div');
    photographerHeader.className = 'photographer__header';
    photographerHeader.setAttribute(
      'aria-label',
      `Entête de la page de ${name}`
    );
    const photographerProfile = `
      <section class="photographer__presentation">
        <h1 class="photographer__presentation-name name">${name}</h1>
        <h2 class="photographer__presentation-location location">${city}, ${country}</h2>
        <p class="photographer__presentation-tagline">${tagline}</p>
      </section>
      <button class="photographer__contact-button contact__button">Contactez-moi</button>
      <div class="profile-picture__container">
        <img class="photographer__profile-picture profile-picture" src="../assets/medias/photographers/Photographers_ID_Photos/${portrait}" alt="${name}">
      </div>
        `;
    photographerHeader.innerHTML = photographerProfile;
    return photographerHeader;
  };

  // TODO create filter
  // TODO create gallery
  /**
   * Function that creates an article to display a photographer's image or video
   * @returns {html}
   */
  const createMediaCard = (media) => {
    const { title, description, src, likes, type } = MediaFactory(media);
    console.log(MediaFactory(media));
    // path to picture (only firstname is needed)
    const pictureNameRepository = name.split(' ')[0];
    const picture = `../assets/medias/photographers/${pictureNameRepository}/${src}`;
    // article container
    const mediaArticle = document.createElement('article');
    mediaArticle.className = 'media-card';
    // manage depends of media type format(image or video)
    let mediaPicture;
    if (type === 'image' && src != null) {
      mediaPicture = `<img class="media-card__picture" src="${picture}" alt="${description}"></img>`;
    } else if (type === 'video' && src != null) {
      mediaPicture = `
        <video aria-label="${description}" class="media-card__picture">
          <source src=
          "${picture}"  type="video/mp4">
        </video>`;
    } else {
      mediaPicture = `<div aria-label="absence de media">Absence de media</div>`;
    }
    // TODO si like => ari-pressed = true
    const mediaCard = `
      <a class="media-card__link" href="#">
        ${mediaPicture}
      </a>
      <div class="media-card__under-picture-container">
        <h3 class="media-card__title">${title}</h3>
        <div class="media-card__likes-container">
          <p class="media-card__likes">${likes}</p>
          <button class="media-card__likes-button" aria-pressed="false" aria-label="liker le media"><img class="photographer__infos-likes-heart" src="https://img.icons8.com/windows/24/901c1c/filled-heart.png" alt="likes" aria-hidden="true"></button>
        </div>
      </div>
  `;
    mediaArticle.innerHTML = mediaCard;
    return mediaArticle;
  };
  /**
   * Function that creates a div to display the photographer's profile
   * @returns {html}
   */
  const createPhotographerInfos = () => {
    // div container
    const photographerInfosContainer = document.createElement('div');
    photographerInfosContainer.className = 'photographer__infos';
    photographerInfosContainer.setAttribute(
      'aria-label',
      `Nombre total de likes et tarif journalier de ${name}`
    );
    const photographerInfos = `
    <p class="photographer__infos-likes" aria-label="nombre total de like de like pour les médias de ${name}">nb <img class="photographer__infos-likes-heart" src="https://img.icons8.com/windows/20/000000/filled-heart.png" alt="" aria-hidden="true"></p>
    <p class="photographer__infos-price">${price}€ / jour</p>
        `;
    photographerInfosContainer.innerHTML = photographerInfos;
    return photographerInfosContainer;
  };
  return {
    createPhotographerProfile,
    createMediaCard,
    createPhotographerInfos,
  };
}

export { PhotographerTemplate };
