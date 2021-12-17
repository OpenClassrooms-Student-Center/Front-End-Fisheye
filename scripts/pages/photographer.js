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
const {name, id, city, country, tagline, price, portrait} = photographerTemplate;
console.log(name);


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
  img.classList.add('photographer-img')
  photographerInfo.appendChild(Pname);
  photographerInfo.appendChild(Plocation);
  photographerInfo.appendChild(Ptagline);
  photographHeader.appendChild(img)
}

const chevronDown = document.querySelector('.fa-chevron-down');
const filterList = document.querySelectorAll('.tri ul li.hidden')

// Menu déroulant de filtres
chevronDown.addEventListener('click', () => {
  filterList.forEach(li => {
    if(li.className.includes('hidden')) {
      li.classList.remove('hidden');
    } else {
      li.classList.add('hidden')
    }
  })
})



function getFixedCounter() {
  const hourlyRate = document.createElement('p');
  hourlyRate.innerText = `${price}€ / jour`;
  fixedCounter.appendChild(hourlyRate);
}

getPhotographerBanner()
getFixedCounter()