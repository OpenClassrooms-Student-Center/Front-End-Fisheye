/* eslint-disable no-unused-vars */

/**
 * Function that creates an article to display a photographer's image or video
 * @returns {html}
 */
export const createPhotographerLightBox = (pictureNameRepository, media) => {
  const { title, src, type } = media;

  const picture = `../../assets/medias/photographers/${pictureNameRepository}/${src}`;
  // article container
  const mediaLightBox = document.querySelector('.lightbox__modal-media');
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
    //TODO control
  } else {
    mediaPicture = `<div aria-label="absence de media">Absence de media</div>`;
  }
  const lightBox = ` 
    ${mediaPicture}
    <p>${title}</p> 
  `;

  mediaLightBox.innerHTML = lightBox;
  return mediaLightBox;
};
