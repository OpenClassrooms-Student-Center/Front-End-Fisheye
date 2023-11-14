/**
 * Function that creates a div to display the photographer's infos (total likes + daily rate)
 * @returns {html}
 */
export const createPhotographerInfos = (photographer) => {
  const { name, price } = photographer;
  // div container
  const photographerInfosContainer = document.createElement('div');
  photographerInfosContainer.className = 'photographer__infos';
  photographerInfosContainer.setAttribute(
    'aria-label',
    `Nombre total de likes et tarif journalier de ${name}`
  );
  const photographerInfos = `
    <p class="photographer__infos-likes">nb <img class="photographer__infos-likes-heart" src="https://img.icons8.com/windows/20/000000/filled-heart.png" alt="" aria-hidden="true"></p>
    <p class="photographer__infos-price">${price}€ / jour</p>
        `;
  photographerInfosContainer.innerHTML = photographerInfos;
  return photographerInfosContainer;
};
