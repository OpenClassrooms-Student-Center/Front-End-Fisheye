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


/////////////////// create photographer, pour préparer l'article du photographe header ///////////////////

function photographerHeader(photographer) {
  const photographerProfile = document.createElement("article");
  const profilePicture = document.createElement("img");
  const photographerName = document.createElement("h2");
  const localisation = document.createElement("p");
  const tagline = document.createElement("p");
  const price = document.getElementById("price");
    
  price.textContent = photographer.price + "€ / jour";
  profilePicture.src =
    "../assets/Photographers ID Photos/" + photographer.portrait;
  profilePicture.alt = photographer.name;
  photographerName.id = "artist-name"
  photographerName.textContent = photographer.name;
  localisation.textContent = photographer.city + ", " + photographer.country;
  localisation.id = "localisation";
  tagline.id = "tagline";
  tagline.textContent = photographer.tagline;
  

  
  photographerProfile.appendChild(profilePicture);
  photographerProfile.appendChild(photographerName);
  photographerProfile.appendChild(localisation);
  photographerProfile.appendChild(tagline);

  return photographerProfile;
}

/////////////////// create photographer gallery ///////////////////
function photographerGallery(photographer, media) {
  const photoCard = document.createElement("article");
  const photoCardImg = document.createElement("img");
  const photoCardVideo = document.createElement("video");
  const photoCardText = document.createElement("div");
  const photoCardTitle = document.createElement("h2");
  const photoCardLikes = document.createElement("div");
  const photoCardLikesNumber = document.createElement("span");
  const photoCardLikesButton = document.createElement("button");
     
  if (media.image) {
     photoCardImg.src =
      "../assets/photographers/" + photographer.name + "/" + media.image;
      photoCard.appendChild(photoCardImg);
  } else {photoCardVideo.src =
    "../assets/photographers/" + photographer.name + "/" + media.video;
    photoCardVideo.controls ="true";   //pour avoir les controle de lecture et différencier d'une image
    photoCard.appendChild(photoCardVideo);
  }
  photoCardText.className = "cardtext";
  photoCardTitle.textContent = media.title;
  photoCardLikes.className = "likes";
  photoCardLikesNumber.textContent = media.likes;
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





//////////////////FONCTION PRINCIPALE INIT QUI LANCE LE "SCRIPT" DES TACHES A EFFECTUER SUR LA PAGE DU PHOTOGRAPHE////////////////////////////////////////////////////////////////////////////////////////////

async function init() {
  let photographers = await getPhotographers();
  
  const queryParams = window.location.search;///// lecture de paramètre du lien URL ///console.log ("query params de window.location.search      ",queryParams);
  const urlParams = new URLSearchParams(queryParams); //on prépare la recherche;
  const photographerArtistId = urlParams.get("id");//on recherche le paramètre id qui donne le nombre //console.log ("id lue sur l'URL avec get      ",photographerArtistId);
  
  // maintenant on recherche l'artiste qui a l'id que l'on vient de trouver dans l'url sotcké dans photographerArtistId //
  const choosenphotographer = photographers.find(function (item) {
    return item.id == photographerArtistId;
  });
  //Et on détermine l'index de cet artiste depuis le fichier json //console.log ("choosenphotographer",choosenphotographer);
  const index = photographers.indexOf(choosenphotographer);//on pourra maintenant appeler facilement l'artiste par sa position dans le fichier json//console.log("index", index);
  
  const content = document.getElementById("photograph-header");//on prépare l'ajout d'un article dans le photograph-header
  content.appendChild(photographerHeader(photographers[index]));//on crée l'article du bon photographe celui dont on connaît l'index dans la liste json

  ///   ajout des medias ///
  let medias = await getMedias(); /// console.log("voici les médias obtenus par fetch", medias);
  const choosenGallery = medias.filter(function (item) { //ici on parcourt les medias du json et on ne retient que ceux ayant le bon id
    return item.photographerId == photographerArtistId;
  }); ///console.log("résultat du filter avec l'ID du photographe", choosenGallery);
  const gallery = document.getElementById("gallery"); /// on sélectionne l'endroit du DOM où on va ajouter les vignettes
  choosenGallery.forEach((item) =>
    gallery.appendChild(photographerGallery(photographers[index], item)) //arguments photographer[index] pour choisir le bon photographe dans l'array et item qui correspond à la variable qui change dans la boucle each
  );
  initTotalLikes(choosenGallery); //fonction située dans counter.js
  counterFunction();//fonction située dans counter.js
}



///lancement !!!!///
init();

