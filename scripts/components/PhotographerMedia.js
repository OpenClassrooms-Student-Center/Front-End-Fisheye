import { MediaFactory } from "../factories/mediaFactory.js"
import { ModalFactory } from "../factories/modalFactory.js"
import { likedMediaList, displayedPhotographerData } from "../store/store.js"
import { faHeartIcon, faHeartIconEmpty } from "./faHeartIcon.js"

export class PhotographerMedia {
  constructor(media) {
    this.media = media
  }

  static createMediaSection() {
    // Creates dropdown to sort medias
    const sortingMenu = document.createElement("div")
    sortingMenu.classList = "media-sorting-menu"
    document.querySelector("#main").appendChild(sortingMenu)
    sortingMenu.innerHTML += `<label class="sort-label" for="order-by">Trier par</label><select name="sort" id="order-by" class="dropdown-sort"><option value="popularite">Popularité</option><option value="date">Date</option><option value="titre">Titre</option></select>`
    const sortingDropdown = document.getElementById("order-by")
    sortingDropdown.addEventListener("change", () => this.sortMedia())

    // Creates media list container
    const mediaListContainer = document.createElement("section")
    mediaListContainer.classList = "photographer-media"
    document.querySelector("#main").appendChild(mediaListContainer)
  }

  // Creates media cards
  createMediaCard() {
    const mediaCard = document.createElement("figure")
    mediaCard.classList = "mediaCard"
    mediaCard.dataset.mediaId = `${this.media.id}`
    mediaCard.innerHTML += new MediaFactory(this.media).createMedia(
      "profileMedia"
    )
    return mediaCard
  }

  // Assigns a key-value pair to likedMedia array for each media, to keep track of its liked status
  addLikes() {
    const mediaId = this.media.id
    likedMediaList.push({ id: mediaId, status: false })
    const mediaCardLegend = document.querySelector(
      `[data-media-id="${mediaId}"] .media-legend`
    )
    mediaCardLegend.innerHTML += `<aside class="likes" aria-label="likes"><data value='${this.media.likes}'>${this.media.likes} </data><span tabindex="0" class="like-icon">${faHeartIconEmpty}</span></aside>`
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

  // Liking a media increase its likes count and the total like count by 1. Clicking a second time to unlike decrease both by 1.
  incrementLikes(likeButton, mediaId) {
    let likedMedia = likedMediaList.find((element) => element.id == mediaId)
    const totalLikes = document.querySelector(".total-likes")
    if (likedMedia.status === false) {
      totalLikes.value++
      likeButton.previousSibling.value++
      likeButton.innerHTML = faHeartIcon
      likedMedia.status = true
    } else {
      totalLikes.value--
      likeButton.previousSibling.value--
      likeButton.innerHTML = faHeartIconEmpty
      likedMedia.status = false
    }
    totalLikes.textContent = totalLikes.value
    likeButton.previousSibling.textContent = likeButton.previousSibling.value
  }

  // Gets the value of sorting dropdown menu, then reorders the medias accordingly. Default behavior is to sort by popularity (done on first page load)
  static sortMedia() {
    const sortingParameter = document.getElementById("order-by").value
    // Reorders the data in the store according to the sort parameter selected by user
    displayedPhotographerData.media.sort((a, b) => {
      if (sortingParameter == "popularite" || sortingParameter == undefined) {
        return b.likes - a.likes
      } else if (sortingParameter == "date") {
        return b.date.localeCompare(a.date)
      } else if (sortingParameter == "titre") {
        return a.title.localeCompare(b.title)
      }
    })

    // Reorders elements on the page based on their index in the reordered data in the store
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

  // Adds event listeners to media cards to open lightbox on click or pressing enter when focused
  addLightboxEventListener() {
    const lightboxLinks = document.querySelector(
      `[data-media-id="${this.media.id}"] .media-thumbnail`
    )
    lightboxLinks.addEventListener("click", () =>
      new ModalFactory("lightbox", this.media).getModalContainer(this.media)
    )
    lightboxLinks.addEventListener("keydown", (event) => {
      if (
        event.key == "Enter" &&
        document.querySelector(".lightbox-container") == null
      ) {
        new ModalFactory("lightbox", this.media).getModalContainer(this.media)
      }
    })
  }
}
