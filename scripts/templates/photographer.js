function photographerTemplate(data) {
  console.log (data);
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
  let imageLink;
  let videoLink;
  const { title, image, video, likes, date, id } = media;

  let pictureFormat = true

  if (image) {
  imageLink = `assets/photographers/${firstName}/${image}`;
  } else {
  videoLink  = `assets/photographers/${firstName}/${video}`;
  }


  function getMediaCard () {
    const mediaCard = document.createElement("article");
    mediaCard.innerHTML = `
      <a href="photographer.html?id=${id}">
        ${image ? `<img src="${imageLink}" alt="${title}">`:`<video src="${videoLink}" autoplay loop muted controls></video>`}
      </a>
      <div class="media-infos">
        <h2>${title}</h2>
        <div class="likes">
          <p>${likes} <i class="fas fa-heart"></i></p>
          <p>${date}</p>
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