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
}
