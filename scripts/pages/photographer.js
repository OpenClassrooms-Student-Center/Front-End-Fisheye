// Récupérer des données des photographes avec (fetch)
// Récupérer id de l'url et tri du tableau pour obtenir les photographers (URLSearchParams)
// Récupérer l'objet photographer par extraction du tableau photographers.json (.find)

fetch("./photographers.json")
  .then((response) => {
    return response.json();
  })
  .then((result) => {

    let searchParams = new URLSearchParams(window.location.search);

    const photographerId = searchParams.get("id");

    const photographers = result.photographers;

    const medias = result.media;
 
    const photographerInfo = photographers.find((photographer) => {
      if (photographer.id === Number(photographerId)) {
        return photographer;
      }
    });

    const photographerMedias = medias.filter((media) => {
      if (media.photographerId === Number(photographerId)) {
        return media;
      }
    });

    photographerToDisplay(photographerInfo);
  });

// Afficher header photographer

function photographerToDisplay(photographerInfo) {
  const { name, id, city, country, tagline, price, portrait } =
    photographerInfo;

  const picture = `../../assets/Photographers/${portrait}`;

  const photographerName = document.getElementById("header_photographer_name");
  photographerName.insertAdjacentHTML("afterbegin", name);

  const photographerPicture = document.getElementById("photographer_picture");
  photographerPicture.setAttribute("src", picture);
  photographerPicture.setAttribute("alt", name);

  const photographerCity = document.getElementById("photographer_city");
  photographerCity.insertAdjacentHTML("afterbegin", city);

  const photographerCountry = document.getElementById("photographer_city");
  photographerCountry.insertAdjacentHTML("beforeend", country);

  const photographerTagline = document.getElementById("photographer_tagline");
  photographerTagline.insertAdjacentHTML("afterbegin", tagline);

  const photograherPrice = document.getElementById("photographer_price");
  photograherPrice.insertAdjacentHTML("beforebegin", price);

  // modal Photographer Name
  const ModalPhotographerName = document.getElementById(
    "modal_photographer_name"
  );
  ModalPhotographerName.insertAdjacentHTML("afterbegin", name);

  return true;
}

// Tri de sélection

const popularityOption = document.getElementById("popularity_option");
const dateOption = document.getElementById("date_option");
const titleOption = document.getElementById("title_option");
popularityOption.addEventListener("click", openSelection);
function openSelection() {
  dateOption.classList.remove("hidden_option");
  titleOption.classList.remove("hidden_option");
  popularityOption.style.borderBottom = "1px solid white";
  dateOption.style.borderBottom = "1px solid white";
}

const arrow = document.getElementById(".arrow");
arrow.addEventListener("click", closeSelection);
function closeSelection() {
  dateOption.classList.add("hidden_option");
  titleOption.classList.add("hidden_option");
  popularityOption.style.borderBottom = "none";
  dateOption.style.borderBottom = "none";
}

document.addEventListener("click", closeSelection);

// Afficher la galerie

function mediasFactory(media) {
  if (media.image !== undefined) {
    return createImage(media);
  }

  return createVideo(media);
}

function createImage(data) {
  return `<img src="${data.image}" alt="${data.title}" />`;
}

function createVideo(data) {
  return `
     
        <video alt="${data.title}">
            <source src=${data.video}" type="video/mp4">
        </video>
        
    `;
}

let html = "";
photographerMedias.forEach((media) => {
   
    html += `
    <a href="#" alt="Lilac breasted roller, closeup view">
    
          ${mediasFactory(media)}

          <div class="media_description">
            <span class="media_title">${media.title}</span>
              <div class="media_like_div">
              <span class="media_like_number">${media.likes}</span>
              <i class="fa-regular fa-heart media_like"></i>
            </div>
          </div>
        </a>
    
    `;
});
console.log(html)

