function mediaFactory(media) {
    return {
      getMediaDOM: function () {
        const mediaDOM = document.createElement('div');
        mediaDOM.classList.add('photograph-media');
  
        const mediaLink = document.createElement('a');
        mediaLink.classList.add('photograph-media-link');
        if (media.video) {
          mediaLink.href = `assets/images/${media.photographerId}/${media.video}`;
        } else {
          mediaLink.href = `assets/images/${media.photographerId}/${media.image}`;
        }
  
        // check if video or img
        let mediaElement;
        if (media.video) {
          mediaElement = document.createElement('video');
          mediaElement.classList.add('photograph-media-video');
          mediaElement.src = `assets/images/${media.photographerId}/${media.video}`;
        } else {
          mediaElement = document.createElement('img');
          mediaElement.classList.add('photograph-media-img');
          mediaElement.src = `assets/images/${media.photographerId}/${media.image}`;
          mediaElement.alt = media.title;
        }
        
        mediaLink.appendChild(mediaElement);
        mediaDOM.appendChild(mediaLink);
  
        const mediaInfo = document.createElement('div');
        mediaInfo.classList.add('photograph-media-info');
  
        const mediaTitle = document.createElement('h2');
        mediaTitle.classList.add('photograph-media-title');
        mediaTitle.innerText = media.title;
  
        const mediaLikes = document.createElement('div');
        mediaLikes.classList.add('photograph-media-likes');
  
        const likeCount = document.createElement('span');
        likeCount.classList.add('photograph-media-likes-count');
        likeCount.innerText = media.likes;
        mediaLikes.appendChild(likeCount);
  
        const likeButton = document.createElement('i');
        likeButton.classList.add('fas', 'fa-heart');
        if (media.isLiked) {
          likeButton.classList.add('liked');
        }
        likeButton.addEventListener('click', function () {
          // Handle the click event here
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
        });
        mediaLikes.appendChild(likeButton);
  
        mediaInfo.appendChild(mediaTitle);
        mediaInfo.appendChild(mediaLikes);
  
        mediaDOM.appendChild(mediaInfo);
  
        return mediaDOM;
      },
    };
  }
  
  

  

  // const mediaPrice = document.createElement('div');
        // mediaPrice.classList.add('photograph-media-price');
        // mediaPrice.innerText = `$${media.price}`;

        // mediaLink.appendChild(mediaPrice);