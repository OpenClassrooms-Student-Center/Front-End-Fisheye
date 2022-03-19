//creation des cartes protographes en fonction des donnees .json
export function createPhotographer(photographer) {
  const ARTICLE = document.createElement("article");
  ARTICLE.className = "photographers-grid";
  let templatePhotographer = `
      <a href="#">
          <img src="../PhotographersID/${photographer.portrait}" alt="${photographer.alt}">
          <h2 class="name">${photographer.name}</h2>
      </a>
      <p class="location">${photographer.city}, ${photographer.country}</p>
      <p class="tagline">${photographer.tagline}</p>
      <p class="price">${photographer.price}€/jour</p>
      `;
  ARTICLE.innerHTML = templatePhotographer;
  return ARTICLE;
}
