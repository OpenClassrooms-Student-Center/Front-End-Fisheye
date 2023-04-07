function mediaFactory(media) {
    return {
      // getMediaLightbox
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