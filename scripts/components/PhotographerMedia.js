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

  createDropdownOrder() {
    const wrapper = document.createElement("div")
    wrapper.classList = "media-sorting-menu"
    document.querySelector("#main").appendChild(wrapper)
    wrapper.innerHTML += `<label for="order-by">Trier par</label><select name="sort" id="order-by" class="dropdown-sort"><option value="popularite">Popularité</option><option value="date">Date</option><option value="titre">Titre</option></select>`
    return wrapper
  }

  createMediaList() {
    const wrapper = document.createElement("figure")
    wrapper.classList = "mediaCard"
    wrapper.innerHTML += `${
      this.media.photo
        ? `<img src="assets/${this.media.photographerId}/${this.media.photo}" alt="${this.media.title}" class="thumb-img">`
        : `<video>${this.media.title}
    <source src="assets/${this.media.photographerId}/${this.media.video}" type="video/mp4" class="thumb-img">
    </video>`
    }
    <div class="media-legend"><figcaption>${
      this.media.title
    }</figcaption><aside class="likes">${
      this.media.likes
    } ${faHeartIcon}</aside></div>`
    return wrapper
  }  
}
