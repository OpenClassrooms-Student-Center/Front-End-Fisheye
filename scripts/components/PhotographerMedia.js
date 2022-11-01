import { MediaFactory } from "../factories/mediaFactory.js"
import { likedMediaList, displayedPhotographerData } from "../store/store.js"
import { faHeartIcon } from "./faHeartIcon.js"
import { ModalLightbox } from "./Lightbox.js"

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

  createMediaList() {
    const wrapper = document.createElement("figure")
    wrapper.classList = "mediaCard"
    wrapper.dataset.mediaId = `${this.media.id}`
    wrapper.innerHTML += new MediaFactory(this.media).createMedia(
      "profileMedia"
    )
    return wrapper
  }

  // Assigns a key-value pair to likedMedia array for each media, to keep track of its liked status
  addLikes() {
    const mediaId = this.media.id
    likedMediaList.push({ id: mediaId, status: false })
    const mediaCardLegend = document.querySelector(
      `[data-media-id="${mediaId}"] .media-legend`
    )
    mediaCardLegend.innerHTML += `<aside class="likes"><data value='${this.media.likes}'>${this.media.likes} </data><span tabindex="0" class="like-icon">${faHeartIcon}</span></aside>`
    const likeButton = document.querySelector(
      `[data-media-id="${mediaId}"] .like-icon`
    )
    likeButton.addEventListener("click", () =>
      this.incrementLikes(likeButton, mediaId)
    )
    likeButton.addEventListener("keydown", (event) => {
      if (event.key == "Enter") {
        this.incrementLikes(likeButton, mediaId)
      }
    })
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

  // Gets the value of sorting dropdown menu, then reorders the medias accordingly. Default behavior is to sort by popularity (done on first page load)
  static sortMedia() {
    const sortingParameter = document.getElementById("order-by").value
    displayedPhotographerData.media.sort((a, b) => {
      if (sortingParameter == "popularite" || sortingParameter == undefined) {
        return b.likes - a.likes
      } else if (sortingParameter == "date") {
        return b.date.localeCompare(a.date)
      } else if (sortingParameter == "titre") {
        return a.title.localeCompare(b.title)
      }
    })

    displayedPhotographerData.media.forEach((element) => {
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

  addLightboxEventListener() {
    const lightboxLinks = document.querySelector(
      `[data-media-id="${this.media.id}"] .media-thumbnail`
    )
    lightboxLinks.addEventListener("click", () =>
      new ModalLightbox(this.media).createModalContainer(this.media)
    )
    lightboxLinks.addEventListener("keydown", (event) => {
      if (
        event.key == "Enter" &&
        !document.querySelector(".lightbox-container")
      ) {
        new ModalLightbox(this.media).createModalContainer(this.media)
      }
    })
  }
}
