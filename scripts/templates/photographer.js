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
      <a href="photographer.html?id=${id}" aria-label="See portfolio of ${name} from ${city} in ${country}">
        <img src="${picture}" alt="portrait of ${name}">
        <h2>${name}</h2>
      </a>
      <h3 class="location">${city}, ${country}</h3>
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
        <h2 class="photographerNameHero">${name}</h2>
        <h3 class="location">${city}, ${country}</h3>
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
