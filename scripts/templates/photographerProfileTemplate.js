/* eslint-disable no-unused-vars */

/**
 * Function that creates a div to display the photographer's profile
 * @returns {html}
 */
export const createPhotographerProfile = (photographer) => {
  const { name, portrait, city, country, tagline } = photographer;
  // div container
  const photographerHeader = document.createElement('div');
  photographerHeader.className = 'photographer__profile';
  // photographerHeader.setAttribute('aria-label', `Entête de la page de ${name}`);
  const photographerProfile = `
      <section class="photographer__presentation">
        <h1 class="photographer__presentation-name name">${name}</h1>
        <h2 class="photographer__presentation-location location">${city}, ${country}</h2>
        <p class="photographer__presentation-tagline">${tagline}</p>
      </section>
      <button class="photographer__contact-button contact__modal-open-button button">Contactez-moi</button>
      <div class="profile-picture__container">
        <img class="photographer__profile-picture profile-picture" src="../../assets/medias/photographers/Photographers_ID_Photos/${portrait}" alt="${name}">
      </div>
        `;
  photographerHeader.innerHTML = photographerProfile;
  return photographerHeader;
};
