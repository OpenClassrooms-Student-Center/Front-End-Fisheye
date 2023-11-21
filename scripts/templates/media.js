import { changeFilter } from "../utils/utils.js";
function medias(medias) {
  const { allMedias, firstName, photographerPrice, allLikes } = medias;
  let totalLikesAdded = 0;
  let mediasSorted = changeFilter(allMedias);
  
  const filter = document.querySelector(".media-filter");

  filter.addEventListener("change", (event) => {
    const sort = event.target.value;
    displayMedias(changeFilter(allMedias, sort));
  });

  displayMedias(mediasSorted);

  function displayMedias(mediasSorted) {
    const mediaSection = document.querySelector(".media-section");
    mediaSection.innerHTML = "";

    mediasSorted?.forEach((media, index) => {
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
        <div class="media-picture">
          ${mediaElement}
        </div>
        <div class="media-infos" arial-label="media infos">
          <h3>${title}</h3>
          <div class="likes">
            <p class="likes-number">${likes}  
              <i class="fa-regular fa-heart"></i>
            </p>
          </div>
        </div>`;

    const mediaPicture = mediaCard.querySelector(".media-picture");
    const mediaLikes = mediaCard.querySelector(".likes");

    mediaPicture.addEventListener("click", () => displayLightbox(index));
    mediaLikes.addEventListener("click", () => {
      addRemoveLike(mediaLikes, likes);
    });

    function addRemoveLike(mediaLikes, likes) {
      if (likeAdded === likes) {
        likeAdded = likes + 1;
        totalLikesAdded += 1;

        displayLikesContainer(allLikes + totalLikesAdded, photographerPrice);
        mediaLikes.innerHTML = `
            <p class="likes-number">${likeAdded}  
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

  function displayLightbox(index) {
    const lightbox = document.querySelector(".lightbox");
    const lightboxClose = document.querySelector(".lightbox-close");
    const rightArrow = document.querySelector("#right-arrow");
    const leftArrow = document.querySelector("#left-arrow");

    lightbox.style.display = "block";

    lightboxClose.addEventListener("click", () => {
      lightbox.style.display = "none";
    });

    displayLightboxTemplate(index);

    rightArrow.addEventListener("click", () => {
      if (index === mediasSorted.length - 1) {
        index = 0;
      } else {
        index += 1;
      }
      displayLightboxTemplate(index);
    });

    leftArrow.addEventListener("click", () => {
      if (index === 0) {
        index = mediasSorted.length - 1;
      } else {
        index -= 1;
      }
      displayLightboxTemplate(index);
    });
  }

  function displayLightboxTemplate(index) {
    console.log("index", index);
    const mediaContent = document.querySelector(".media-content");

    const { image, video, title } = mediasSorted[index] ?? {};

    const mediaLink = `assets/photographers/${firstName}/${
      image ?? video ?? ""
    }`;

    const mediaElement = image
      ? `<img src="${mediaLink}" alt="${title}">`
      : `<video src="${mediaLink}" autoplay loop muted></video>`;

    mediaContent.innerHTML = `
          ${mediaElement}
          <div class="lightbox-infos">
            <h3>${title}</h3>
          </div>
      `;
  }

  return { getMediaCard, displayLightbox };
}

function displayLikesContainer(totalLikes, price) {
  const likeContainer = document.querySelector(".total-likes");

  likeContainer.innerHTML = `
        <span>${totalLikes} <i class="fa-solid fa-heart"></i></span>
        <span>${price}€ / jour</span>
    `;
}

export { medias, displayLikesContainer };
