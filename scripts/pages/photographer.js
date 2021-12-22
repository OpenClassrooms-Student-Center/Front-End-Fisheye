// Définition des variables ciblant des éléments du DOM
const photographHeader = document.querySelector('.photograph-header');
const photographerInfo = document.querySelector('.photographer-info');
const photographerPicture = document.querySelector('.photographer-picture');
const fixedCounter = document.querySelector('.fixed-counter');
const chevronDown = document.querySelector('.fa-chevron-down');
const filter = document.getElementsByClassName('filters');
const filterList = document.querySelectorAll('.tri ul li.hidden');
const mediaSection = document.getElementById('media-content');

// Ajout d'un écouteur d'évènement sur les filtres
for (let index = 0; index < filter.length; index++) {
  const element = filter[index];
  element.addEventListener('click', () => {
    getFilters(element);
  });
}

// Création de la fonction qui efface le contenu de la section photo, la trie, puis la renvoie en fonction du filtre choisi
async function getFilters(data) {
  mediaSection.innerHTML = '';
  let mediaArray = [];
  const medias = await getMedia();
  medias.forEach((media) => {
    if (media.photographerId === idLink) {
      mediaArray.push(media);
    }
  });
  switch (data.innerText) {
    case 'Popularité':
      mediaArray.sort((a, b) => {
        if (a.likes < b.likes) {
          return 1;
        } else if (a.likes > b.likes) {
          return -1;
        } else {
          return 0;
        }
      });
      displayMedia(mediaArray);
      break;
    case 'Date':
      mediaArray.sort((a, b) => {
        if (a.date < b.date) {
          return -1;
        } else if (a.date > b.date) {
          return 1;
        } else {
          return 0;
        }
      });
      displayMedia(mediaArray);
      break;
    case 'Titre':
      mediaArray.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        } else if (a.title > b.title) {
          return 1;
        } else {
          return 0;
        }
      });
      displayMedia(mediaArray);
      break;

    default:
      getMediaData();
      break;
  }
}

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
function displayMedia(medias) {
  medias.forEach((media) => {
    const photographerId = media.photographerId;
    if (photographerId === idLink) {
      const photographerMedia = mediaFactory(media);
      const mediaCard = photographerMedia.createMediaCards();
      mediaSection.appendChild(mediaCard);
      likes += media.likes;
    }
  });
  heartCounter = likes;
}

// Injecter les médias dans le DOM
async function getMediaData() {
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
getMediaData();
getFixedCounter();
