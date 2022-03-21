/////////////////// Fetch du fichier Json
////////////////// 1ère partie : data.photographers (section nommée photographers du fichier)

async function getPhotographers() {
  let photographers = await fetch("../data/photographers.json")
    .then((response) => response.json())
    .then((data) => {
      return data.photographers;
    });
  return photographers;
}

/////////////////  2ème partie : data.media (section nommée data du fichier)

async function getMedias() {
  let medias = await fetch("../data/photographers.json")
    .then((response) => response.json())
    .then((data) => {
      return data.media;
    });
  return medias;
}

async function init() {
  let photographers = await getPhotographers();
  //console.log ("affichage de photographers obtenu par fetch",photographers);
  //////////////////////////////////// lecture de paramètre du lien URL     /////////////                                    NEWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW////
  const queryParams = window.location.search;
  //console.log ("query params de window.location.search      ",queryParams);
  const urlParams = new URLSearchParams(queryParams);
  //console.log ("new URLSearchParams     ",urlParams);
  const photographerArtistId = urlParams.get("id");
  //console.log ("id lue sur l'URL avec get      ",photographerArtistId);

  const choosenphotographer = photographers.find(function (item) {
    return item.id == photographerArtistId;
  });
  //console.log ("choosenphotographer",choosenphotographer);
  const index = photographers.indexOf(choosenphotographer);
  //console.log("index", index);

  const content = document.getElementById("photograph-header");
  content.appendChild(photographerHeader(photographers[index]));

  ///   ajout des medias ///
  let medias = await getMedias();
  console.log("voici les médias obtenus par fetch", medias);
  const choosenGallery = medias.filter(function (item) {
    return item.photographerId == photographerArtistId;
  });
  console.log("résultat du filter avec l'ID du photographe", choosenGallery);
  const gallery = document.getElementById("gallery");
  choosenGallery.forEach((item) =>
    gallery.appendChild(photographerGallery(photographers[index], item))
  );
  counterFunction();
}

init();

/////////////////// create photographer ///////////////////

function photographerHeader(photographer) {
  const photographerProfile = document.createElement("article");
  const contactButton = document.getElementById("contact");
  const profilePicture = document.createElement("img");
  const photographerName = document.createElement("h2");
  const localisation = document.createElement("p");
  const tagline = document.createElement("p");
  const price = document.getElementById("price");
    
  price.textContent = photographer.price + "€ / jour";
  profilePicture.src =
    "../assets/Photographers ID Photos/" + photographer.portrait;
  profilePicture.alt = photographer.name;
  photographerName.textContent = photographer.name;
  localisation.textContent = photographer.city + ", " + photographer.country;
  localisation.id = "localisation";
  tagline.id = "tagline";
  tagline.textContent = photographer.tagline;
  contactButton.textContent = "Contactez-moi";

  photographerProfile.appendChild(contactButton);
  photographerProfile.appendChild(profilePicture);
  photographerProfile.appendChild(photographerName);
  photographerProfile.appendChild(localisation);
  photographerProfile.appendChild(tagline);

  return photographerProfile;
}

/////////////////// create photographer gallery ///////////////////
function photographerGallery(photographer, photo) {
  const photoCard = document.createElement("article");
  const photoCardImg = document.createElement("img");
  const photoCardVideo = document.createElement("video");
  const photoCardText = document.createElement("div");
  const photoCardTitle = document.createElement("h2");
  const photoCardLikes = document.createElement("div");
  const photoCardLikesNumber = document.createElement("span");
  const photoCardLikesButton = document.createElement("button");
  const numberTotalLikes = document.getElementById("number-total-likes");

                 //création du total likes initial en même temps que la gallery//
  let totallikes = Number(numberTotalLikes.innerText);  // innertext est un string que je transforme en number 
  totallikes += photo.likes;     // j'additionne des nombres (de la liste avec foreach de l'init) sinon les caractères sont mis côte à côte 
  numberTotalLikes.innerText = totallikes; // après calcul je mets le résultat dans le popup
   
  if (photo.image) {
     photoCardImg.src =
      "../assets/photographers/" + photographer.name + "/" + photo.image;
      photoCard.appendChild(photoCardImg);
  } else {photoCardVideo.src =
    "../assets/photographers/" + photographer.name + "/" + photo.video;
    photoCardVideo.controls ="true";   //pour avoir les controle de lecture et différencier d'une image
    photoCard.appendChild(photoCardVideo);
  }
  photoCardText.className = "cardtext";
  photoCardTitle.textContent = photo.title;
  photoCardLikes.className = "likes";
  photoCardLikesNumber.textContent = photo.likes;
  photoCardLikesNumber.className = "likes-number";
  photoCardLikesButton.className = "heart-button unliked"; //heart pour le css et unliked pour le compteur
  photoCardLikesButton.style.backgroundImage = "url(../assets/icons/dark_red_heart.svg)";
  

  
  photoCard.appendChild(photoCardText);
  photoCardText.appendChild(photoCardTitle);
  photoCardText.appendChild(photoCardLikes);
  photoCardLikes.appendChild(photoCardLikesNumber);
  photoCardLikes.appendChild(photoCardLikesButton);
 
  return photoCard;
}
