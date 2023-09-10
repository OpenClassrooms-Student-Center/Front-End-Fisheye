function mediaTemplate(media, photographer, mediasList) {
  // Index of selected Image
  let currentIndex = -1;

  let mediaSrc = getMediaSrc(media, photographer);
  // Set here to add and remove event easily
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

  /**
   * Create the lightbox content with an image or a video
   * @param {*} media image or video
   */
  function showMedia(media) {
    // Set currentIndex with the selected media index
    currentIndex = mediasList.findIndex(med => med.id === media.id);
    mediaSrc = getMediaSrc(media, photographer);

    const lightbox = document.querySelector('.lightbox');
    lightbox.innerHTML = '';
    
    // Create previous button
    const previousBtnContainer = createPreviousBtn();
    lightbox.appendChild(previousBtnContainer);

    // Create img or video
    const mediaElt = media.image ? createImage() : createVideo(true);  
    lightbox.appendChild(mediaElt);

    // Create close and next button
    const nextAndCloseBtnContainer = createCloseAndNextBtn();
    lightbox.appendChild(nextAndCloseBtnContainer);

    // Media title
    const titleElt = document.createElement('h3');
    titleElt.textContent = media.title;
    lightbox.appendChild(titleElt);

    // const lightbox = document.querySelector('.lightbox');
    // lightbox.innerHTML = `
    //   <div class="previous_btn_container">
    //     <button id="previous" class="btn">
    //       <span class="fa-solid fa-chevron-left fa-2xl"></span>
    //     </button>
    //   </div>
    //   `
      
    //   const mediaElt = media.image ? createImage() : createVideo(true);  
    //   lightbox.appendChild(mediaElt);

    //   lightbox.innerHTML += `
    //   <div class="close_and_btn_container">
    //     <div class="close_icon_container">
    //       <span class="fa-solid fa-xmark fa-2xl"></span>
    //     </div>
    //     <button id="next" class="btn">
    //       <span class="fa-solid fa-chevron-right fa-2xl"></span>
    //     </button>
    //     <div class="empty"></div>
    //   </div>
    //   <h3>${media.title}</h3>
    // `

    const previousBtnElt = document.querySelector('#previous');
    previousBtnElt.addEventListener('click', showPreviousMedia);

    const closeBtn = document.querySelector('.close_icon_container');
    closeBtn.addEventListener('click', closeModal);

    const nextBtnElt = document.querySelector('#next');
    nextBtnElt.addEventListener('click', showNextMedia);
  }
  
  /**
   * Get previous media index to find the media to show, then call showMedia function
   */
  function showPreviousMedia() {
    const previousIndex = currentIndex === 0 ? mediasList.length - 1 : currentIndex - 1;
    const previousMedia = mediasList[previousIndex];

    showMedia(previousMedia);
  }

  /**
   * Get next media index to find the media to show, then call showMedia function
   */
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
  
  /**
   * Create the div containing lightbox previous button
   * @returns div
   */
  function createPreviousBtn() {
    const previousBtnContainer = document.createElement('div');
    previousBtnContainer.classList.add('previous_btn_container');
    const previousBtn = document.createElement('button');
    previousBtn.id = 'previous';
    previousBtn.classList.add('btn');
    const btnIcon = document.createElement('span');
    btnIcon.className = 'fa-solid fa-chevron-left fa-2xl';
    previousBtn.appendChild(btnIcon);
    previousBtnContainer.appendChild(previousBtn);

    return previousBtnContainer;
  }

  /**
   * Create the div containing lightbox close and next buttons
   * @returns div
   */
  function createCloseAndNextBtn() {
    const closeAndBtnContainer = document.createElement('div');
    closeAndBtnContainer.classList.add('close_and_btn_container');
    const closeIconContainer = document.createElement('div');
    closeIconContainer.classList.add('close_icon_container');
    const closeIcon = document.createElement('span');
    closeIcon.className = 'fa-solid fa-xmark fa-2xl';

    closeIconContainer.appendChild(closeIcon);

    const nextBtn = document.createElement('button');
    nextBtn.id = 'next';
    nextBtn.classList.add('btn');
    const btnIcon = document.createElement('span');
    btnIcon.className = 'fa-solid fa-chevron-right fa-2xl';
    nextBtn.appendChild(btnIcon);

    const emptyDiv = document.createElement('div');
    emptyDiv.classList.add('empty');

    closeAndBtnContainer.appendChild(closeIconContainer);
    closeAndBtnContainer.appendChild(nextBtn);
    closeAndBtnContainer.appendChild(emptyDiv);

    return closeAndBtnContainer;
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