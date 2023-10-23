import { onOpenPic } from "../utils/photoModal.js";
import { Lightbox } from "./lightbox.js";

class PhotographerWork {
  constructor(photographer, media, lightbox) {
    this._photographer = photographer;
    this._media = media;
    this._lightbox = lightbox;
  }

  createPhotographerWork(photographer, media, lightbox) {
    // console.log("lightboxWork", lightbox);
    media.forEach((media) => {
      const mediasWrapper = document.querySelector("#medias-wrapper");
      console.log(photographer.name);
      // Create a container for each media item
      const mediaContainer = document.createElement("div");
      mediaContainer.classList.add("media-info");

      // Create a container for media details
      const mediaImg = document.createElement("a");
      mediaImg.classList.add(`media-img-${media.id}`);

      //append to link
      const portraitElement = document.createElement("img");
      const imagePath = `assets/images/${photographer.name}/${media.image}`;
      portraitElement.src = imagePath;
      portraitElement.alt = `${photographer._name}`;

      const mediaDetails = document.createElement("div");
      mediaDetails.classList.add("media-details");

      // Create a <p> element for the media ID
      const mediaIdElement = document.createElement("p");
      mediaIdElement.innerHTML = `ID: ${media.id}`;

      // Create a <p> element for the media title
      const mediaTitleElement = document.createElement("p");
      mediaTitleElement.innerHTML = media.title;

      // Create a <p> element for the media title
      const mediaLikeContainer = document.createElement("div");
      mediaLikeContainer.classList.add("media-like");

      // Create a <p> element for the media title
      const mediaLikeElement = document.createElement("p");
      mediaLikeElement.innerHTML = media.likes;

      // Create a <p> element for the media title
      const mediaLikeHeartElement = document.createElement("i");
      mediaLikeHeartElement.classList.add("fa-solid", "fa-heart");

      //   Construct the path to the image using the correct folder structure

      // mediaDetails.appendChild(mediaIdElement);
      mediaDetails.appendChild(mediaTitleElement);
      mediaLikeContainer.appendChild(mediaLikeElement);
      mediaLikeContainer.appendChild(mediaLikeHeartElement);

      // Add the media details container to the media container
      mediaContainer.appendChild(mediaImg);
      mediaImg.appendChild(portraitElement);
      mediaContainer.appendChild(mediaDetails);
      mediaContainer.appendChild(mediaDetails);
      mediaDetails.appendChild(mediaLikeContainer);

      // Add the media container to the medias wrapper
      mediasWrapper.appendChild(mediaContainer);
    });
  }
}

export { PhotographerWork };
