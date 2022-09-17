import { MEDIAS_FOLDER } from '../utils/config';
import PhotoView from '../views/photoView';
import VideoView from '../views/videoView';

export const mediaFactory = mediaList => {
  const orderByPopularity = () => {
    mediaList = mediaList.sort((media1, media2) =>
      media1.likes > media2.likes ? -1 : 1
    );
  };
  const orderByDate = () => {
    mediaList = mediaList.sort((media1, media2) =>
      media1.date.getTime() > media2.date.getTime() ? -1 : 1
    );
  };
  const orderByTitle = () => {
    mediaList = mediaList.sort((media1, media2) =>
      media1.title.localeCompare(media2.title, 'en', { sensitivity: 'base' })
    );
  };

  const nbMedias = mediaList.length;
  let currentViewIndex = 0;

  const next = () => {
    if (++currentViewIndex > nbMedias)
      currentViewIndex = currentViewIndex % nbMedias;
    return mediaList[currentViewIndex];
  };
  const previous = () => {
    if (--currentViewIndex < 0) currentViewIndex = nbMedias - 1;
    return mediaList[currentViewIndex];
  };
  const currentMedia = (mediaId = '') => {
    return mediaId
      ? mediaList.find(mediaItem => Number.parseInt(mediaId) === mediaItem.id)
      : mediaList[currentViewIndex];
  };

  const generateNewView = type => {
    switch (type) {
      case 'image':
        return new PhotoView('Erreur de chargement de la photo');
      case 'video':
        return new VideoView('Error de chargement de la vidéo');
    }
    return null;
  };
  const getMediaViews = (filterValue = 0) => {
    filterValue === 0
      ? orderByPopularity()
      : filterValue === 1
      ? orderByDate()
      : orderByTitle();
    return mediaList.map(media => {
      const type = media.image ? 'image' : 'video';
      return {
        data: media,
        view: generateNewView(type),
      };
    });
  };

  const getPhoto = media => {
    return `<img class="lightbox-modal__media" src="${MEDIAS_FOLDER}photos/${media.image}" alt="${media.title}" />`;
  };
  const getVideo = media => {
    return `
    <video class="lightbox-modal__media" title="${media.title}" aria-label="${media.title}" controls>
      <source src="${MEDIAS_FOLDER}videos/${media.video}" />
      Your browser does not support the video tag.
    </video>
    `;
  };
  const getLightBox = media => {
    const markup = `
    <div class="lightbox-modal__background">
      <div class="lightbox-modal" role="dialog" aria-modal="true" aria-label="Vue rapprochée de l'image">
        <header class="lightbox-modal__header">
          <img src="assets/icons/close-red.svg" class="lightbox-modal__close-btn" aria-label="Close" />
          <a href="#" class="lightbox-modal__navigation lightbox-modal__previous-btn" aria-label="Image ou Vidéo précédente" data-behavior="previous">&#9001;</a>
          <a href="#" class="lightbox-modal__navigation lightbox-modal__next-btn" aria-label="Image ou Vidéo Image suivante" data-behavior="next">&#9002;</a>
        </header>
        <div class="lightbox-modal__content">
          ${media.image ? getPhoto(media) : getVideo(media)}
          <h2 class="lightbox-modal__title">${media.title}</h2>
        </div>
      </div>
    </div>
    `;
    return markup;
  };

  return {
    getMediaViews,
    getPhoto,
    getVideo,
    previous,
    next,
    currentMedia,
    getLightBox,
    orderByPopularity,
    orderByDate,
    orderByTitle,
  };
};
