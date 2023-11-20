/**
 * Function that creates an article to display a photographer's image or video
 * @param {string} pictureNameRepository
 * @param {object} media
 * @returns {html}
 */
export const createPhotographerMediaCard = (pictureNameRepository, media) => {
  const { title, src, likes, type, id } = media;
  console.log(media);
  const picture = `../../assets/medias/photographers/${pictureNameRepository}/${src}`;
  // article container
  const mediaArticle = document.createElement('article');
  mediaArticle.className = 'media-card';
  // manage depends of media type format(image or video)
  let mediaPicture;
  if (type === 'image' && src != null) {
    mediaPicture = `<img class="media-card__picture" src="${picture}" alt="${title}">`;
  } else if (type === 'video' && src != null) {
    mediaPicture = `
        <video aria-label="${title}" class="media-card__picture">
          <source src=
          "${picture}"  type="video/mp4">
        </video>`;
  } else {
    mediaPicture = `<div aria-label="absence de media">Absence de media</div>`;
  }
  const mediaCard = `
      <button id="media-card-${id}" class="media-card__link" aria-label="${title}">
        ${mediaPicture}
      </button>
      <div class="media-card__under-picture-container">
        <h2 class="media-card__title" aria-hidden="true">${title}</h2>
        <div class="media-card__likes-container">
          <p class="media-card__likes" id="media-card-likes-${id}" tabindex=0>${likes}<span class="hide-text"> likes</span></p>
          <button id="media-card-button-likes-${id}" class="media-card__likes-button" aria-pressed="false" aria-label="Aimer ${title}"><img class="photographer__infos-likes-heart" src="https://img.icons8.com/windows/24/901c1c/filled-heart.png" alt="likes" aria-hidden="true"></button>
        </div>
      </div>
  `;
  mediaArticle.innerHTML = mediaCard;
  return mediaArticle;
};
