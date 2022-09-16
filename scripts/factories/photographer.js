import { PROFILE_PICTURES_FOLDER } from '../utils/config';
import { mediaFactory } from './media';

export const photographerFactory = ({ data, medias }) => {
  const { id, name, portrait, city, country, tagline, price } = data;

  const picture = `${PROFILE_PICTURES_FOLDER}${portrait}`;
  const nbLikes = medias.reduce((sum, media) => sum + media.likes, 0);

  const mediasFactory = mediaFactory(medias);

  const getUserCard = () => {
    const markup = `
    <article class="card" role="listitem">
      <a href="/photographer/${id}" class="card__link" data-id="${id}" role="link" aria-labelledby="card__name--${id}" aria-describebdy="card__label-description--${id}">
        <img src="${picture}" class="card__portrait" alt="Photo de profil de ${name}" aria-hidden="true" />
        <div id="card__name--${id}" class="card__name">${name}</div>
        <span id="card__label-description--${id}" class="card__label-description hidden">Page du photographe ${name}</span>
      </a>
      <h2 class="hidden">${name}</h2>
      <p class="card__description">
        <span class="card__location" aria-label="Location">
          <span class="card__city">${city}</span>,
          <span class="card__country">${country}</span>
        </span>
        <span class="card__tagline" aria-label="Slogan">${tagline}</span>
        <span class="card__price" aria-label="Prix">
          <span class="card__price-value">${price}</span>
          <span class="card__price-currency">€</span>/jour
        </span>
      </p>
    </article>
    `;
    return markup;
  };
  const getUserHeader = () => {
    const markup = `
      <div class="main__photographer-text">
        <h1 class="main__photographer-title">${name}</h1>
        <p class="main__photographer-description">
          <span class="main__photographer-location" aria-label="location">
            <span class="main__photographer-city">${city}</span>,
            <span class="main__photographer-country">${country}</span>
          </span>
          <span class="main__photographer-tagline" aria-label="Slogan">${tagline}</span>
        </p>
      </div>
    `;
    return markup;
  };
  const getFormModal = () => {
    const markup = `
    <div class="form-modal__background">
      <div class="form-modal" role="dialog" aria-labelledby="#form-modal__title" aria-modal="true">
        <header class="form-modal__header">
          <h2 id="form-modal__title" class="form-modal__title">
            <span class="form-modal__title-contact">Contactez-moi</span>
            <span class="form-modal__title-name">${name}</span>
          </h2>
          <img src="assets/icons/close.svg" class="form-modal__close-btn" aria-label="Close" />
        </header>
        <form action="/contact" method="POST" class="form-modal__form">
          <div class="form-modal__input">
            <label for="#firstname" class="form-modal__input-label">Prénom</label>
            <input type="text" id="firstname" name="firstname" class="form-modal__input-field form-modal__input-field--text" />
          </div>
          <div class="form-modal__input">
            <label for="#lastname" class="form-modal__input-label">Nom</label>
            <input type="text" id="lastname" name="lastname" class="form-modal__input-field form-modal__input-field--text" />
          </div>
          <div class="form-modal__input">
            <label for="#email" class="form-modal__input-label">Email</label>
            <input type="email" id="email" name="email" class="form-modal__input-field form-modal__input-field--text" />
          </div>
          <div class="form-modal__input">
            <label for="#message" class="form-modal__input-label">Votre message</label>
            <textarea id="message" name="message" rows="4" class="form-modal__input-field form-modal__input-field--textarea"></textarea>
          </div>
          <button type="submit" class="form-modal__submit-btn btn">Envoyer</button>
        </form>
      </div>
    </div>
      `;
    return markup;
  };
  const getUserFooter = () => {
    const markup = `
      <div class="main__photographer-likes">
        <span class="main__photographer-nb-likes" aria-label="Nombre de likes">${nbLikes}</span>
        <svg class="icon-heart icon-heart--filled" role="img" aria-hidden="true">
          <use xlink:href="assets/icons/heart.svg#icon-heart"></use>
        </svg>
      </div>
      <span class="main__photographer-price" aria-label="Tarif journalier">${price}€ / jour</span>
    `;
    return markup;
  };
  return {
    name,
    picture,
    getUserCard,
    getUserHeader,
    getFormModal,
    mediasFactory,
    getUserFooter,
  };
};
