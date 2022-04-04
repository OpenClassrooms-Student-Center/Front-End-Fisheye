class imgFactory {
  creatingHTML(photographer) {
      let eltImage = document.createElement('img');
      eltImage.setAttribute('src', photographer.image);
      eltImage.setAttribute('alt', photographer.alt);
      eltImage.setAttribute('role', 'button');
      return eltImage;
  }
}
//creation des cartes protographes en fonction des donnees .json
class photographerFactory{
  createPhotographer(photographer) {
  let photographerFactory = new imgFactory().creatingHTML(photographer);
  console.log(photographerFactory)
    const ARTICLE = document.createElement("article");
    ARTICLE.className = "photographers-grid";
  let templatePhotographer = `
      <a href="./photographer.html?id=${photographer.id}">
      ${photographerFactory.outerHTML}
      <h2 class="name">${photographer.name}</h2>
      </a>
      <p class="location">${photographer.city}, ${photographer.country}</p>
      <p class="tagline">${photographer.tagline}</p>
      <p class="price">${photographer.price}€/jour</p>
      `;
      ARTICLE.innerHTML = templatePhotographer;
      return ARTICLE;
      
    }
  }
// Récupération du tableau des photographes
export function displayPhotographers(data) {
  const photographerInfo  = data.dataPhotographers;
  const photographersSection = document.querySelector(".photographers_section");
  // remplissage de la section "photographers_section" avec tous les photographes
  photographerInfo.forEach((photographer) => {
    photographersSection.appendChild(new photographerFactory().createPhotographer(photographer));
  });
}
