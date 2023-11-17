function displayModal() {
  const modal = document.querySelector("#contact_modal");
  modal.style.display = "block";
}

function photographerTemplate(data) {
  console.log("data", data);
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
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
  const { title, image, video, likes, id } = media;
  let likeArray = JSON.parse(localStorage.getItem("like") || "[]");
  let likeAdded = likeArray.find((like) => like.id === id)?.likeAdded;

  let mediaLink = `assets/photographers/${firstName}/${image ?? video}`;

  function getMediaCard() {
    const mediaCard = document.createElement("article");

    const addLike = () => {
      likeAdded = likes + 1;
      if (likeArray.length === 0 || likeArray.find((like) => like.id !== id)) {
        const addLikeToArray = JSON.parse(localStorage.getItem("like")) ?? [];

        const addLikeObject = {
          id: id,
          likeAdded: likes + 1,
        };

        localStorage.setItem(
          "like",
          JSON.stringify([...addLikeToArray, addLikeObject])
        );
      }

      mediaCard.querySelector(
        ".likes-number"
      ).innerHTML = `${likeAdded} <i class="fa-solid fa-heart"></i>`;
    };

    mediaCard.innerHTML = `
      <div class="media-picture">
        ${
          image
            ? `<img src="${mediaLink}" alt="${title}">`
            : `<video src="${mediaLink}" autoplay loop muted></video>`
        }
      </div>
      <div class="media-infos" arial-label="media infos">
        <h3>${title}</h3>
        <div class="likes">
          <p class="likes-number">${likeAdded ?? likes}  
            <i class="${likeAdded ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
          </p>
        </div>
      </div>`;

    const mediaElement = mediaCard.querySelector(".media-picture");
    const likeContainer = mediaCard.querySelector(".likes");

    mediaElement.addEventListener("click", displayLightbox);
    likeContainer.addEventListener("click", addLike);

    return mediaCard;
  }

  function displayLightbox() {
    const lightbox = document.querySelector(".lightbox");
    const mediaContent = document.querySelector(".media-content");

    mediaContent.innerHTML = `
      ${
          image
            ? `<img src="${mediaLink}" alt="${title}">`
            : `<video src="${mediaLink}" autoplay loop muted></video>`
        }
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

function photographerCard(photographer) {
  return photographerTemplate(photographer).getUserCardDOM();
}

function photographerHero(photographer) {
  return photographerTemplate(photographer).getUserHeroBanner();
}

function mediaCard(media, firstName) {
  return mediaTemplate(media, firstName).getMediaCard();
}

function displayLightbox() {
  return mediaTemplate().displayLightbox();
}

export { photographerCard, photographerHero, mediaCard, displayLightbox };