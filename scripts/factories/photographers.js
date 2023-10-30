export const photographerFactory = ({
  name,
  portrait,
  city,
  country,
  tagline,
  price,
  id,
}) => {
  const picture = `../assets/photographers/${portrait}`;
  const getUserCardDOM = () => {
    const card = document.createElement("article");
    card.innerHTML = `
          <a href="./photographer.html?id=${id}" aria-label="${name}">
          <img src="${picture}" alt="${name}" aria-label="${name}" lazy="loading">
          <h2 aria-label="${name}">${name}</h2></a>
          <div class="description">
          <h3 aria-label="${city}, ${country}">${city}, ${country}</h3>
          <p aria-label="${tagline}">${tagline}</p>
          <h5 aria-label="${price}€/jour">${price}€/jour</h5>
          </div>
      `;
    return card;
  };
  return { name, picture, getUserCardDOM };
};
