/**
 * Function that creates an article to display a photographer's image or video
 * @returns {html}
 */
export const createPhotographerMediaCard = (media, pictureNameRepository) => {
  const { title, src, likes, type } = media;
  console.log(media);

  const picture = `../../assets/medias/photographers/${pictureNameRepository}/${src}`;
  // article container
  const mediaArticle = document.createElement('article');
  mediaArticle.className = 'media-card';
  // manage depends of media type format(image or video)
  let mediaPicture;
  if (type === 'image' && src != null) {
    mediaPicture = `<img class="media-card__picture" src="${picture}" alt="${title}"></img>`;
  } else if (type === 'video' && src != null) {
    mediaPicture = `
        <video aria-label="${title}" class="media-card__picture">
          <source src=
          "${picture}"  type="video/mp4">
        </video>`;
  } else {
    mediaPicture = `<div aria-label="absence de media">Absence de media</div>`;
  }
  // TODO si like => aria-pressed = true
  const mediaCard = `
      <a class="media-card__link">
        ${mediaPicture}
      </a>
      <div class="media-card__under-picture-container">
        <h3 class="media-card__title">${title}</h3>
        <div class="media-card__likes-container">
          <p class="media-card__likes">${likes}</p>
          <button class="media-card__likes-button" aria-pressed="false" aria-label="liker le media"><img class="photographer__infos-likes-heart" src="https://img.icons8.com/windows/24/901c1c/filled-heart.png" alt="likes" aria-hidden="true"></button>
        </div>
      </div>
  `;
  mediaArticle.innerHTML = mediaCard;
  return mediaArticle;
};
