function mediaFactory(media) {
    return {
      getMediaDOM: function () {
        const mediaDOM = document.createElement('div');
        mediaDOM.classList.add('photograph-media');
  
        // define if video or img for the source link
        const mediaLink = document.createElement('a');
        mediaLink.classList.add('photograph-media-link');
        if (media.video) {
          mediaLink.href = `assets/images/${media.photographerId}/${media.video}`;
        } else {
          mediaLink.href = `assets/images/${media.photographerId}/${media.image}`;
        }
        // open lightbox on click
        mediaLink.addEventListener('click', function (e) {
          e.preventDefault();
          openLightbox(media);
        });
  
        // check if video or img
        let mediaElement;
        if (media.video) {
          mediaElement = document.createElement('video');
          mediaElement.classList.add('photograph-media-video');
          mediaElement.src = `assets/images/${media.photographerId}/${media.video}`;
          mediaElement.setAttribute('role', 'img');
        } else {
          mediaElement = document.createElement('img');
          mediaElement.classList.add('photograph-media-img');
          mediaElement.src = `assets/images/${media.photographerId}/${media.image}`;
          mediaElement.alt = media.title;
          mediaElement.setAttribute('role', 'img');
        }
  
        mediaLink.appendChild(mediaElement);
        mediaDOM.appendChild(mediaLink);
        
        // mediaInfo
        const mediaInfo = document.createElement('div');
        mediaInfo.classList.add('photograph-media-info');
        
        // mediaTitle
        const mediaTitle = document.createElement('h2');
        mediaTitle.classList.add('photograph-media-title');
        mediaTitle.innerText = media.title;
        mediaTitle.setAttribute('role', 'heading');
        mediaTitle.setAttribute('aria-level', '2');
        
        // mediaLikes
        const mediaLikes = document.createElement('div');
        mediaLikes.classList.add('photograph-media-likes');
  
        // likes per media
        const likeCount = document.createElement('span');
        likeCount.classList.add('photograph-media-likes-count');
        likeCount.innerText = media.likes;
        likeCount.setAttribute('role', 'text');
        mediaLikes.appendChild(likeCount);
  
        // like button 
        const likeButton = document.createElement('i');
        likeButton.classList.add('fas', 'fa-heart');
        if (media.isLiked) {
          likeButton.classList.add('liked');
        }
        likeButton.addEventListener('click', function () {
          // Handle the click event for adding or removing a like
          if (media.isLiked) {
            media.likes--;
            media.isLiked = false;
            likeButton.classList.remove('liked');
          } else {
            media.likes++;
            media.isLiked = true;
            likeButton.classList.add('liked');
          }
          likeCount.innerText = media.likes;
  
          // Update the total likes count in .counter
          const likesList = document.querySelectorAll('.photograph-media-likes-count');
          let totalLikes = 0;
          likesList.forEach((likesDiv) => {
            const likes = parseInt(likesDiv.textContent);
            totalLikes += likes;
          });
          const counterLikes = document.querySelector('.counter-likes');
          counterLikes.innerHTML = `${totalLikes} <i class="fas fa-heart"></i>`;
        });
        likeButton.setAttribute('role', 'button');
        likeButton.setAttribute('aria-label', 'Like');
        mediaLikes.appendChild(likeButton);
        mediaInfo.appendChild(mediaTitle);
        mediaInfo.appendChild(mediaLikes);
        mediaDOM.appendChild(mediaInfo);
  
        return mediaDOM;
      },
    };
  }

  let mediaList = []; // define mediaList as a global variable
  mediaList = [ /* array of media items goes here */ ];
  openLightbox(mediaList[0]); // display the first media item in the lightbox  

  function openLightbox(media) {
    const lightbox = document.createElement("div");
    lightbox.classList.add("lightbox");
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-label", "Media Lightbox");
  
    const lightboxBackdrop = document.createElement("div");
    lightboxBackdrop.classList.add("lightbox-backdrop");
    lightboxBackdrop.setAttribute("role", "presentation");
  
    const lightboxContent = document.createElement("div");
    lightboxContent.classList.add("lightbox-content");
    lightboxContent.setAttribute("role", "document");
  
    const lightboxClose = document.createElement("button");
    lightboxClose.classList.add("lightbox-close");
    lightboxClose.setAttribute("aria-label", "Close Lightbox");
    lightboxClose.innerHTML = '<i class="fas fa-times"></i>';
    lightboxClose.addEventListener("click", () => {
      document.body.removeChild(lightbox);
    });
    lightboxContent.appendChild(lightboxClose);
  
    const lightboxMediaContainer = document.createElement("div");
    lightboxMediaContainer.classList.add("lightbox-media-container");
  
    let mediaElement;
    if (media.video) {
      mediaElement = document.createElement("video");
      mediaElement.classList.add("lightbox-media");
      mediaElement.setAttribute("controls", "");
      mediaElement.src = `assets/images/${
        media.hasOwnProperty("photographerId") ? media.photographerId : ""
      }/${media.video}`;
    } else {
      mediaElement = document.createElement("img");
      mediaElement.classList.add("lightbox-media");
      mediaElement.src = `assets/images/${
        media.hasOwnProperty("photographerId") ? media.photographerId : ""
      }/${media.image}`;
      mediaElement.alt = media.hasOwnProperty("title") ? media.title : "";
    }
  
    lightboxMediaContainer.appendChild(mediaElement);
  
    const lightboxTitle = document.createElement("div");
    lightboxTitle.classList.add("lightbox-title");
    lightboxTitle.innerText = media.hasOwnProperty("title") ? media.title : "";
    lightboxMediaContainer.appendChild(lightboxTitle);
  
    lightboxContent.appendChild(lightboxMediaContainer);
  
    const lightboxPrevButton = document.createElement("button");
    lightboxPrevButton.classList.add("lightbox-prev");
    lightboxPrevButton.setAttribute("aria-label", "Previous media");
    lightboxPrevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    lightboxPrevButton.addEventListener("click", () => {
      const currentIndex = mediaList.findIndex((m) => m === media);
      const newIndex = (currentIndex - 1 + mediaList.length) % mediaList.length;
      const newMedia = mediaList[newIndex];
      document.body.removeChild(lightbox);
      openLightbox(newMedia);
    });
    lightboxContent.appendChild(lightboxPrevButton);
  
    const lightboxNextButton = document.createElement("button");
    lightboxNextButton.classList.add("lightbox-next");
    lightboxNextButton.setAttribute("aria-label", "Next media");
    lightboxNextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    lightboxNextButton.addEventListener("click", () => {
      const currentIndex = mediaList.findIndex((m) => m === media);
      const newIndex = (currentIndex + 1) % mediaList.length;
      const newMedia = mediaList[newIndex];
      document.body.removeChild(lightbox);
      openLightbox(newMedia);
    });
    lightboxContent.appendChild(lightboxNextButton);
  
    lightbox.appendChild(lightboxBackdrop);
    lightbox.appendChild(lightboxContent);
  
    document.body.appendChild(lightbox);
  
    // Add event listener for keyboard navigation
    document.addEventListener('keydown', handleLightboxKeyPress);
  
    function handleLightboxKeyPress(event) {
        const key = event.key;
        if (key === 'Escape') {
          document.body.removeChild(lightbox);
          document.removeEventListener('keydown', handleLightboxKeyPress);
        } else if (key === 'ArrowLeft') {
          const currentIndex = mediaList.findIndex(m => m === media);
          const newIndex = (currentIndex - 1 + mediaList.length) % mediaList.length;
          const newMedia = mediaList[newIndex];
          document.body.removeChild(lightbox);
          openLightbox(newMedia);
        } else if (key === 'ArrowRight') {
          const currentIndex = mediaList.findIndex(m => m === media);
          const newIndex = (currentIndex + 1) % mediaList.length;
          const newMedia = mediaList[newIndex];
          document.body.removeChild(lightbox);
          openLightbox(newMedia);
        }
        else if (key === 'ArrowLeft' || key === 'ArrowRight') {
          const currentIndex = mediaList.findIndex(m => m === media);
          const newIndex = (key === 'ArrowLeft') ? (currentIndex - 1 + mediaList.length) % mediaList.length : (currentIndex + 1) % mediaList.length;
          const newMedia = mediaList[newIndex];
          lightboxMediaContainer.removeChild(mediaElement);
          if (newMedia.video) {
            mediaElement = document.createElement('video');
            mediaElement.classList.add('lightbox-media');
            mediaElement.setAttribute('controls', '');
            mediaElement.src = `assets/images/${newMedia.hasOwnProperty('photographerId') ? newMedia.photographerId : ''}/${newMedia.video}`;
          } else {
            mediaElement = document.createElement('img');
            mediaElement.classList.add('lightbox-media');
            mediaElement.src = `assets/images/${newMedia.hasOwnProperty('photographerId') ? newMedia.photographerId : ''}/${newMedia.image}`;
            mediaElement.alt = newMedia.hasOwnProperty('title') ? newMedia.title : '';
          }
          lightboxMediaContainer.insertBefore(mediaElement, lightboxTitle.nextSibling);
          lightboxTitle.innerText = newMedia.hasOwnProperty('title') ? newMedia.title : '';
          media = newMedia;
        }
      }
}      