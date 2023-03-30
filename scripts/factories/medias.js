function mediaFactory(media) {

    return {
      getMediaDOM: function() {
        const mediaDOM = document.createElement('div')
        mediaDOM.classList.add('photograph-media')
  
        const mediaLink = document.createElement('a')
        mediaLink.classList.add('photograph-media-link')
        mediaLink.href = `./${media.image}`

        const mediaImg = document.createElement('img')
        mediaImg.classList.add('photograph-media-img')
        mediaImg.src = `assets/images/${media.photographerId}/${media.image}`
        mediaImg.alt = media.title;
  
        const mediaTitle = document.createElement('h2')
        mediaTitle.classList.add('photograph-media-title')
        mediaTitle.innerText = media.title;
  
        const mediaLikes = document.createElement('div')
        mediaLikes.classList.add('photograph-media-likes')
        mediaLikes.innerHTML = `
          <span class="photograph-media-likes-count">${media.likes}</span>
          <i class="fas fa-heart"></i>
        `
  
        mediaLink.appendChild(mediaImg)
        mediaLink.appendChild(mediaTitle)
        mediaLink.appendChild(mediaLikes)
        mediaDOM.appendChild(mediaLink)
  
        return mediaDOM
      }
    }
  }

  // const mediaPrice = document.createElement('div');
        // mediaPrice.classList.add('photograph-media-price');
        // mediaPrice.innerText = `$${media.price}`;

        // mediaLink.appendChild(mediaPrice);