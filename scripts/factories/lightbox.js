// OPEN
function openLightbox() {
  // display the lightbox with the clicked image
  document.querySelector('.lightbox').style.display = 'block';
  document.querySelector('.lightbox').setAttribute('aria-hidden', 'false');
}

// CLOSE
function closeLightbox() {
  // hide the lightbox
  document.querySelector('.lightbox').style.display = "none";
  document.querySelector('.lightbox').setAttribute('aria-hidden', 'true');

  // reset the video element to stop playback
  const video = document.querySelector('.photograph-media-video');
  if (video) {
    video.pause();
    video.currentTime = 0;
  }
}

// KEYBOARD
function handleKeyPress(event) {
  // check if the escape key was pressed
  if (event.keyCode === 27) {
    closeLightbox();
  }
  
  // check if left arrow key was pressed
  if (event.keyCode === 37) {
    showPrevMediaItem();
  }
  
  // check if right arrow key was pressed
  if (event.keyCode === 39) {
    showNextMediaItem();
  }
}


// add an event listener to the close button
const closeButton = document.querySelector('.close-btn');
closeButton.setAttribute('aria-label', 'close')
if (closeButton) {
  closeButton.addEventListener('click', closeLightbox);
}

// add an event listener for the escape key
document.addEventListener('keydown', handleKeyPress);

// add next and previous button functionality
const nextButton = document.createElement('button');
nextButton.className = 'fa fa-chevron-right next-btn';
nextButton.setAttribute('role', 'button')
nextButton.setAttribute('aria-label', 'next media')
nextButton.addEventListener('click', function () {
  showNextMediaItem();
});

const prevButton = document.createElement('button');
prevButton.className = 'fa fa-chevron-left prev-btn';
prevButton.setAttribute('role', 'button')
prevButton.setAttribute('aria-label', 'previous media')
prevButton.addEventListener('click', function () {
  showPrevMediaItem();
});

const lightboxContainer = document.querySelector('.lightbox-container');
if (lightboxContainer) {
  lightboxContainer.appendChild(nextButton);
  lightboxContainer.appendChild(prevButton);
}

// show next media item
function showNextMediaItem() {
  const mediaItems = document.querySelectorAll('.media-lightbox');
  for (let i = 0; i < mediaItems.length; i++) {
    let currentMediaItem = mediaItems[i];
    if (currentMediaItem.style.display === 'flex') {
      let nextMediaItem = mediaItems[i + 1];
      if (nextMediaItem) {
        currentMediaItem.style.display = 'none';
        nextMediaItem.style.display = 'flex';
      }
      break;
    }
  }
}

// show previous media item
function showPrevMediaItem() {
  const mediaItems = document.querySelectorAll('.media-lightbox');
  for (let i = 0; i < mediaItems.length; i++) {
    let currentMediaItem = mediaItems[i];
    if (currentMediaItem.style.display === 'flex') {
      let prevMediaItem = mediaItems[i - 1];
      if (prevMediaItem) {
        currentMediaItem.style.display = 'none';
        prevMediaItem.style.display = 'flex';
      }
      break;
    }
  }
}


