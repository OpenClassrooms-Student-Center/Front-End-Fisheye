// Requete pour obtenir tous les objets media du fichier photographers.json
async function getMedia() {
  let url = '../data/photographers.json';
  try {
    let res = await fetch(url);
    let json = await res.json();
    return json.media;
  } catch (error) {
    console.log(error);
  }
}

const actualId = 82;
let likes = 0;

// Fonction pour injecter les cartes médias.
function displayMedia(photographers) {
  const mediaSection = document.getElementById('media-content');
  photographers.forEach(photographer => {
    const photographerId = photographer.photographerId;
    if (photographerId === actualId) {
      const photographerMedia = mediaFactory(photographer);
      const mediaCard = photographerMedia.createMediaCards();
      mediaSection.appendChild(mediaCard);
      console.log(likes);
      likes += photographer.likes;
    }
  });
  // ------------------------
  // Ne renvoie pas le nombre total de likes...
  // ------------------------
  return likes;
}

console.log(likes);

let heartTarget = document.querySelectorAll('counter');
console.log(heartTarget);

// L'objectif est de pouvoir récupérer l'ID du photographe avec un event listener en cliquant sur les liens (images des photographes) sur la page d'accueil, puis de passer l'ID dans la fonction pour récupérer les médias correspondant à l'ID.
async function getMediaData(id) {
  const media = await getMedia();
  displayMedia(media);
  // media.forEach((el) => {
  // if (el.photographerId === id) {
  //   console.log(el.image);
  // }
  // });
}

getMediaData(actualId);


// Fonction pour additionner les likes des photographes

const photographHeader = document.querySelector('.photograph-header');
const photographerInfo = document.querySelector('.photographer-info');
const photographerPicture = document.querySelector('.photographer-picture');
const fixedCounter = document.querySelector('.fixed-counter');
const photographerTemplate = {
  name: 'Mimi Keel',
  id: 243,
  city: 'London',
  country: 'UK',
  tagline: 'Voir le beau dans le quotidien',
  price: 400,
  portrait: 'MimiKeel.jpg',
};

// --------------------------------
// Fonctionne mais pourquoi name est barré ?
const { name, id, city, country, tagline, price, portrait } =
  photographerTemplate;
// console.log(name);

function getPhotographerBanner() {
  const picture = `assets/photos/profile/${portrait}`;
  const Pname = document.createElement('p');
  Pname.innerText = `${name}`;
  Pname.classList.add('photographer-name');
  const Plocation = document.createElement('p');
  Plocation.innerText = `${country}, ${city}`;
  Plocation.classList.add('photographer-location');
  const Ptagline = document.createElement('p');
  Ptagline.innerText = `${tagline}`;
  Ptagline.classList.add('photographer-tagline');
  const img = document.createElement('img');
  img.setAttribute('src', picture);
  img.classList.add('photographer-img');
  photographerInfo.appendChild(Pname);
  photographerInfo.appendChild(Plocation);
  photographerInfo.appendChild(Ptagline);
  photographHeader.appendChild(img);
}

const chevronDown = document.querySelector('.fa-chevron-down');
const filterList = document.querySelectorAll('.tri ul li.hidden');

// Menu déroulant de filtres
chevronDown.addEventListener('click', () => {
  filterList.forEach((li) => {
    if (li.className.includes('hidden')) {
      li.classList.remove('hidden');
    } else {
      li.classList.add('hidden');
    }
  });
  chevronDown.classList.toggle('fa-chevron-up');
  chevronDown.classList.toggle('fa-chevron-down');
});

function getFixedCounter() {
  const hourlyRate = document.createElement('p');
  hourlyRate.innerHTML = `<p>${likes}<i class="fas fa-heart"></i></p>${price}€ / jour`;
  fixedCounter.appendChild(hourlyRate);
}


getPhotographerBanner();
getFixedCounter();


class Photo {
  constructor(data) {
    this.id = data.id;
    this.photographerId = data.photographerId;
    this.title = data.title;
    this.image = data.image;
    this.likes = data.likes;
  }

  // ----------------------------------
  // Je ne comprends pas getter et setter
  // get id() {
  //   return this._id;
  // }
  // get photographerId() {
  //   return this._photographerId;
  // }
  // get title() {
  //   return this._title;
  // }
  // get image() {
  //   return this._image;
  // }
  // get likes() {
  //   return this._likes;
  // }
}