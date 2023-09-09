function mediaTemplate(media, photographer, mediasList) {
  let currentIndex = -1;

  let mediaSrc = getMediaSrc(media, photographer);
  const likeCount = document.createElement('p');
  const icon = document.createElement('span');

  /**
   * Create the media and title/likes container
   * @returns div
   */
  function mediaDOM() {
    const mediaContainer = document.createElement('div');
    
    const mediaElt = media.image ? createImage() : createVideo();
    mediaElt.classList.add('media');
    mediaElt.addEventListener('click', () => openLightbox(media));

    const mediaTitleAndLikeContainer = createMediaTitleAndLikeContainer();

    mediaContainer.appendChild(mediaElt);
    mediaContainer.appendChild(mediaTitleAndLikeContainer);

    return mediaContainer;
  }

  function createImage() {
    const img = document.createElement('img');
    img.src = mediaSrc;
    img.alt = media.title;

    return img;
  }

  function createVideo(withControls = false) {
    const video = document.createElement('video');
    video.src = mediaSrc;
    video.controls = withControls;
    
    return video;
  }

  function showMedia(media) {
    currentIndex = mediasList.findIndex(med => med.id === media.id);
    mediaSrc = getMediaSrc(media, photographer);
    const lightboxModal = document.getElementById('lightbox_modal');
    lightboxModal.innerHTML = `
      <div class="lightbox">
      </div>
    `
        
    const lightbox = document.querySelector('.lightbox');
    lightbox.innerHTML = `
        <div class="previous_btn_container">
          <button id="previous" class="btn">
            <span class="fa-solid fa-chevron-left fa-2xl"></span>
          </button>
        </div>
        `
        
        const mediaElt = media.image ? createImage() : createVideo(true);  
        lightbox.appendChild(mediaElt);

        lightbox.innerHTML += `
        <div class="close_and_btn_container">
          <div class="close_icon_container">
            <span class="fa-solid fa-xmark fa-2xl"></span>
          </div>
          <button id="next" class="btn" onclick="showNextMedia(${currentIndex})">
            <span class="fa-solid fa-chevron-right fa-2xl"></span>
          </button>
          <div class="empty"></div>
        </div>
        <h3>${media.title}</h3>
    `
    
    // const titleElt = document.createElement('h3');
    // titleElt.textContent = media.title;
    // lightboxModal.appendChild(titleElt);

    const previousBtnElt = document.querySelector('#previous');
    previousBtnElt.addEventListener('click', showPreviousMedia);

    const closeBtn = document.querySelector('.close_icon_container');
    closeBtn.addEventListener('click', closeModal);

    const nextBtnElt = document.querySelector('#next');
    nextBtnElt.addEventListener('click', showNextMedia);
  }
  
    
  function showPreviousMedia() {
    const previousIndex = currentIndex === 0 ? mediasList.length - 1 : currentIndex - 1;
    const previousMedia = mediasList[previousIndex];

    showMedia(previousMedia);
  }

  function showNextMedia() {
    const nextIndex = currentIndex === mediasList.length - 1 ? 0 : currentIndex + 1;
    const nextMedia = mediasList[nextIndex];

    showMedia(nextMedia);
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

  /**
   * Create the container of media title and likes count 
   * @param {*} media 
   * @param {*} likeCount 
   * @param {*} icon 
   * @param {*} incrementLikesEvent 
   * @returns div
   */
  function createMediaTitleAndLikeContainer() {
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
  
  function openLightbox() {
    const lightboxModal = document.getElementById('lightbox_modal');
    lightboxModal.classList.remove('hidden');
    
    showMedia(media);
  }

  function closeModal() {
    const lightboxModal = document.getElementById('lightbox_modal');
    lightboxModal.classList.add('hidden');
  }
  
  return { mediaDOM }
}

/**
 * Get photographer firstname to create the source media
 * @param {*} media 
 * @param {*} photographer 
 * @returns string
 */
function getMediaSrc(media, photographer) {
  const photographerFirstname = photographer.name.split(' ')[0];
  return `assets/images/${photographerFirstname}/${media.image ?? media.video}`;
}


// function showMedia(media) {
//   currentIndex = medias.findIndex(med => med.id === media.id);
//   const mediaSrc = getMediaSrc(media, photograph);
//   const lightboxModal = document.getElementById('lightbox_modal');
//   lightboxModal.innerHTML = `
//     <div class="lightbox">
//       <div class="previous_btn_container">
//         <button id="previous" class="btn" onclick="showPreviousMedia(${currentIndex})">
//           <span class="fa-solid fa-chevron-left fa-2xl"></span>
//         </button>
//       </div>
//       <img src="${mediaSrc}" alt="${media.title}">
//       <div class="close_and_btn_container">
//         <div class="close_icon_container" onclick="closeModal()">
//           <span class="fa-solid fa-xmark fa-2xl"></span>
//         </div>
//         <button id="next" class="btn" onclick="showNextMedia(${currentIndex})">
//           <span class="fa-solid fa-chevron-right fa-2xl"></span>
//         </button>
//         <div class="empty"></div>
//       </div>
//       <h3>${media.title}</h3>
//     </div>
//   `
// }
