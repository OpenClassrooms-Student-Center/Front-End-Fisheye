// eslint-disable-next-line no-unused-vars
class Media {
  constructor (mediaData, photographerFolder) {
    this.date = mediaData.date
    this.id = mediaData.id
    this.likes = mediaData.likes
    this.photographerId = mediaData.photographerId
    this.price = mediaData.price
    this.title = mediaData.title
    
    this.photographerFolder = photographerFolder
    this.isLiked = false
  }

  swapLiked () {
    this.isLiked = !this.isLiked
    if (this.isLiked) {
        this.likes++
    } else {
        this.likes--
    }
    this.updateMediaCardDOM ()
  }

  updateMediaCardDOM () {
    const likeButton = document.querySelector(`#likes--${this.id}`)
    const totalMediaLikesElement = document.querySelector(`#totalMedialikes--${this.id}`)
    totalMediaLikesElement.textContent = this.likes
    if (likeButton.classList.contains('fa-solid')) {
      likeButton.classList.remove('fa-solid')
      likeButton.classList.add('fa-regular')
    } else {
      likeButton.classList.add('fa-solid')
      likeButton.classList.remove('fa-regular')
    }
  }

  getMediaCardDOM () {
    const heartValue = this.isLiked ? 'fa-solid' : 'fa-regular'
    // eslint-disable-next-line no-undef
    return htmlToElement(`
      <div class="mediaCard" id="mediaCard--${this.id}" tabindex="0">
        ${this.getSpecificDOM()}
        <div class="mediaCard__infos">
          <p class="mediaCard__infos--title">
          ${this.title}
          </p>
          <p class="mediaCard__infos--likes">
            <span id="totalMedialikes--${this.id}" aria-label="Total des likes pour ce media">${this.likes}</span> <i id="likes--${this.id}" class="${heartValue} fa-heart" aria-label="like" tabindex="0" ></i>
          </p>
        </div>
      </div>
    `)
  }

  getMediaLightboxDOM () {
    // eslint-disable-next-line no-undef
    return htmlToElement(`
      <div class="lightbox__content--middleColumn">
        <div class="lightbox__mediaContent" aria-label="${this.title}, vue rapprochée">
          ${this.getSpecificLightboxDOM()}
        </div>
        <div class="lightbox__mediaTitle">
          <h2>${this.title}</h2>
        </div>
      </div>
    `)
  }
}
