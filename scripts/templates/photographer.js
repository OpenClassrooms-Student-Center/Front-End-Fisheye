function photographerTemplate(data) {
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
  let likeArray = [];
  let likeAdded;

  if (localStorage.getItem("like")) {
    likeArray = JSON.parse(localStorage.getItem("like"));

    likeAdded = likeArray.find((like) => like.id === id)?.likeAdded;
  }

  let mediaLink = `assets/photographers/${firstName}/${image ?? video}`;
  function getMediaCard() {
    const mediaCard = document.createElement("article");

    const addLike = () => {
      likeAdded = likes + 1;
      if (likeArray.length === 0 || likeArray.find((like) => like.id !== id)) {
        const addLikeToArray = localStorage.getItem("like")
          ? JSON.parse(localStorage.getItem("like"))
          : [];

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

    mediaCard.addEventListener("click", addLike);

    mediaCard.innerHTML = `
      <a href="photographer.html?id=${id}">
        ${
          image
            ? `<img src="${mediaLink}" alt="${title}">`
            : `<video src="${mediaLink}" autoplay loop muted></video>`
        }
      </a>
      <div class="media-infos" arial-label="media infos">
        <h3>${title}</h3>
        <div class="likes">
          <p class="likes-number">${likeAdded ?? likes}  
            ${
              likeAdded
                ? "<i class='fa-solid fa-heart'></i>"
                : "<i class='fa-regular fa-heart'></i>"
            }</p>
        </div>
      </div>
    `;
    return mediaCard;
  }
  return { getMediaCard };
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
