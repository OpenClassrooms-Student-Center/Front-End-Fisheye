/*********************************************************************************
*
* This file manage vue of media's lightbox (image or video) into modal
*
/*********************************************************************************/

/**
 * Function that creates an article to display photographer's media
 * @param {string} pictureNameRepository
 * @param {object} media
 * @returns {html}
 */
export const displayPhotographerLightbox = (pictureNameRepository, media) => {
  // article container
  const mediaLightbox = document.querySelector('.modal__lightbox-media');
  const picture = `../../assets/medias/photographers/${pictureNameRepository}/${media.src}`;
  // manage dom depends of media type format(image or video)
  let mediaPicture;
  if (media.type === 'image' && media.src != null) {
    mediaPicture = `
    <div class="modal__lightbox-media-container">
        <img class="modal__lightbox-picture" height="900" width="1050" src="${picture}" alt="${media.title}" tabindex=0>
        <p class="modal__lightbox-media-title" aria-hidden="true">${media.title}</p>
    </div>
    `;
  } else if (media.type === 'video' && media.src != null) {
    mediaPicture = `
      <div class="modal__lightbox-media-container">
          <video aria-labelledby="video-title" class="modal__lightbox-picture" controls>
            <source src=
            "${picture}"  type="video/mp4">
          </video>
          <p id="video-title" class="modal__lightbox-media-title">${media.title}</p> 
      </div>
          `;
  } else {
    mediaPicture = `<div aria-label="absence de media">Absence de media</div>`;
  }

  mediaLightbox.innerHTML = mediaPicture;
  return mediaLightbox;
};
