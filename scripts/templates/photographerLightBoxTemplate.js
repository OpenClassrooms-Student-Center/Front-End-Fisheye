/**
 * Function that creates an article to display a photographer's image or video
 * @param {string} pictureNameRepository
 * @param {object} media
 * @returns {html}
 */
export const createPhotographerLightBox = (pictureNameRepository, media) => {
  const { title, src, type } = media;

  const picture = `../../assets/medias/photographers/${pictureNameRepository}/${src}`;
  // article container
  const mediaLightBox = document.querySelector('.modal__lightbox-media');
  // manage depends of media type format(image or video)
  let mediaPicture;
  if (type === 'image' && src != null) {
    mediaPicture = `
      
        <img class="modal__lightbox-picture" src="${picture}" alt="${title}" tabindex=0>
        <p class="modal__lightbox-media-title" aria-hidden="true">${title}</p>
 
    `;
  } else if (type === 'video' && src != null) {
    mediaPicture = `
      <div class="modal__lightbox-media-container">
          <video aria-labelledby="videoTitle" class="modal__lightbox-picture" controls>
            <source src=
            "${picture}"  type="video/mp4">
          </video>
          <p id="videoTitle" class="modal__lightbox-media-title">${title}</p> 
      </div>
          `;
  } else {
    mediaPicture = `<div aria-label="absence de media">Absence de media</div>`;
  }

  mediaLightBox.innerHTML = mediaPicture;
  return mediaLightBox;
};
