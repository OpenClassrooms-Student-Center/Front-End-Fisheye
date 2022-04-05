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

/////////////////  2ème partie : data.media

async function getMedias() {
  let medias = await fetch("data/photographers.json")
    .then((response) => response.json())
    .then((data) => {
      return data.media;
    });
  return medias;
}

/////////////////// Création du Header qui contient les informations sur le photographe ///////////////////

function photographerHeader(photographer) {
  const photographerProfile = document.createElement("article");
  const profilePicture = document.createElement("img");
  const photographerName = document.createElement("h2");
  const localisation = document.createElement("p");
  const tagline = document.createElement("p");
  const price = document.getElementById("price");

  price.textContent = photographer.price + "€ / jour";
  profilePicture.src =
    "assets/Photographers ID Photos/" + photographer.portrait;
  profilePicture.alt = photographer.name;
  photographerName.id = "artist-name";
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

/////////////////// Création des vignettes de la galerie. Cette factory method ne crée qu'une vignette à la fois///////////////////

class Media {
  constructor(media, photographer) {
    this._media = media;
    this._mediaContent = document.querySelector("#gallery");
    this._photographer = photographer;


    if (this._media.image) {
      this.image();
    } else if (this._media.video) {
      this.video();
    }
  }

  init(media) {
    this._mediaContent.insertAdjacentHTML("beforeend",
      `<article>
      ${media}
      <div class="cardtext">
        <h2>${this._media.title}</h2>
        <div class = "likes">
        <span class = "likes-number">${this._media.likes}</span>
        <button
        class="heart-button unliked"
        style='background-image: url("assets/icons/dark_red_heart.svg");'
      ></button>
        </div>
      </div>
    </article>`)
  }

  image() {
    this._image = `<img class="thumbnail" src= "assets/photographers/${this._photographer.name}/${this._media.image}" alt="${this._media.title}">`;
    this.init(this._image);
  }

  video() {
    this._video = `<video class="thumbnail" src= "assets/photographers/${this._photographer.name}/${this._media.video}" alt="${this._media.title}" controls = "true"></video>`;
    this.init(this._video);
  }
}

//////////fonction qui utilise la classe définie ci-dessus à l'aide de new et qui crée toutes les vignettes dans la galerie////////

const displayMedia = (mediaArray, photographer) => {
  mediaArray.forEach((media) => {
    new Media(media, photographer);
   });
};



///////////////////// TRI DES MEDIA (FONCTIONS APPELEES DANS LE MENU DEROULANT)///////////////////////////////////////////////////////////////

async function rebuildGallery() {
  const gallery = document.getElementById("gallery"); 
  gallery.innerHTML = ""; 
  
  let photographers = await getPhotographers();
  displayMedia(arrayGallery, photographers[index]);
  initTotalLikes(arrayGallery); 
  counterFunction();
  lightboxFunction();
}

async function sortLikes() {
  arrayGallery.sort(function (a, b) {
    return b.likes - a.likes;
  });
  await rebuildGallery();
}

async function sortDate() {
  arrayGallery.sort(function (a, b) {
    return Date.parse(a.date) - Date.parse(b.date); 
  });
  await rebuildGallery();
}

async function sortTitle() {
  arrayGallery.sort(function (a, b) {
    return a.title.toLowerCase() > b.title.toLowerCase();
  });

  await rebuildGallery();
}

///////////////////////////////////// LIGHT BOX ///////////////////////////////////////////////////////////////////////////////////////////////////////

function lightboxFunction() {
  let mediaList = document.querySelectorAll(".thumbnail"); 
  const lightboxBackground = document.querySelector("#lightbox-background");
  const lightboxClose = document.querySelector("#lightbox-close");
  const lightboxPrevious = document.querySelector("#lightbox-previous");
  const lightboxNext = document.querySelector("#lightbox-next");
  let mediaIndex = 0;

  mediaList.forEach((media) => {
    media.addEventListener("click", () => {
      lightboxBackground.querySelector("#imageFS").src = media.src;
      const choosenMedia = Array.from(mediaList).find(function (item) {
        return item.src == media.src;
      });
      mediaIndex = Array.from(mediaList).indexOf(choosenMedia);
      console.log("mediaIndex", mediaIndex);
      lightboxBackground.style.display = "block";
    });
  });

  //////déclaration des fonctions next et previous qui s'arrêtent au bout de la liste////////
  function Close() {
    lightboxBackground.style.display = "none";
  }


  function PreviousNextInit(){
    if (arrayGallery[mediaIndex].image) {
      lightboxBackground.querySelector("#imageFS").src =
          "assets/photographers/" + choosenphotographer.name + "/" + arrayGallery[mediaIndex].image;
      lightboxBackground.querySelector("#imageFS").alt = arrayGallery[mediaIndex].title;
      lightboxBackground.querySelector("#videoFS").src = "";
      lightboxBackground.querySelector("#videoFS").removeAttribute("controls");
      lightboxBackground.querySelector("#videoFS").alt = "";
      lightboxBackground.querySelector("#imageFS").display = "flex";
      
    } else {
      lightboxBackground.querySelector("#videoFS").src =
      "assets/photographers/" + choosenphotographer.name + "/" + arrayGallery[mediaIndex].video;
      lightboxBackground.querySelector("#videoFS").alt = arrayGallery[mediaIndex].title;
      console.log("arrayGallery[mediaIndex].title",arrayGallery[mediaIndex].title);
      console.log("lightboxBackground.querySelector(videoFS).alt",lightboxBackground.querySelector("#videoFS").alt);
      lightboxBackground.querySelector("#videoFS").controls = "true";
      lightboxBackground.querySelector("#imageFS").src = ""; 
      lightboxBackground.querySelector("#imageFS").alt = ""; 
      lightboxBackground.querySelector("#videoFS").display = "flex";
   
    }};


  function Next() {
    if (mediaIndex < mediaList.length - 1) {
      
      mediaIndex++;
      PreviousNextInit();
    } 
  };

  function Previous() {
    if (mediaIndex > 0) {
      mediaIndex--;
      PreviousNextInit();
    } 
  };

  /////////////////lancements des events dans la lightbox sur les trois actions souris et clavier////////////////////////////////////////////////

  lightboxClose.addEventListener("click", () => {
    Close();
  });
  document.addEventListener("keydown", (event) => {
    if (event.code == "Escape") {
      Close();
    }
  });

  lightboxNext.addEventListener("click", () => {
    Next();
  });
  document.addEventListener("keydown", (event) => {
    if (event.code == "ArrowRight") {
      Next();
    }
  });

  lightboxPrevious.addEventListener("click", () => {
    Previous();
  });
  document.addEventListener("keydown", (event) => {
    if (event.code == "ArrowLeft") {
      Previous();
    }
  });

  return;
}


//////////////////FONCTION PRINCIPALE INIT QUI LANCE LES TACHES A EFFECTUER pour fabriquer  LA PAGE DU PHOTOGRAPHE avec galerie & coeurs ////////////////////////////////////////////////////////////////////////////////////////////
let arrayGallery = []; 
let choosenphotographer = [];
let index = 0; 

async function init() {
  let photographers = await getPhotographers(); 
  const queryParams = window.location.search;
  const urlParams = new URLSearchParams(queryParams); 
  const photographerArtistId = urlParams.get("id");

 choosenphotographer = photographers.find(function (item) {
    return item.id == photographerArtistId;
  });

  arrayPhotographer = choosenphotographer;

  console.log("photographers", photographers);
  console.log("choosenphotographer", choosenphotographer);
  index = photographers.indexOf(choosenphotographer);

  const content = document.getElementById("photograph-header");
  content.appendChild(photographerHeader(photographers[index]));

  ///   ajout des medias ///
  let medias = await getMedias(); 
  console.log("voici les médias obtenus par fetch", medias);
  const choosenGallery = medias.filter(function (item) {
    //ici on parcourt les medias du json et on ne retient que ceux ayant le bon id
    return item.photographerId == photographerArtistId;
  });
  arrayGallery = choosenGallery;
  console.log(
    "résultat du filter avec l'ID du photographe choosen Gallery",
    choosenGallery
  );


  displayMedia(choosenGallery, photographers[index]);   // construction à l'aide du pattern factory method ////
  initTotalLikes(choosenGallery); //fonction située dans counter.js
  counterFunction(); //fonction située dans counter.js
  lightboxFunction();
}

///lancement !!!!///
init();
