/**
 * Function that creates a div to display the photographer's infos (total likes + daily rate)
 * @param {object} photographer
 * @returns {html}
 */
export const createPhotographerInfos = (photographer) => {
  const { price } = photographer;
  // div container
  const photographerInfosContainer = document.createElement('div');
  photographerInfosContainer.className = 'photographer__infos';
  const photographerInfos = `
    <p class="photographer__infos-likes">nb<span class="hide-text"> likes</span><img class="photographer__infos-likes-heart" src="https://img.icons8.com/windows/20/000000/filled-heart.png" alt="" aria-hidden="true"></p>
    <p class="photographer__infos-price">${price}€ / jour</p>
        `;
  photographerInfosContainer.innerHTML = photographerInfos;
  return photographerInfosContainer;
};
