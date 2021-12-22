// Définition des variables ciblant des éléments du DOM
const photographHeader = document.querySelector('.photograph-header');
const photographerInfo = document.querySelector('.photographer-info');
const photographerPicture = document.querySelector('.photographer-picture');
const fixedCounter = document.querySelector('.fixed-counter');
const chevronDown = document.querySelector('.fa-chevron-down');
const filterList = document.querySelectorAll('.tri ul li.hidden');

// Requete pour obtenir les objets photographes
async function getPhotographers() {
  let url = '../data/photographers.json';
  try {
    let res = await fetch(url);
    let json = await res.json();
    return json.photographers;
  } catch (error) {
    console.log(error);
  }
}

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

// Récupération de l'ID dans l'URL de la page pour cibler le photographe
let params;
const url = new URL(window.document.location.href);
params = url.searchParams.get('id');
const idLink = parseInt(params, 10);

// Création de l'objet profil du photographe
class Profile {
  constructor(name, city, country, tagline, portrait, price, id) {
    this.name = name;
    this.city = city;
    this.country = country;
    this.tagline = tagline;
    this.portrait = portrait;
    this.price = price;
    this.id = id;
  }
}

async function getPrice(id) {
  const profile = await getPhotographers();
  console.log(profile);
  for (let index = 0; index < profile.length; index++) {
    const element = profile[index];
    if (element.id === id) {
      return element.price;
    }
  }
}

// -----------------------------------------
// Je n'arrive pas à utiliser le promise result 
const test = getPrice(925);
console.log(test);
// -----------------------------------------

// Récupération des informations du photographe en fonction de l'ID de la page
async function getProfile() {
  const data = await getPhotographers();
  data.forEach((element) => {
    if (element.id === idLink) {
      const el = new Profile(
        element.name,
        element.city,
        element.country,
        element.tagline,
        element.portrait,
        element.price,
        element.id
      );
      const picture = `assets/photos/profile/${el.portrait}`;
      const Pname = document.createElement('p');
      Pname.innerText = `${el.name}`;
      Pname.classList.add('photographer-name');
      const Plocation = document.createElement('p');
      Plocation.innerText = `${el.country}, ${el.city}`;
      Plocation.classList.add('photographer-location');
      const Ptagline = document.createElement('p');
      Ptagline.innerText = `${el.tagline}`;
      Ptagline.classList.add('photographer-tagline');
      const img = document.createElement('img');
      img.setAttribute('src', picture);
      img.classList.add('photographer-img');
      photographerInfo.appendChild(Pname);
      photographerInfo.appendChild(Plocation);
      photographerInfo.appendChild(Ptagline);
      photographHeader.appendChild(img);
    }
  });
}

let likes = 0;
let heartCounter;

// Injecter les cartes médias dans le DOM.
function displayMedia(photographers) {
  const mediaSection = document.getElementById('media-content');
  photographers.forEach((photographer) => {
    const photographerId = photographer.photographerId;
    if (photographerId === idLink) {
      const photographerMedia = mediaFactory(photographer);
      const mediaCard = photographerMedia.createMediaCards();
      mediaSection.appendChild(mediaCard);
      likes += photographer.likes;
    }
  });
  heartCounter = likes;
}

// Injecter les médias dans le DOM
async function getMediaData(id) {
  const media = await getMedia();
  displayMedia(media);
}

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

// Injecter les informations de tarif du photographe dans le DOM
function getFixedCounter() {
  const hourlyRate = document.createElement('p');
  hourlyRate.innerHTML = `<p>${heartCounter}<i class="fas fa-heart"></i>${price}€ / jour</p>`;
  fixedCounter.appendChild(hourlyRate);
}

// Appel des fonctions pour injecter les informations dans le DOM
getProfile();
getMediaData(idLink);
getFixedCounter();
