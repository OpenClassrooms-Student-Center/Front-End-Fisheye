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
    mediaToDisplay(photographerMedias);
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

const popularityOption = document.querySelector("#popularity_option");
popularityOption.addEventListener("click", openSelection);
function openSelection() {
  const dateOption = document.querySelector("#date_option");
  const titleOption = document.querySelector("#title_option");
  dateOption.style.display = "block";
  titleOption.style.display = "block";
  popularityOption.style.borderBottom = "1px solid white";
  dateOption.style.borderBottom = "1px solid white";
}

const optionSelection = document.querySelector(".div_select");
optionSelection.addEventListener("click", closeSelection);
function closeSelection() {
  dateOption.style.display = "none";
  titleOption.style.display = "none";
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

let mediaHTML = "";
    medias.forEach((media) => {
      mediasHTML += `${mediasFactory(media)}`;
    });

function mediaToDisplay(photographerMedias){
     const { title, image, video, likes, date, price} =
       photographerMedias;

        const link = document.createElement("a");
    
        const divDescription = document.createElement("div");
        divDescription.setAttribute("class", "media_description");

        const spanTitle = document.createElement("span");
        spanTitle.setAttribute("class", "media_title");
        spanTitle.textContent = `${title}`;
        divDescription.appendChild(spanTitle);

        const divMediaLike = document.createElement("div");
        divMediaLike.setAttribute("class", "media_like_div");
        divDescription.appendChild(divMediaLike);
        const spanMediaLike = document.createElement("span");
        spanMediaLike.setAttribute("class", "media_like_number");
        spanMediaLike.textContent = `${likes}`;
        divDescription.appendChild(spanMediaLike);

        const iLike = document.createElement("i");
        iLike.setAttribute("class", "fa-regular");
        iLike.setAttribute("class", "fa-heart");
        iLike.setAttribute("class", "media_like");
        divDescription.appendChild(iLike);

}
