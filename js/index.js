/////////////////// Fetch du fichier Json
////////////////// 1ère partie : data.photographers

async function getPhotographers() {
  let photographers = await fetch("data/photographers.json")
    .then((response) => response.json())
    .then((data) => {
      return data.photographers;
    });
  return photographers;
}

/////////////////// creation de la fonction qui permet la fabrication des cartes présentant chaque photographe  ///////////////////

function photographerCardFactory(photographer, photographers) {
  const photographerProfile = document.createElement("article");
  const urlPhotographer = document.createElement("a");
  const profilePicture = document.createElement("img");
  const photographerName = document.createElement("h2");
  const localisation = document.createElement("p");
  const tagline = document.createElement("p");
  const price = document.createElement("p");

  photographerProfile.id = "photographer-" + photographer.id ;
  urlPhotographer.href = "photographer.html?id=" + photographer.id;
  profilePicture.src =
    "assets/Photographers ID Photos/" + photographer.portrait;
  profilePicture.alt = photographer.name;
  photographerName.textContent = photographer.name;
  localisation.id = "localisation";
  localisation.textContent = photographer.city + ", " + photographer.country;
  tagline.id = "tagline";
  tagline.textContent = photographer.tagline;
  price.id = "price";
  price.textContent = photographer.price + "€/jour";

  photographerProfile.appendChild(urlPhotographer);
  photographerProfile.appendChild(localisation);
  photographerProfile.appendChild(tagline);
  photographerProfile.appendChild(price);
  urlPhotographer.appendChild(profilePicture);
  urlPhotographer.appendChild(photographerName);

  return photographerProfile;
}

/////////////////  Fonction principale d'initialisation qui s'appuie sur les autres fonctions

async function init() {
  let photographers = await getPhotographers();
  const content = document.getElementById("photographer_section");
  photographers.forEach((photographer) =>
    content.appendChild(photographerCardFactory(photographer, photographers))
  );
}

init();
