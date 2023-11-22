/*********************************************************************************
*
* This file manage vue of homepage photographer's card 
*
/*********************************************************************************/

/**
 * Function that creates an article to display the photographer's card
 * @param {object} photographer
 * @returns {html}
 */
const displayPhotographerCard = (photographer) => {
  // article container
  const article = document.createElement('article');
  article.className = 'photographer__card';
  // manage missing photo
  let src;
  if (photographer.portrait) {
    src = `assets/medias/photographers/Photographers_ID_Photos/${photographer.portrait}`;
  } else {
    src =
      'assets/medias/photographers/Photographers_ID_Photos/default-avatar.jpg';
  }
  const photographerCard = `
      <a class="photographer__card-link" href="./pages/photographer.html?id=${photographer.id}">
        <div class="profile-picture__container">
          <img class="photographer__card-profile-picture profile-picture" src=${src} alt="">
        </div>
        <h2 class="photographer__card-name name">${photographer.name}</h2>
      </a>
      <div>
        <p class="photographer__card-location location">${photographer.city}, ${photographer.country}</p>
        <p class="photographer__card-tagline">${photographer.tagline}</p>
        <p class="photographer__card-price">${photographer.price}€/jour</p>
      </div>
    `;

  article.innerHTML = photographerCard;

  return article;
};

export { displayPhotographerCard };
