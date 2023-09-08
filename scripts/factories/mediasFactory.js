function mediaTemplate(media, photographer) {
  const mediaSrc = getMediaSrc(media, photographer);
  const likeCount = document.createElement('p');
  const icon = document.createElement('span');

  /**
   * Create the media and title/likes container
   * @returns div
   */
  function mediaDOM() {
    const mediaContainer = document.createElement('div');

    const mediaElt = media.image ? createImage() : createVideo();

    const mediaTitleAndLikeContainer = createMediaTitleAndLikeContainer(media, likeCount, icon, incrementLikesEvent);

    mediaContainer.appendChild(mediaElt);
    mediaContainer.appendChild(mediaTitleAndLikeContainer);

    return mediaContainer;
  }

  function createImage() {
    const img = document.createElement('img');
    img.classList.add('media');
    img.src = mediaSrc;
    img.alt = media.title;

    return img;
  }

  function createVideo() {
    const video = document.createElement('video');
    video.classList.add('media');
    video.src = mediaSrc;
    
    return video;
  }

  /**
   * Function which increment the likes number of a media,
   * and increment the total of photographer's likes
   * Remove event after click to avoid multiple click
   */
  function incrementLikesEvent() {
    likeCount.textContent = parseInt(likeCount.textContent) + 1;
    const totalLikesElt = document.querySelector('.likes_container p');
    totalLikesElt.textContent = parseInt(totalLikesElt.textContent) + 1;
    icon.removeEventListener('click', incrementLikesEvent);
  }

  return { mediaDOM }
}

function getMediaSrc(media, photographer) {
  const photographerFirstname = photographer.name.split(' ')[0];
  return `assets/images/${photographerFirstname}/${media.image ?? media.video}`;
}

/**
 * Create the container of media title and likes count 
 * @param {*} media 
 * @param {*} likeCount 
 * @param {*} icon 
 * @param {*} incrementLikesEvent 
 * @returns div
 */
function createMediaTitleAndLikeContainer(media, likeCount, icon, incrementLikesEvent) {
  const div = document.createElement('div');
  div.classList.add('media_title_and_like_container');
  const h3 = document.createElement('h3');
  h3.textContent = media.title;

  const likeCountContainer = document.createElement('div');
  likeCountContainer.classList.add('like_count_container');
  likeCount.textContent = media.likes;
  icon.className += 'fa-solid fa-heart';
  icon.addEventListener('click', incrementLikesEvent);

  likeCountContainer.appendChild(likeCount);
  likeCountContainer.appendChild(icon);

  div.appendChild(h3);
  div.appendChild(likeCountContainer);

  return div;
}