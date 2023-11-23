function photographerTemplate({
  name,
  portrait,
  city,
  country,
  tagline,
  price,
  id,
}) {
  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    article.innerHTML = `
      <a href="photographer.html?id=${id}">
        <img src="${picture}" alt="${name}">
        <h2>${name}</h2>
      </a>
      <p class="location">${city}, ${country}</p>
      <p class="tagline">${tagline}</p>
      <p class="price">${price}€/jour</p>
    `;
    return article;
  }

  function getUserHeroBanner() {


    const photographInfoSection = document.querySelector(".photograph-infos");
    const photographPicture = document.querySelector(".photograph-picture");

    const userInfos = document.createElement("article");
    userInfos.innerHTML = `
        <h2>${name}</h2>
        <p class="location">${city}, ${country}</p>
        <p class="tagline">${tagline}</p>
    `;

    const userPicture = document.createElement("img");
    userPicture.src = picture;
    userPicture.alt = `Portrait de ${name}`;

  photographInfoSection.appendChild(userInfos);
  photographPicture.appendChild(userPicture);
  }

  return { getUserCardDOM, getUserHeroBanner };
}

function photographerCard(photographer) {
  return photographerTemplate(photographer).getUserCardDOM();
}

function photographerHero(photographer) {
  return photographerTemplate(photographer).getUserHeroBanner();
}

export { photographerCard, photographerHero };
