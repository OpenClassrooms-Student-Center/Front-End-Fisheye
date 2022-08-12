export const photographerFactory = data => {
  const { id, name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  const getUserCardDOM = () => {
    const markup = `
    <article class="card">
      <a href="#" class="card__link" data-id="${id}">
        <img src="assets/photographers/${portrait}" class="card__portrait" />
        <h2 class="card__name">${name}</h2>
      </a>
      <div class="card__description">
        <p class="card__location">
          <span class="card__city">${city}</span>,
          <span class="card__country">${country}</span>
        </p>
        <p class="card__tagline">${tagline}</p>
        <p class="card__price">
          <span class="card__price-value">${price}</span>
          <span class="card__price-currency">€</span>/jour
        </p>
      </div>
    </article>
    `;
    return markup;
  };
  return { name, picture, getUserCardDOM };
};
