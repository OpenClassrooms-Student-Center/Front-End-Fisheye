//Mettre le code JavaScript lié à la page photographer.html

//recuperer les données du json
async function getPhotographers() {
  // Penser à remplacer par les données récupérées dans le json
  let response = await fetch("./data/photographers.json");
  let data = await response.json();
  console.log(data);
  return data;
}

async function displayData() {
  const photographersHeader = document.querySelector(".photograph-header");
  const contactBtn = document.querySelector(".contact_button");
  const photographerModel = photographerFactoryBis();
  const userCardDOM = photographerModel.getUserHeader();

  //   photographersHeader.appendChild(userCardDOM);
  photographersHeader.insertBefore(userCardDOM, contactBtn);
}

function createImage() {
  const userImg = `
    <img src="../assets/photographers/${photogapherPortrait}"></img>`;

  image = document.createElement("div");
  image.innerHTML = userImg;
  const photographersHeader = document.querySelector(".photograph-header");
  photographersHeader.appendChild(image);
}
//recuperer l'id du photographe
let url = new URL(window.location.href);
let photographerId = url.searchParams.get("id");
let photographerName = url.searchParams.get("name");
let photographerCity = url.searchParams.get("city");
let photographerCountry = url.searchParams.get("country");
let photographerPrice = url.searchParams.get("price");
let photographerTagline = url.searchParams.get("tagline");
let photogapherPortrait = url.searchParams.get("portrait");

function photographerFactoryBis(data) {
  // construit le html du header
  function getUserHeader() {
    const htmlHeader = `
                <h2>${photographerName}</h2>       
            <div class="photographer-details">
                        <h3>${photographerCity}, ${photographerCountry}</h3>
                        <h5>${photographerTagline}</h5>
                       
            </div>`;
    const article = document.createElement("article");
    article.innerHTML = htmlHeader;

    return article;
  }

  return { getUserHeader };
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
createImage();
