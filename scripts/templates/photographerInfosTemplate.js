/*********************************************************************************
*
* This file manage vue of photographer's infos card (total likes + daily rate)
*
/*********************************************************************************/

/**
 * Function that creates a div to display the photographer's infos
 * @param {object} photographer
 * @param {number} totalLikes
 * @returns {html}
 */
export const displayPhotographerInfos = (photographer, totalLikes) => {
  // div container
  const photographerInfosContainer = document.querySelector(
    '.photographer__infos'
  );
  const photographerInfos = `
    <div class="photographer__infos-likes-container">
      <p class="photographer__infos-likes">${totalLikes}<span class="hide-text">total likes</span></p>
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" viewBox="0 0 22 24" fill="none" aria-hidden="true" class="photographer__infos-likes-heart">
        <g clip-path="url(#clip0_120_618)">
          <path d="M11.125 21.35L9.85625 20.03C5.35 15.36 2.375 12.28 2.375 8.5C2.375 5.42 4.4925 3 7.1875 3C8.71 3 10.1712 3.81 11.125 5.09C12.0787 3.81 13.54 3 15.0625 3C17.7575 3 19.875 5.42 19.875 8.5C19.875 12.28 16.9 15.36 12.3938 20.04L11.125 21.35Z" fill="black"/>
        </g>
      </svg>
    </div>
    <p class="photographer__infos-price">${photographer.price}€ / jour</p>
        `;
  photographerInfosContainer.innerHTML = photographerInfos;
};
