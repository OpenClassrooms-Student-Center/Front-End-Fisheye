// OPEN
function openLightbox() {
  // display the lightbox with the clicked image
  document.querySelector('.lightbox').style.display = 'block';
}

// CLOSE
function closeLightbox() {
  // hide the lightbox
  document.querySelector('.lightbox').style.display = "none";

  // reset the video element to stop playback
  var video = document.querySelector('.photograph-media-video');
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
var closeButton = document.querySelector('.close-btn');
if (closeButton) {
  closeButton.addEventListener('click', closeLightbox);
}

// add an event listener for the escape key
document.addEventListener('keydown', handleKeyPress);

// add next and previous button functionality
var nextButton = document.createElement('button');
nextButton.className = 'fa fa-chevron-right next-btn';
nextButton.addEventListener('click', function () {
  showNextMediaItem();
});

var prevButton = document.createElement('button');
prevButton.className = 'fa fa-chevron-left prev-btn';
prevButton.addEventListener('click', function () {
  showPrevMediaItem();
});

var lightboxContainer = document.querySelector('.lightbox-container');
if (lightboxContainer) {
  lightboxContainer.appendChild(nextButton);
  lightboxContainer.appendChild(prevButton);
}

// show next media item
function showNextMediaItem() {
  var mediaItems = document.querySelectorAll('.media-lightbox');
  for (var i = 0; i < mediaItems.length; i++) {
    var currentMediaItem = mediaItems[i];
    if (currentMediaItem.style.display === 'flex') {
      var nextMediaItem = mediaItems[i + 1];
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
  var mediaItems = document.querySelectorAll('.media-lightbox');
  for (var i = 0; i < mediaItems.length; i++) {
    var currentMediaItem = mediaItems[i];
    if (currentMediaItem.style.display === 'flex') {
      var prevMediaItem = mediaItems[i - 1];
      if (prevMediaItem) {
        currentMediaItem.style.display = 'none';
        prevMediaItem.style.display = 'flex';
      }
      break;
    }
  }
}


