// Requete pour obtenir tous les objets media du fichier photographers.json
async function getPhotographers() {
  let url = '../data/photographers.json';
  try {
    let res = await fetch(url);
    let json = await res.json();
    return json.media;
  } catch (error) {
    console.log(error);
  }
}


async function getMediaData(id) {
  const trial = await getPhotographers();
  trial.forEach((el) => {
  if (el.photographerId === id) {
    console.log(el.image);
  }
  });
}



//Mettre le code JavaScript lié à la page photographer.html

// function test() {
//     if (window.location.href.indexOf('photographer') > -1) {
//       alert('Alert: Desktop!');
//     }
// }

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
  hourlyRate.innerText = `${price}€ / jour`;
  fixedCounter.appendChild(hourlyRate);
}


getPhotographerBanner();
getFixedCounter();

// ---------------------
// Data media

const mediaData = [
  {
    id: 342550,
    photographerId: 82,
    title: 'Fashion Yellow Beach',
    image: 'Fashion_Yellow_Beach.jpg',
    likes: 62,
    date: '2011-12-08',
    price: 55,
  },
  {
    id: 8520927,
    photographerId: 82,
    title: 'Fashion Urban Jungle',
    image: 'Fashion_Urban_Jungle.jpg',
    likes: 11,
    date: '2011-11-06',
    price: 55,
  },
  {
    id: 9025895,
    photographerId: 82,
    title: 'Fashion Pattern on a Pattern',
    image: 'Fashion_Pattern_on_Pattern.jpg',
    likes: 72,
    date: '2013-08-12',
    price: 55,
  },
  {
    id: 9275938,
    photographerId: 82,
    title: 'Wedding Gazebo',
    image: 'Event_WeddingGazebo.jpg',
    likes: 69,
    date: '2018-02-22',
    price: 55,
  },
  {
    id: 2053494,
    photographerId: 82,
    title: 'Sparkles',
    image: 'Event_Sparklers.jpg',
    likes: 2,
    date: '2020-05-25',
    price: 55,
  },
  {
    id: 7324238,
    photographerId: 82,
    title: '18th Anniversary',
    image: 'Event_18thAnniversary.jpg',
    likes: 33,
    date: '2019-06-12',
    price: 55,
  },
  {
    id: 8328953,
    photographerId: 82,
    video: 'Art_Wooden_Horse_Sculpture.mp4',
    likes: 24,
    date: '2011-12-08',
    price: 100,
  },
  {
    id: 7502053,
    photographerId: 82,
    title: 'Triangle Man',
    image: 'Art_Triangle_Man.jpg',
    likes: 88,
    date: '2007-05-07',
    price: 55,
  },
  {
    id: 8523492,
    photographerId: 82,
    title: 'Purple Tunnel',
    image: 'Art_Purple_light.jpg',
    likes: 24,
    date: '2018-05-05',
    price: 55,
  },
  {
    id: 75902334,
    photographerId: 82,
    title: 'Art Mine',
    image: 'Art_Mine.jpg',
    likes: 75,
    date: '2019-11-25',
    price: 55,
  },
];

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

// const exemple1 = mediaData[9];

// new Photo(exemple1);

// console.log(exemple1);

// function separateImg(data) {
//   data.forEach((el) => {
//     console.log(el.likes);
//   });
// }

// separateImg(mediaData);
