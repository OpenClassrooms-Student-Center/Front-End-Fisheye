openLightbox(); 
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
  
    lightboxMediaContainer.innerHTML = '';
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
