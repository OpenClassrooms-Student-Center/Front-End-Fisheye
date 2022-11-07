init();
async function init() {
  // créer une const qui récupère l'id grâce à l'url
  // console.log("window Location:", window.location);
  const photographersValue = window.location.search;
  // console.log(" photographers values:", photographersValue );
  const urlParams = new URLSearchParams(photographersValue);
  const param1Id = urlParams.get("id");
  // console.log("voici l'id de ce photographe :", param1Id);
  const photographer = await getPhotographer(param1Id);
  console.log(photographer);
  headerPhotographer(photographer);
}
// chargé de recuperer les données
async function getPhotographer(id) {
  return (
    fetch("./data/photographers.json")
      // Ici, then() transforme le résultat en objet js array
      .then((response) => response.json())
      // Ici, then() avec le find va récupérer un seul photographe avec l'id correspondant
      .then((response) => {
        // console.log(response);
        let photographer = response.photographers.find((photographerData) => {
          // le return id sera correct s'il correspond à l'id qu'on l'on cherche dans le json
          return id == photographerData.id;
        });
        return photographer;
      })
  );
}
// la fonction photographerFactory a pour paramêtre data (le photographers.json)
function photographerFactory(data) {
  // la constante se compose d'un objet doté  de name et portrait et dont la valeur renvoi à data
  const { city, country, name, tagline, portrait, price, id } = data;
  console.log(price);
  /* la constante picture à pour valeur le chemin assets/photographers
     et fera une interpolation de chaine
     dans ce chemin afin d'insérer un portrait dedans.*/
  const picture = `assets/photographersMini/${portrait}`;
  // la fonction getUserCardDOM permet :
  function getUserCardDOM() {
    const article = document.createElement("article");
    // fonction permettant au moment ou on clique dessus, de pouvoir accéder à la page du photographer.html
    article.onclick = function () {
      location.href = `photographer.html?id=${id}`;
    };
    // create the image element
    const img = document.createElement("img");
    article.appendChild(img);
    img.style.borderRadius = "100%";
    img.style.objectFit = "cover";
    article.style.cursor = "pointer";
    // le setAttribute montre le changement de la valeur src en picture
    // => le src renverra grâce à son lien à la picture
    img.setAttribute("src", picture);
    img.alt = name;
    const h2 = document.createElement("h2");
    h2.textContent = name;
    article.appendChild(h2);
    const divCityAndCountry = document.createElement("div");
    divCityAndCountry.textContent = city + ", " + country;
    article.appendChild(divCityAndCountry);
    divCityAndCountry.style.color = "#901c1c";
    const divTagLine = document.createElement("div");
    divTagLine.textContent = tagline;
    article.appendChild(divTagLine);
    divTagLine.style.color = "black";
    divTagLine.style.fontSize = "13px";
    const divPrice = document.createElement("div");
    divPrice.textContent = price + "€/jour";
    article.appendChild(divPrice);
    divPrice.style.color = "#4D4D4D";
    divPrice.style.fontSize = "13px";
    // retourne à l'article
    return article;
  }
  return { name, picture, getUserCardDOM };
}
// la fonction Header photographer dont le paramêtre est photographerData crée les éléments suivants dans le photgrapher.html
function headerPhotographer(photographerData) {
  const headerSection = document.querySelector(".photograph-header");
  const { city, country, name, tagline, portrait, price, id } =
    photographerData;
  const titre = document.createElement("h1");
  titre.innerText = photographerData.name;
  const cityAndCountry = document.createElement("div");
  cityAndCountry.innerText =
    photographerData.city + ", " + photographerData.country;
  const descriptionPhotographer = document.createElement("div");
  descriptionPhotographer.innerText = photographerData.tagline;
  const profilPicturePhotographer = document.createElement("img");
  profilPicturePhotographer.className += "imgPhotoPage";
  const picture2 = `assets/photographersMini/${portrait}`;
  headerSection.appendChild(profilPicturePhotographer);
  profilPicturePhotographer.setAttribute("src", picture2);
  console.log(profilPicturePhotographer.src);
  // je veux créer un article ou sera inclu dedans
  const contentHeader = document.createElement("div");
  contentHeader.className += "contentHeader";
  headerSection.appendChild(contentHeader);
  contentHeader.appendChild(titre);
  contentHeader.appendChild(cityAndCountry);
  contentHeader.appendChild(descriptionPhotographer);
}
