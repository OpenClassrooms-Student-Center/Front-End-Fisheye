import { PhotographerPages } from "../pages/photographer.js";
// import { changeHeart } from "../utils/subject.js";

class PhotographerWork {
  constructor(photographer, media, likeSubject) {
    this._photographer = photographer;
    this._media = media;
    this._likeSubject = likeSubject;

    const mediasWrapper = document.querySelector("#medias-wrapper");

    const counterDiv = document.createElement("div");
    counterDiv.classList.add("counter");

    const counterDivHeartLikes = document.createElement("div");
    counterDivHeartLikes.classList.add("heartLikes");

    const counterDivHeart = document.createElement("div");
    counterDivHeart.classList.add("fas", "fa-heart-black");

    const counterDivLikes = document.createElement("div");
    counterDivLikes.classList.add("likes");
    const result = media.map((a) => a.likes);
    let sum = 0;
    for (let i = 0; i < result.length; i++) {
      sum += result[i];
    }

    counterDivLikes.innerHTML = sum;

    counterDivLikes;

    const counterDivPrice = document.createElement("div");
    counterDivPrice.classList.add("price");
    counterDivPrice.innerHTML = `${photographer.price}€ / jour`;

    counterDivHeartLikes.appendChild(counterDivLikes);
    counterDivHeartLikes.appendChild(counterDivHeart);
    counterDiv.appendChild(counterDivHeartLikes);
    counterDiv.appendChild(counterDivPrice);
    mediasWrapper.appendChild(counterDiv);
  }

  createPhotographerWork(photographer, media) {

    
    function changeHeart(clickedElement) {
      const far = document.querySelector(".far.fa-heart");
      const fas = document.querySelector(".fas.fa-heart");

      if (clickedElement === far) {
        far.style.display = far.style.display = "none";
        fas.style.display = "block";
      } else if (clickedElement === fas) {
        fas.style.display = fas.style.display = "none";
        far.style.display = "block";
      }
    }
    // Render lightbox
    media.forEach((media) => {
      const mediaTypeElement = document.createElement("p");

      const mediasWrapper = document.querySelector("#medias-wrapper");
      // Create a container for each media item
      const mediaContainer = document.createElement("div");
      mediaContainer.classList.add("media-info");

      // Create a container for media details
      const mediaImg = document.createElement("a");
      mediaImg.classList.add(`media-${media.id}`);

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
      const far = document.createElement("i");
      far.classList.add("far", "fa-heart");
      far.onclick = () => changeHeart(far);

      // Create a <p> element for the media title
      const fas = document.createElement("i");
      fas.classList.add("fas", "fa-heart");
      fas.style.display = "none";
      fas.onclick = () => changeHeart(fas);

      if (media.image) {
        mediaTypeElement.innerHTML = "Type: Image";
        // Construct the path to the image using the correct folder structure
        const imagePath = `assets/images/${photographer.name}/${media.image}`;

        // Create an <img> element for displaying the image
        const imageElement = document.createElement("img");
        imageElement.src = imagePath;
        imageElement.alt = media.title;
        imageElement.setAttribute("id", `media-${media.id}`);
        imageElement.onclick = () => this.openLightbox(media.id);

        // Append the image element to the mediaImg container
        mediaImg.appendChild(imageElement);
      } else if (media.video) {
        mediaTypeElement.innerHTML = "Type: Video";
        // Construct the path to the video using the correct folder structure
        const videoPath = `assets/images/${photographer.name}/${media.video}`;

        // Create a <video> element for displaying the video
        const videoElement = document.createElement("video");
        videoElement.src = videoPath;
        videoElement.alt = media.title;
        videoElement.setAttribute("id", `media-${media.id}`);
        videoElement.controls = true;
        videoElement.onclick = () => this.openLightbox(media.id);

        // Append the video element to the mediaImg container
        mediaImg.appendChild(videoElement);
      }

      // mediaDetails.appendChild(mediaIdElement);
      mediaDetails.appendChild(mediaTitleElement);
      mediaLikeContainer.appendChild(mediaLikeElement);
      mediaLikeContainer.appendChild(far);
      mediaLikeContainer.appendChild(fas);

      // Add the media details container to the media container
      mediaContainer.appendChild(mediaImg);
      mediaContainer.appendChild(mediaDetails);
      mediaContainer.appendChild(mediaDetails);
      mediaDetails.appendChild(mediaLikeContainer);

      // Add the media container to the medias wrapper
      mediasWrapper.appendChild(mediaContainer);
    });
  }
  openLightbox(mediaId) {
    const photographerPages = new PhotographerPages();
    photographerPages.lightbox(mediaId);
  }
}

export { PhotographerWork };
