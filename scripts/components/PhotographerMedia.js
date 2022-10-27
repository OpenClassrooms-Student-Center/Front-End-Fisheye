import {
  likedMediaList,
  thatPhotographerMedias,
} from "../pages/photographer.js"
import { faHeartIcon } from "./faHeartIcon.js"

export class PhotographerMedia {
  constructor(media) {
    this.media = media
  }

  static createMediaSection() {
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
    sortingDropdown.addEventListener("change", () => this.sortMedia())
    return wrapper
  }

  createMediaList(mediaIndex) {
    const wrapper = document.createElement("figure")
    wrapper.classList = "mediaCard"
    wrapper.dataset.mediaId = `${this.media.id}`
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
    const mediaId = this.media.id
    likedMediaList.push({ id: mediaId, status: false })
    const likeButton = document.querySelector(
      `[data-media-id="${mediaId}"] .fa-heart`
    )
    likeButton.addEventListener("click", () =>
      this.incrementLikes(likeButton, mediaId)
    )
  }

  incrementLikes(likeButton, mediaId) {
    let likedMedia = likedMediaList.find((element) => element.id == mediaId)
    const totalLikes = document.querySelector(".total-likes")
    if (likedMedia.status === false) {
      totalLikes.value++
      likeButton.previousSibling.value++
      likedMedia.status = true
    } else {
      totalLikes.value--
      likeButton.previousSibling.value--
      likedMedia.status = false
    }
    totalLikes.textContent = totalLikes.value
    likeButton.previousSibling.textContent = likeButton.previousSibling.value
  }

  static sortMedia() {
    const sortingParameter = document.getElementById("order-by").value
    thatPhotographerMedias[0].sort((a, b) => {
      if (sortingParameter == "popularite" || sortingParameter == undefined) {
        return b.likes - a.likes
      } else if (sortingParameter == "date") {
        return b.date.localeCompare(a.date)
      } else if (sortingParameter == "titre") {
        return a.title.localeCompare(b.title)
      }
    })

    thatPhotographerMedias[0].forEach((element) => {
      for (let media of document.querySelectorAll(".mediaCard")) {
        let dataId = media.getAttribute("data-media-id")
        if (dataId == element.id) {
          document
            .querySelector(".photographer-media")
            .insertBefore(media, undefined)
        }
      }
    })
  }
}
