/* eslint-disable no-unused-vars */
/**
 * Function that creates an article to display the photographer's card
 * @returns {html}
 */
export const createPhotographerCard = (photographer) => {
  const { name, portrait, city, country, tagline, price, id } = photographer;
  // article container
  const article = document.createElement('article');
  article.className = 'photographer';
  const photographerCard = `
      <a class="photographer__link" href="./pages/photographer.html?id=${id}">
        <div class="profile-picture__container">
          <img class="photographer__profile-picture profile-picture" src="assets/medias/photographers/Photographers_ID_Photos/${portrait}" alt="Profil de ${name}">
        </div>
        <h2 class="photographer__name name">${name}</h2>
      </a>
      <div>
        <p class="photographer__location location">${city}, ${country}</p>
        <p class="photographer__tagline">${tagline}</p>
        <p class="photographer__price">${price}€/jour</p>
      </div>
      `;

  article.innerHTML = photographerCard;

  return article;
};
