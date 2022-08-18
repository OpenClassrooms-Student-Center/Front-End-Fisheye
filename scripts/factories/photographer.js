import { PROFILE_PICTURES_FOLDER } from '../utils/config';

export const photographerFactory = data => {
  const { id, name, portrait, city, country, tagline, price } = data;

  const picture = `${PROFILE_PICTURES_FOLDER}${portrait}`;

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
  return { name, picture, getUserCard, getUserHeader };
};
