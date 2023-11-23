import { lightBox } from "./lightbox.js";

function medias(medias) {
  const { allMedias, firstName, photographerPrice, allLikes } = medias;
  let totalLikesAdded = 0;

  displayMedias();

  function displayMedias() {
    const mediaSection = document.querySelector(".media-section");
    mediaSection.innerHTML = "";

    allMedias?.forEach((media, index) => {
      const { image, video, title, likes } = media ?? {};

      const mediaLink = `assets/photographers/${firstName}/${
        image ?? video ?? ""
      }`;

      const mediaElement = media?.image
        ? `<img src="${mediaLink}" alt="${title}">`
        : `<video src="${mediaLink}" autoplay loop muted></video>`;

      mediaSection.appendChild(getMediaCard(mediaElement, title, likes, index));
    });
  }

  function getMediaCard(mediaElement, title, likes, index) {
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

    function addRemoveLike(mediaLikes, likes) {
      if (likeAdded === likes) {
        likeAdded = likes + 1;
        totalLikesAdded += 1;

        displayLikesContainer(allLikes + totalLikesAdded, photographerPrice);
        mediaLikes.innerHTML = `
            <p class="likes-number" aria-label="like added" tabindex="0">${likeAdded}  
              <i class="fa-solid fa-heart"></i>
            </p>
          `;
      } else {
        likeAdded = likes;
        totalLikesAdded -= 1;
        displayLikesContainer(allLikes + totalLikesAdded, photographerPrice);
        mediaLikes.innerHTML = `
            <p class="likes-number">${likeAdded}  
              <i class="fa-regular fa-heart"></i>
            </p>
          `;
      }
    }
    return mediaCard;
  }
}

function displayLikesContainer(totalLikes, price) {
  const likeContainer = document.querySelector(".total-likes");

  likeContainer.innerHTML = `
        <span>${totalLikes} <i class="fa-solid fa-heart"></i></span>
        <span>${price}€ / jour</span>
    `;
}

export { medias, displayLikesContainer };
