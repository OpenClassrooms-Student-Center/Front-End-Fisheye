/**
 * Function that creates a div to display the photographer's infos (total likes + daily rate)
 * @param {object} photographer
 * @param {number} totalLikes
 * @returns {html}
 */
export const displayPhotographerInfos = (photographer, totalLikes) => {
  const { price } = photographer;

  // div container
  const photographerInfosContainer = document.querySelector(
    '.photographer__infos'
  );
  const photographerInfos = `
    <div class="photographer__infos-likes-container">
      <p class="photographer__infos-likes">${totalLikes}<span class="hide-text">total likes</span></p>
      <img class="photographer__infos-likes-heart" src="https://img.icons8.com/windows/28/000000/filled-heart.png" alt="" aria-hidden="true">
    </div>
    <p class="photographer__infos-price">${price}€ / jour</p>
        `;
  photographerInfosContainer.innerHTML = photographerInfos;
};
