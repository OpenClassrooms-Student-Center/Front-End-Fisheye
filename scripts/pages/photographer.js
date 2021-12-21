const photographHeader = document.querySelector('.photograph-header');
const photographerInfo = document.querySelector('.photographer-info');
const photographerPicture = document.querySelector('.photographer-picture');
const fixedCounter = document.querySelector('.fixed-counter');
const chevronDown = document.querySelector('.fa-chevron-down');
const filterList = document.querySelectorAll('.tri ul li.hidden');
const photographerTemplate = {
  name: 'Mimi Keel',
  id: 243,
  city: 'London',
  country: 'UK',
  tagline: 'Voir le beau dans le quotidien',
  price: 400,
  portrait: 'MimiKeel.jpg',
};
const { name, id, city, country, tagline, price, portrait } =
  photographerTemplate;

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

const actualId = 925;
let likes = 0;
let heartCounter;

// Fonction pour injecter les cartes médias.
function displayMedia(photographers) {
  const mediaSection = document.getElementById('media-content');
  photographers.forEach((photographer) => {
    const photographerId = photographer.photographerId;
    if (photographerId === actualId) {
      const photographerMedia = mediaFactory(photographer);
      const mediaCard = photographerMedia.createMediaCards();
      mediaSection.appendChild(mediaCard);
      likes += photographer.likes;
      console.log(likes);
    }
  });
  heartCounter = likes;
}
async function getMediaData(id) {
  const media = await getMedia();
  displayMedia(media);
}

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
  hourlyRate.innerHTML = `<p>${heartCounter}<i class="fas fa-heart"></i>${price}€ / jour</p>`;
  fixedCounter.appendChild(hourlyRate);
}
getPhotographerBanner();
getMediaData(actualId);
getFixedCounter();
