// Définition des variables ciblant des éléments du DOM
const photographHeader = document.querySelector('.photograph-header');
const photographerInfo = document.querySelector('.photographer-info');
const photographerPicture = document.querySelector('.photographer-picture');
const fixedCounter = document.querySelector('.fixed-counter');
const chevronDown = document.querySelector('.fa-chevron-down');
const filter = document.getElementsByClassName('filters');
const filterList = document.querySelectorAll('.tri ul li.hidden');
const mediaSection = document.getElementById('media-content');
const media = document.getElementsByClassName('media');

// Ajout d'un écouteur d'évènement sur les filtres
for (let index = 0; index < filter.length; index++) {
  const element = filter[index];
  element.addEventListener('click', () => {
    getFilters(element);
  });
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

// Fonction pour refermer la liste des filtres
function refreshFilter() {
  filterList.forEach((li) => {
    if (li.className.includes('hidden')) {
      li.classList.remove('hidden');
    } else {
      li.classList.add('hidden');
    }
  });
  chevronDown.classList.toggle('fa-chevron-up');
  chevronDown.classList.toggle('fa-chevron-down');
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
        }
        return 0;
      });
      refreshFilter();
      displayMedia(mediaArray);
      lightboxModal();
      break;
    case 'Date':
      mediaArray.sort((a, b) => {
        if (a.date < b.date) {
          return -1;
        } else if (a.date > b.date) {
          return 1;
        }
        return 0;
      });
      refreshFilter();
      displayMedia(mediaArray);
      lightboxModal();
      break;
    case 'Titre':
      mediaArray.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        } else if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
      refreshFilter();
      displayMedia(mediaArray);
      lightboxModal();
      break;

    default:
      refreshFilter();
      getMediaData();
      lightboxModal();
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

// Récupération des informations du photographe en fonction de l'ID de la page
async function getProfile() {
  const data = await getPhotographers();
  data.forEach(async (element) => {
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
      const hearts = await getMediaData();
      getFixedCounter(el.price, hearts);
    }
  });
}

// Injecter les cartes médias dans le DOM.
function displayMedia(medias) {
  let likes = 0;
  medias.forEach((media, i) => {
    const photographerId = media.photographerId;
    if (photographerId === idLink) {
      const photographerMedia = mediaFactory(media);
      const mediaCard = photographerMedia.createMediaCards(i);
      mediaSection.appendChild(mediaCard);
      likes += media.likes;
      // -------------------------------------------
      // Sélectionner l'icone coeur pour lui ajouter un event listener afin d'incrémenter le nombre de likes au clic
      // const heartCount = document.querySelectorAll('.fa-heart');
      // console.log(heartCount[0]);
      // for (let index = 0; index < heartCount; index++) {
      //   const element = heartCount[index];
      //   console.log(element);
      //   element.addEventListener('click', () => {
      //     console.log(element);
      //   })
      // }
      // --------------------------------------------
    }
  });
  return likes;
}

// Injecter les médias dans le DOM
async function getMediaData() {
  const media = await getMedia();
  return displayMedia(media);
}

// Injecter les informations de tarif du photographe dans le DOM
function getFixedCounter(price, hearts) {
  const hourlyRate = document.createElement('p');
  hourlyRate.innerHTML = `<p>${hearts} <i class="fas fa-heart"></i> ${price}€ / jour</p>`;
  fixedCounter.appendChild(hourlyRate);
}

// Création de la lightbox pour afin un diaporama au clic
function lightboxModal() {
  for (let i = 0; i < media.length; i++) {
    let element = media[i];
    // Ajout d'un event listener clic sur chaque média et création de la lightbox
    element.addEventListener('click', () => {
      const lightbox = document.createElement('div');
      lightbox.id = 'lightbox';
      document.body.appendChild(lightbox);
      document.body.style.overflow = 'hidden';
      document.body.style.margin = 'initial';
      let newMedia;
      // Si le média cliqué possède un attribut src, c'est une balise img. Je créé une nouvelle balise img à laquelle je passe les informations du média cliqué pour afficher le média correct grace à l'attribut data-index
      if (element.src) {
        newSrc = element.getAttribute('src');
        newAlt = element.getAttribute('alt');
        newDataIndex = element.getAttribute('data-index');
        newClass = element.getAttribute('class');
        newMedia = document.createElement('img');
        newMedia.setAttribute('src', newSrc);
        newMedia.setAttribute('alt', newAlt);
        newMedia.setAttribute('data-index', newDataIndex);
        newMedia.setAttribute('class', newClass);
        // Si le média cliqué ne possède pas d'attribut src, c'est une vidéo. Je créé une nouvelle balise vidéo et source auxquelles je passe les informations du média cliqué pour afficher le média correct grace à l'attribut data-index
      } else {
        newSource = element.children[0];
        newDataIndex = element.getAttribute('data-index');
        newClass = element.getAttribute('class');
        newMedia = document.createElement('video');
        newSrc = document.createElement('source');
        newSrc.setAttribute('src', newSource.getAttribute('src'));
        newMedia.setAttribute('data-index', newDataIndex);
        newMedia.setAttribute('class', newClass);
        newMedia.setAttribute('controls', true);
        newMedia.appendChild(newSrc);
      }
      const leftArrow = document.createElement('i');
      leftArrow.classList.add('fas', 'fa-chevron-left');
      const rightArrow = document.createElement('i');
      rightArrow.classList.add('fas', 'fa-chevron-right');
      const exit = document.createElement('i');
      exit.classList.add('fas', 'fa-times');
      exit.setAttribute('id', 'exit');
      lightbox.appendChild(newMedia);
      lightbox.appendChild(leftArrow);
      lightbox.appendChild(rightArrow);
      lightbox.appendChild(exit);
      // Au clic sur la croix, si l'élément était une valise vidéo, lui ajouter la balise source afin que la vidéo reste fonctionnelle au prochain clic
      exit.addEventListener('click', () => {
        if (!element.src) {
          element.appendChild(newSource);
        }
        document.body.removeChild(lightbox);
        document.body.style.overflow = 'initial';
      });
      // Au clic sur la flèche gauche de la lightbox, l'attribut data-index de l'élément visible est décrémenté de 1, puis le média est retiré.
      leftArrow.addEventListener('click', () => {
        newDataIndex--;
        lightbox.removeChild(newMedia);
        // Appel d'une boucle sur tous les médias du photographe de la page afin de trouver le média qui correspond au nouveau data-index
        for (let index = 0; index < media.length; index++) {
          const element = media[index];
          const minusOne = media[0].getAttribute('data-index') - 1;
          // Si il y a un élément qui correspond au nouveau data-index (un média précédent dans la liste)
          if (element.getAttribute('data-index') == newDataIndex) {
            // Si ce média possède une source (est donc est une balise img)
            if (element.src) {
              // Je créé une nouvelle balise img à laquelle j'ajoute les informations du nouveau média avant de l'insérer dans le DOM
              newMedia = document.createElement('img');
              newSrc = element.getAttribute('src');
              newAlt = element.getAttribute('alt');
              newDataIndex = element.getAttribute('data-index');
              newClass = element.getAttribute('class');
              newMedia.setAttribute('src', newSrc);
              newMedia.setAttribute('alt', newAlt);
              newMedia.setAttribute('class', newClass);
              newMedia.setAttribute('data-index', newDataIndex);
              lightbox.appendChild(newMedia);
              // Si ce média ne possède pas de source, dans ce cas c'est une balise vidéo
            } else {
              // Je récupère les informations et la balise source que je passe dans des nouvelles balises crées avant de l'injecter dans le DOM
              newSource = element.children[0];
              newDataIndex = element.getAttribute('data-index');
              newClass = element.getAttribute('class');
              newMedia = document.createElement('video');
              newSrc = document.createElement('source');
              newSrc.setAttribute('src', newSource.getAttribute('src'));
              newMedia.setAttribute('data-index', newDataIndex);
              newMedia.setAttribute('class', newClass);
              newMedia.setAttribute('controls', true);
              newMedia.appendChild(newSrc);
              lightbox.appendChild(newMedia);
            }
            break;
          } else if (newDataIndex == minusOne) {
            newDataIndex = media[media.length - 1].getAttribute('data-index');
          }
        }
      });

      // Au clic sur la flèche droite de la lightbox, l'attribut data-index de l'élément visible est incrémenté de 1, puis le média est retiré.
      rightArrow.addEventListener('click', () => {
        newDataIndex++;
        lightbox.removeChild(newMedia);
        // Appel d'une boucle sur tous les médias du photographe de la page afin de trouver le média qui correspond au nouveau data-index
        for (let index = 0; index < media.length; index++) {
          const element = media[index];
          const length = media[media.length - 1].getAttribute('data-index');
          const parsed = parseInt(length, 10);
          const One = 1;
          const plusOne = One + parsed;
          // Si il y a un élément qui correspond au nouveau data-index (un média suivant dans la liste)
          if (element.getAttribute('data-index') == newDataIndex) {
            // Si ce média possède une source (est donc est une balise img)
            if (element.src) {
              // Je créé une nouvelle balise img à laquelle j'ajoute les informations du nouveau média avant de l'insérer dans le DOM
              newMedia = document.createElement('img');
              newSrc = element.getAttribute('src');
              newAlt = element.getAttribute('alt');
              newDataIndex = element.getAttribute('data-index');
              newClass = element.getAttribute('class');
              newMedia.setAttribute('src', newSrc);
              newMedia.setAttribute('alt', newAlt);
              newMedia.setAttribute('class', newClass);
              newMedia.setAttribute('data-index', newDataIndex);
              lightbox.appendChild(newMedia);
              // Si ce média ne possède pas de source, dans ce cas c'est une balise vidéo
            } else {
              // Je récupère les informations et la balise source que je passe dans des nouvelles balises crées avant de l'injecter dans le DOM
              newSource = element.children[0];
              newDataIndex = element.getAttribute('data-index');
              newClass = element.getAttribute('class');
              newMedia = document.createElement('video');
              newSrc = document.createElement('source');
              newSrc.setAttribute('src', newSource.getAttribute('src'));
              newMedia.setAttribute('data-index', newDataIndex);
              newMedia.setAttribute('class', newClass);
              newMedia.setAttribute('controls', true);
              newMedia.appendChild(newSrc);
              lightbox.appendChild(newMedia);
            }
            break;
          } else if (newDataIndex == plusOne) {
            newDataIndex = media[0].getAttribute('data-index');
            if (element.src) {
              // Je créé une nouvelle balise img à laquelle j'ajoute les informations du nouveau média avant de l'insérer dans le DOM
              newMedia = document.createElement('img');
              newSrc = element.getAttribute('src');
              newAlt = element.getAttribute('alt');
              newDataIndex = element.getAttribute('data-index');
              newClass = element.getAttribute('class');
              newMedia.setAttribute('src', newSrc);
              newMedia.setAttribute('alt', newAlt);
              newMedia.setAttribute('class', newClass);
              newMedia.setAttribute('data-index', newDataIndex);
              lightbox.appendChild(newMedia);
              // Si ce média ne possède pas de source, dans ce cas c'est une balise vidéo
            } else {
              // Je récupère les informations et la balise source que je passe dans des nouvelles balises crées avant de l'injecter dans le DOM
              newSource = element.children[0];
              newDataIndex = element.getAttribute('data-index');
              newClass = element.getAttribute('class');
              newMedia = document.createElement('video');
              newSrc = document.createElement('source');
              newSrc.setAttribute('src', newSource.getAttribute('src'));
              newMedia.setAttribute('data-index', newDataIndex);
              newMedia.setAttribute('class', newClass);
              newMedia.setAttribute('controls', true);
              newMedia.appendChild(newSrc);
              lightbox.appendChild(newMedia);
            }
            break;
          }
        }
      });
      // Ajout d'un évènement listener lorsque la lightbox est ouverte pour naviguer entre les médias avec les flèches du clavier
      document.addEventListener('keydown', (e) => {
        switch (e.key) {
          case 'ArrowLeft':
            // ---------------------------------------------------------
            newDataIndex--;
            lightbox.removeChild(newMedia);
            // Appel d'une boucle sur tous les médias du photographe de la page afin de trouver le média qui correspond au nouveau data-index
            for (let index = 0; index < media.length; index++) {
              const element = media[index];
              const minusOne = media[0].getAttribute('data-index') - 1;
              // Si il y a un élément qui correspond au nouveau data-index (un média précédent dans la liste)
              if (element.getAttribute('data-index') == newDataIndex) {
                // Si ce média possède une source (est donc est une balise img)
                if (element.src) {
                  // Je créé une nouvelle balise img à laquelle j'ajoute les informations du nouveau média avant de l'insérer dans le DOM
                  newMedia = document.createElement('img');
                  newSrc = element.getAttribute('src');
                  newAlt = element.getAttribute('alt');
                  newDataIndex = element.getAttribute('data-index');
                  newClass = element.getAttribute('class');
                  newMedia.setAttribute('src', newSrc);
                  newMedia.setAttribute('alt', newAlt);
                  newMedia.setAttribute('class', newClass);
                  newMedia.setAttribute('data-index', newDataIndex);
                  lightbox.appendChild(newMedia);
                  // Si ce média ne possède pas de source, dans ce cas c'est une balise vidéo
                } else {
                  // Je récupère les informations et la balise source que je passe dans des nouvelles balises crées avant de l'injecter dans le DOM
                  newSource = element.children[0];
                  newDataIndex = element.getAttribute('data-index');
                  newClass = element.getAttribute('class');
                  newMedia = document.createElement('video');
                  newSrc = document.createElement('source');
                  newSrc.setAttribute('src', newSource.getAttribute('src'));
                  newMedia.setAttribute('data-index', newDataIndex);
                  newMedia.setAttribute('class', newClass);
                  newMedia.setAttribute('controls', true);
                  newMedia.appendChild(newSrc);
                  lightbox.appendChild(newMedia);
                }
                break;
              } else if (newDataIndex == minusOne) {
                newDataIndex =
                  media[media.length - 1].getAttribute('data-index');
              }
            }
            // ---------------------------------------------------------

            break;

          case 'ArrowRight':
            // ---------------------------------------------------------
            newDataIndex++;
            lightbox.removeChild(newMedia);
            // Appel d'une boucle sur tous les médias du photographe de la page afin de trouver le média qui correspond au nouveau data-index
            for (let index = 0; index < media.length; index++) {
              const element = media[index];
              const length = media[media.length - 1].getAttribute('data-index');
              const parsed = parseInt(length, 10);
              const One = 1;
              const plusOne = One + parsed;
              // Si il y a un élément qui correspond au nouveau data-index (un média suivant dans la liste)
              if (element.getAttribute('data-index') == newDataIndex) {
                // Si ce média possède une source (est donc est une balise img)
                if (element.src) {
                  // Je créé une nouvelle balise img à laquelle j'ajoute les informations du nouveau média avant de l'insérer dans le DOM
                  newMedia = document.createElement('img');
                  newSrc = element.getAttribute('src');
                  newAlt = element.getAttribute('alt');
                  newDataIndex = element.getAttribute('data-index');
                  newClass = element.getAttribute('class');
                  newMedia.setAttribute('src', newSrc);
                  newMedia.setAttribute('alt', newAlt);
                  newMedia.setAttribute('class', newClass);
                  newMedia.setAttribute('data-index', newDataIndex);
                  lightbox.appendChild(newMedia);
                  // Si ce média ne possède pas de source, dans ce cas c'est une balise vidéo
                } else {
                  // Je récupère les informations et la balise source que je passe dans des nouvelles balises crées avant de l'injecter dans le DOM
                  newSource = element.children[0];
                  newDataIndex = element.getAttribute('data-index');
                  newClass = element.getAttribute('class');
                  newMedia = document.createElement('video');
                  newSrc = document.createElement('source');
                  newSrc.setAttribute('src', newSource.getAttribute('src'));
                  newMedia.setAttribute('data-index', newDataIndex);
                  newMedia.setAttribute('class', newClass);
                  newMedia.setAttribute('controls', true);
                  newMedia.appendChild(newSrc);
                  lightbox.appendChild(newMedia);
                }
                break;
              } else if (newDataIndex == plusOne) {
                newDataIndex = media[0].getAttribute('data-index');
                if (element.src) {
                  // Je créé une nouvelle balise img à laquelle j'ajoute les informations du nouveau média avant de l'insérer dans le DOM
                  newMedia = document.createElement('img');
                  newSrc = element.getAttribute('src');
                  newAlt = element.getAttribute('alt');
                  newDataIndex = element.getAttribute('data-index');
                  newClass = element.getAttribute('class');
                  newMedia.setAttribute('src', newSrc);
                  newMedia.setAttribute('alt', newAlt);
                  newMedia.setAttribute('class', newClass);
                  newMedia.setAttribute('data-index', newDataIndex);
                  lightbox.appendChild(newMedia);
                  // Si ce média ne possède pas de source, dans ce cas c'est une balise vidéo
                } else {
                  // Je récupère les informations et la balise source que je passe dans des nouvelles balises crées avant de l'injecter dans le DOM
                  newSource = element.children[0];
                  newDataIndex = element.getAttribute('data-index');
                  newClass = element.getAttribute('class');
                  newMedia = document.createElement('video');
                  newSrc = document.createElement('source');
                  newSrc.setAttribute('src', newSource.getAttribute('src'));
                  newMedia.setAttribute('data-index', newDataIndex);
                  newMedia.setAttribute('class', newClass);
                  newMedia.setAttribute('controls', true);
                  newMedia.appendChild(newSrc);
                  lightbox.appendChild(newMedia);
                }
                break;
              }
            }
            // ---------------------------------------------------------
            break;

          default:
            break;
        }
      });
    });
  }
}

// Pour pouvoir appeler le lightbox modal à cause du async media mais devra être rappelé à chaque filtre
setTimeout(() => {
  lightboxModal();
}, 1000);

// Appel des fonctions pour injecter les informations dans le DOM
getProfile();
