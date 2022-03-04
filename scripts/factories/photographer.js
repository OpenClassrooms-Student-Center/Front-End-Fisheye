// fonction pour lancer la creation des cards en html
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

// fonction pour constuire des elements html
function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  function getUserCardDOM() {
    const htmlArticle = `
          <a class="photographer-link" href="./photographer.html?id=${id}">
              <img src="assets/photographers/${portrait}">
              <h2>${name}</h2>
              </a>
          <div class="photographer-details">
                      <h3>${city}, ${country}</h3>
                      <h4>${tagline}</h4>
                      <h5>${price}€ /jour</h5>
          </div>`;
    const article = document.createElement("article");
    article.innerHTML = htmlArticle;

    return article;
  }

  return { getUserCardDOM, name, portrait, city, country, tagline, price, id };
}

//fonction pour construire la page photographer.html

export { displayData };
