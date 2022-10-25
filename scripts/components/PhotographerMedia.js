import { likedMedia, loadSortedMedia } from "../pages/photographer.js"
import { faHeartIcon } from "./faHeartIcon.js"

export class PhotographerMedia {
  constructor(media) {
    this.media = media
  }

  createMediaSection() {
    const newSection = document.createElement("section")
    newSection.classList = "photographer-media"
    document.querySelector("#main").appendChild(newSection)
  }

  static createDropdownOrder() {
    const wrapper = document.createElement("div")
    wrapper.classList = "media-sorting-menu"
    document.querySelector("#main").appendChild(wrapper)
    wrapper.innerHTML += `<label class="sort-label" for="order-by">Trier par</label><select name="sort" id="order-by" class="dropdown-sort"><option value="popularite">Popularité</option><option value="date">Date</option><option value="titre">Titre</option></select>`
    const sortingDropdown = document.getElementById("order-by")
    sortingDropdown.addEventListener("change", this.sortMedia)
    return wrapper
  }

  createMediaList() {
    const wrapper = document.createElement("figure")
    wrapper.classList = "mediaCard"
    wrapper.id = `media-${this.media.id}`
    wrapper.innerHTML += `${
      this.media.photo
        ? `<img src="assets/${this.media.photographerId}/${this.media.photo}" alt="${this.media.title}" class="thumb-img">`
        : `<video>${this.media.title}
    <source src="assets/${this.media.photographerId}/${this.media.video}" type="video/mp4" class="thumb-img">
    </video>`
    }
    <div class="media-legend"><figcaption>${
      this.media.title
    }</figcaption><aside class="likes"><data value='${this.media.likes}'>${
      this.media.likes
    } </data>${faHeartIcon}</aside></div>`
    return wrapper
  }

  // Assigns a key-value pair to likedMedia array for each media, to keep track of its liked status
  addLikes() {
    likedMedia.push({ media: this.media.id, status: false })
    const likeButton = document.querySelector(
      `#media-${this.media.id} > .media-legend > .likes > .fa-heart`
    )
    likeButton.addEventListener("click", this.incrementLikes)
  }

  incrementLikes() {
    const likedMediaId = this.closest(".mediaCard").id.replace("media-", "")
    let likedMediaStatus = likedMedia.find(
      (mediaId) => mediaId.media == likedMediaId
    )
    const totalLikes = document.querySelector(".total-likes")
    if (likedMediaStatus.status === false) {
      totalLikes.value++
      this.previousSibling.value++
      likedMediaStatus.status = true
    } else {
      totalLikes.value--
      this.previousSibling.value--
      likedMediaStatus.status = false
    }
    totalLikes.textContent = totalLikes.value
    this.previousSibling.textContent = this.previousSibling.value
  }

  static sortMedia() {
    loadSortedMedia()
  }
}