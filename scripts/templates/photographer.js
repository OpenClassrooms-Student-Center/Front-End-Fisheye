let totalLikesAdded = 0;
let photographerPrice = 0;
let allPhotographerLikes = 0;

function displayModal() {
  const modal = document.querySelector("#contact_modal");
  modal.style.display = "block";
}

function photographerTemplate({
  name,
  portrait,
  city,
  country,
  tagline,
  price,
  id,
  allLikes,
}) {
  const picture = `assets/photographers/${portrait}`;

  photographerPrice = price;
  allPhotographerLikes = allLikes;

  function getUserCardDOM() {
    console.log("all",allLikes);
    const article = document.createElement("article");
    article.innerHTML = `
      <a href="photographer.html?id=${id}">
        <img src="${picture}" alt="${name}">
        </a>
        <h2>${name}</h2>
        <p class="location">${city}, ${country}</p>
        <p class="tagline">${tagline}</p>
        <p class="price">${price}€/jour</p>
    `;
    return article;
  }

  function getUserHeroBanner() {
    const userInfos = document.createElement("article");
    userInfos.innerHTML = `
        <h2>${name}</h2>
        <p class="location">${city}, ${country}</p>
        <p class="tagline">${tagline}</p>
    `;

    const userPicture = document.createElement("img");
    userPicture.src = picture;
    userPicture.alt = name;

    return { userInfos, userPicture };
  }

  return { getUserCardDOM, getUserHeroBanner };
}

function mediaTemplate(media, firstName) {
  const { image, video, title, likes } = media;

  let likeAdded = likes;

  const mediaLink = `assets/photographers/${firstName}/${image ?? video}`;

  const mediaElement = image
    ? `<img src="${mediaLink}" alt="${title}">`
    : `<video src="${mediaLink}" autoplay loop muted></video>`;

  function getMediaCard(totalLikes) {
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

    mediaPicture.addEventListener("click", displayLightbox);
    mediaLikes.addEventListener("click", () => {
      addRemoveLike(mediaLikes, likes);
    });

    function addRemoveLike(mediaLikes, likes) {
      if (likeAdded === likes) {
        likeAdded = likes + 1;
        totalLikesAdded += 1;

        getLikeContainer(allPhotographerLikes + totalLikesAdded, photographerPrice);
        mediaLikes.innerHTML = `
          <p class="likes-number">${likeAdded}  
            <i class="fa-solid fa-heart"></i>
          </p>
        `;
      } else {
        likeAdded = likes;
        totalLikesAdded -= 1;
        getLikeContainer(allPhotographerLikes + totalLikesAdded, photographerPrice);
        mediaLikes.innerHTML = `
          <p class="likes-number">${likeAdded}  
            <i class="fa-regular fa-heart"></i>
          </p>
        `;
      }
    }

    return mediaCard;
  }

  function displayLightbox() {
    const lightbox = document.querySelector(".lightbox");
    const mediaContent = document.querySelector(".media-content");

    mediaContent.innerHTML = `
        ${mediaElement}
        <div class="lightbox-infos">
          <h3>${title}</h3>
        </div>
    `;

    lightbox.style.display = "block";

    lightbox.addEventListener("click", () => {
      lightbox.style.display = "none";
    });
  }

  return { getMediaCard, displayLightbox };
}

function getLikeContainer(totalLikes, price) {
  const likeContainer = document.querySelector(".total-likes");

  likeContainer.innerHTML = `
      <span>${totalLikes} <i class="fa-solid fa-heart"></i></span>
      <span>${price}€ / jour</span>
  `;
}

function photographerCard(photographer) {
  return photographerTemplate(photographer).getUserCardDOM();
}

function photographerHero(photographer) {
  console.log(photographer);
  return photographerTemplate(photographer).getUserHeroBanner();
}

function mediaCard(media, firstName) {
  return mediaTemplate(media, firstName).getMediaCard();
}

function likeContainer(likes, price) {
  return getLikeContainer(likes, price);
}

function displayLightbox() {
  return mediaTemplate().displayLightbox();
}

export {
  photographerCard,
  photographerHero,
  mediaCard,
  displayLightbox,
  likeContainer,
};
