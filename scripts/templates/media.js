import { lightBox } from "./lightbox.js";
import { displayLikesContainer } from "./displayLikesContainer.js";

function mediaTemplate(allMedias, firstName, allLikes, photographerPrice) {

  let totalLikesAdded = 0;

  function getMediaCardDOM(mediaElement, title, likes, index) {
    let likeAdded = likes;

    const mediaCard = document.createElement("article");

    mediaCard.innerHTML = `
        <div class="media-picture" aria-label="media picture" tabindex="0">
          ${mediaElement}
        </div>
        <div class="media-infos" arial-label="media infos">
          <h3>${title}</h3>
          <div class="likes">
            <p class="likes-number" aria-label="likes number" tabindex="0">${likes}  
              <i class="fa-regular fa-heart"></i>
            </p>
          </div>
        </div>`;

    const mediaPicture = mediaCard.querySelector(".media-picture");
    const mediaLikes = mediaCard.querySelector(".likes");

    mediaPicture.addEventListener("click", lightBoxClickOrEnter);
    mediaPicture.addEventListener("keydown", lightBoxClickOrEnter);
    mediaLikes.addEventListener("click", handleLikeClickOrEnter);
    mediaLikes.addEventListener("keydown", handleLikeClickOrEnter);

    function lightBoxClickOrEnter(event) {
      if (event.type === "click" || event.key === "Enter") {
        lightBox(index, allMedias, firstName);
        mediaCard.style.display = "none";
      }
    }

    function handleLikeClickOrEnter(event) {
      if (event.type === "click" || event.key === "Enter") {
        addRemoveLike(mediaLikes, likes);
      }
    }

    // if like is added or removed from media card then add or remove like from totalLikes
    function addRemoveLike(mediaLikes, likes) {
      if (likeAdded === likes) {
        likeAdded = likes + 1;
        totalLikesAdded += 1;
        mediaLikes.innerHTML = `
            <p class="likes-number" aria-label="like added" tabindex="0">${likeAdded}  
              <i class="fa-solid fa-heart"></i>
            </p>
          `;
      } else {
        likeAdded = likes;
        totalLikesAdded -= 1;
        mediaLikes.innerHTML = `
            <p class="likes-number">${likeAdded}  
              <i class="fa-regular fa-heart"></i>
            </p>
          `;
      }
      displayLikesContainer(allLikes + totalLikesAdded, photographerPrice);
    }
    return mediaCard;
  }
  return {
    getMediaCardDOM,
  };
}

function getMediaCard({
  mediaElement,
  title,
  likes,
  allMedias,
  firstName,
  index,
  allLikes,
  photographerPrice,
}) {
  return mediaTemplate(
    allMedias,
    firstName,
    allLikes,
    photographerPrice
  ).getMediaCardDOM(mediaElement, title, likes, index);
}

export { getMediaCard };
