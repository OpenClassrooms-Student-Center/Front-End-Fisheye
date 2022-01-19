/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Définition des variables ciblant des éléments du DOM
const photographHeader = document.querySelector('.photograph-header');
const photographerInfo = document.querySelector('.photographer-info');
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

// Menu déroulant de filtres sur la page des médias
if (document.location.href.includes('photographer')) {
  chevronDown.addEventListener('click', () => {
    filterList.forEach((li) => {
      if (li.className.includes('hidden')) {
        li.classList.remove('hidden');
        chevronDown.setAttribute('aria-expanded', true);
      } else {
        li.classList.add('hidden');
        chevronDown.setAttribute('aria-expanded', false);
      }
    });
    chevronDown.classList.toggle('fa-chevron-up');
    chevronDown.classList.toggle('fa-chevron-down');
  });
}

// Fonction pour refermer la liste des filtres
function refreshFilter() {
  filterList.forEach((li) => {
    if (li.className.includes('hidden')) {
      li.classList.remove('hidden');
    } else {
      li.classList.add('hidden');
      chevronDown.setAttribute('aria-expanded', 'false');
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
      if (chevronDown.classList.contains('fa-chevron-up')) {
        refreshFilter();
      }
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
    // Ajout de l'attribut alt pour chaque média
    json.media.forEach((media) => {
      let regex = new RegExp(/\.(mp4)/);
      let regexUnderscore = new RegExp(/[_]/g);
      let regexNumber = new RegExp(/\d/g);
      if (media.video) {
        const deleteMp4 = media.video.replace(regex, '');
        const preAlt = deleteMp4.replace(regexUnderscore, ' ');
        const alt = preAlt.replace(regexNumber, '');
        media.alt = alt;
      } else if (media.title) {
        const preAlt = media.title.replace(regexUnderscore, ' ');
        const alt = preAlt.replace(regexNumber, '');
        media.alt = alt;
      }
    });
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
      const Pname = document.createElement('h1');
      Pname.innerText = `${el.name}`;
      Pname.classList.add('photographer-name');
      const Plocation = document.createElement('p');
      Plocation.innerText = `${el.city}, ${el.country}`;
      Plocation.classList.add('photographer-location');
      const Ptagline = document.createElement('p');
      Ptagline.innerText = `${el.tagline}`;
      Ptagline.classList.add('photographer-tagline');
      const img = document.createElement('img');
      img.setAttribute('src', picture);
      img.setAttribute('alt', `Portrait de ${el.name}`);
      img.classList.add('photographer-img');
      photographerInfo.appendChild(Pname);
      photographerInfo.appendChild(Plocation);
      photographerInfo.appendChild(Ptagline);
      photographHeader.appendChild(img);
      const hearts = await getMediaData();
      getFixedCounter(el.price, hearts);
      getContactName(el.name);
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
      const heartCount = mediaCard.querySelector('.fa-heart');
      heartCount.addEventListener('click', (e) => {
        // Récupérer le compteur global.
        let compteurLikes = document.getElementsByClassName('total-likes')[0];
        let parent = e.target.parentNode;
        let lc = parent.children[0];
        let state = lc.getAttribute('data-state') || 0;
        if (state == 0) {
          // Incrémenter le compteur global
          lc.innerText++;
          lc.setAttribute('data-state', 1);
          compteurLikes.innerText++;
          heartCount.classList.add('liked');
        } else {
          // Décrémenter le compteur global
          lc.innerText--;
          lc.setAttribute('data-state', 0);
          compteurLikes.innerText--;
          heartCount.classList.remove('liked');
        }
      });
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
  hourlyRate.innerHTML = `<span class="total-likes">${hearts}</span> <i class="fas fa-heart"></i> <span class="daily-rate">${price}€ / jour</span>`;
  fixedCounter.appendChild(hourlyRate);
}

// Injecter le nom du photographe dans le header du formulaire de contact
function getContactName(name) {
  const contactName = document.createElement('p');
  contactName.innerText = name;
  const contactMe = document.getElementById('contact-me');
  contactMe.appendChild(contactName);
}

function createLightbox() {
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  document.body.appendChild(lightbox);
  document.body.style.overflow = 'hidden';
  document.body.style.margin = 'initial';
  document.body.children.main.setAttribute('aria-hidden', 'true');
  document.body.removeAttribute('aria-current', 'page');
  lightbox.setAttribute('aria-current', 'page');
  return lightbox;
}

function createModal(element, lightbox) {
  let newMedia;
  if (element.src) {
    // Si le média cliqué possède un attribut src, c'est une balise img. Je créé une nouvelle balise img à laquelle je passe les informations du média cliqué pour afficher le média correct grace à l'attribut data-index
    newMedia = createImg(element, lightbox);
  } else {
    // Si le média cliqué ne possède pas d'attribut src, c'est une vidéo. Je créé une nouvelle balise vidéo et source auxquelles je passe les informations du média cliqué pour afficher le média correct grace à l'attribut data-index
    newMedia = createVid(element, lightbox);
  }
  lightbox.appendChild(newMedia);
  return newMedia;
}

function createArrows(lightbox) {
  // Ajout des icones fléchées et de la croix sur le diaporama
  const leftArrow = document.createElement('i');
  leftArrow.classList.add('fas', 'fa-chevron-left');
  leftArrow.setAttribute('aria-label', 'previous');
  leftArrow.setAttribute('role', 'Previous image');
  const rightArrow = document.createElement('i');
  rightArrow.classList.add('fas', 'fa-chevron-right');
  rightArrow.setAttribute('aria-label', 'next');
  rightArrow.setAttribute('role', 'Next image');
  const exit = document.createElement('i');
  exit.classList.add('fas', 'fa-times');
  exit.setAttribute('id', 'exit');
  exit.setAttribute('aria-label', 'close');
  exit.setAttribute('role', 'Exit closeup view');
  lightbox.appendChild(leftArrow);
  lightbox.appendChild(rightArrow);
  lightbox.appendChild(exit);
}

// Création de la lightbox pour afin un diaporama au clic
function lightboxModal() {
  for (let i = 0; i < media.length; i++) {
    let element = media[i];
    // Ajout d'un event listener clic sur chaque média et création de la lightbox
    element.addEventListener('keydown', (e) => {
      if (e.key == ' ' || e.key === 'Enter') {
        let lightbox = createLightbox();
        newMedia = createModal(element, lightbox);
        arrows = createArrows(lightbox);
        window.addEventListener('keydown', (e) => {
          switch (e.key) {
            case 'ArrowLeft':
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
                    newMedia = createImg(element, lightbox);
                  } else {
                    // Si ce média ne possède pas de source, dans ce cas c'est une balise vidéo
                    // Je récupère les informations et la balise source que je passe dans des nouvelles balises crées avant de l'injecter dans le DOM
                    newMedia = createVid(element, lightbox);
                  }
                  break;
                } else if (newDataIndex == minusOne) {
                  newDataIndex =
                    media[media.length - 1].getAttribute('data-index');
                }
              }
              break;
            case 'ArrowRight':
              console.log('va a droite');
              break;
            case 'Escape':
              // A la pression de la touche echap du clavier, si l'élément était une balise vidéo, lui ajouter la balise source afin que la vidéo reste fonctionnelle
              if (!element.src) {
                element.appendChild(newSource);
              }
              document.body.removeChild(lightbox);
              document.body.style.overflow = 'initial';
              document.body.style.margin = '0 auto';
              lightbox.removeAttribute('aria-current', 'page');
              document.body.children.main.setAttribute('aria-hidden', 'false');
              document.body.setAttribute('aria-current', 'page');
              break;
            default:
              break;
          }
        });
      }
    });
    element.addEventListener('click', () => {
      const lightbox = document.createElement('div');
      lightbox.id = 'lightbox';
      document.body.appendChild(lightbox);
      document.body.style.overflow = 'hidden';
      document.body.style.margin = 'initial';
      document.body.children.main.setAttribute('aria-hidden', 'true');
      document.body.removeAttribute('aria-current', 'page');
      lightbox.setAttribute('aria-current', 'page');
      let newMedia;
      if (element.src) {
        // Si le média cliqué possède un attribut src, c'est une balise img. Je créé une nouvelle balise img à laquelle je passe les informations du média cliqué pour afficher le média correct grace à l'attribut data-index
        newMedia = createImg(element, lightbox);
      } else {
        // Si le média cliqué ne possède pas d'attribut src, c'est une vidéo. Je créé une nouvelle balise vidéo et source auxquelles je passe les informations du média cliqué pour afficher le média correct grace à l'attribut data-index
        newMedia = createVid(element, lightbox);
      }
      // Ajout des icones fléchées et de la croix sur le diaporama
      const leftArrow = document.createElement('i');
      leftArrow.classList.add('fas', 'fa-chevron-left');
      leftArrow.setAttribute('aria-label', 'previous');
      leftArrow.setAttribute('role', 'Previous image');
      const rightArrow = document.createElement('i');
      rightArrow.classList.add('fas', 'fa-chevron-right');
      rightArrow.setAttribute('aria-label', 'next');
      rightArrow.setAttribute('role', 'Next image');
      const exit = document.createElement('i');
      exit.classList.add('fas', 'fa-times');
      exit.setAttribute('id', 'exit');
      exit.setAttribute('aria-label', 'close');
      exit.setAttribute('role', 'Exit closeup view');
      lightbox.appendChild(newMedia);
      lightbox.appendChild(leftArrow);
      lightbox.appendChild(rightArrow);
      lightbox.appendChild(exit);
      // Au clic sur la croix, si l'élément était une balise vidéo, lui ajouter la balise source afin que la vidéo reste fonctionnelle au prochain clic
      exit.addEventListener('click', () => {
        if (!element.src) {
          element.appendChild(newSource);
        }
        document.body.removeChild(lightbox);
        document.body.style.overflow = 'initial';
        document.body.style.margin = '0 auto';
        lightbox.removeAttribute('aria-current', 'page');
        document.body.children.main.setAttribute('aria-hidden', 'false');
        document.body.setAttribute('aria-current', 'page');
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
              newMedia = createImg(element, lightbox);
            } else {
              // Si ce média ne possède pas de source, dans ce cas c'est une balise vidéo
              // Je récupère les informations et la balise source que je passe dans des nouvelles balises crées avant de l'injecter dans le DOM
              newMedia = createVid(element, lightbox);
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
              newMedia = createImg(element, lightbox);
            } else {
              // Si ce média ne possède pas de source, dans ce cas c'est une balise vidéo
              // Je récupère les informations et la balise source que je passe dans des nouvelles balises crées avant de l'injecter dans le DOM
              newMedia = createVid(element, lightbox);
            }
            break;
          } else if (newDataIndex == plusOne) {
            newDataIndex = media[0].getAttribute('data-index');
            if (element.src) {
              // Je créé une nouvelle balise img à laquelle j'ajoute les informations du nouveau média avant de l'insérer dans le DOM
              newMedia = createImg(element, lightbox);
            } else {
              // Si ce média ne possède pas de source, dans ce cas c'est une balise vidéo
              // Je récupère les informations et la balise source que je passe dans des nouvelles balises crées avant de l'injecter dans le DOM
              newMedia = createVid(element, lightbox);
            }
            break;
          }
        }
      });
      // Ajout d'un évènement listener lorsque la lightbox est ouverte pour naviguer entre les médias avec les flèches du clavier
      document.addEventListener('keydown', (e) => {
        switch (e.key) {
          case 'ArrowLeft':
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
                  newMedia = createImg(element, lightbox);
                } else {
                  // Si ce média ne possède pas de source, dans ce cas c'est une balise vidéo
                  // Je récupère les informations et la balise source que je passe dans des nouvelles balises crées avant de l'injecter dans le DOM
                  newMedia = createVid(element, lightbox);
                }
                break;
              } else if (newDataIndex == minusOne) {
                newDataIndex =
                  media[media.length - 1].getAttribute('data-index');
              }
            }
            break;
          case 'ArrowRight':
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
                  newMedia = createImg(element, lightbox);
                  // Si ce média ne possède pas de source, dans ce cas c'est une balise vidéo
                } else {
                  // Je récupère les informations et la balise source que je passe dans des nouvelles balises crées avant de l'injecter dans le DOM
                  newMedia = createVid(element, lightbox);
                }
                break;
              } else if (newDataIndex == plusOne) {
                newDataIndex = media[0].getAttribute('data-index');
                if (element.src) {
                  // Je créé une nouvelle balise img à laquelle j'ajoute les informations du nouveau média avant de l'insérer dans le DOM
                  newMedia = createImg(element, lightbox);
                  // Si ce média ne possède pas de source, dans ce cas c'est une balise vidéo
                } else {
                  // Je récupère les informations et la balise source que je passe dans des nouvelles balises crées avant de l'injecter dans le DOM
                  newMedia = createVid(element, lightbox);
                }
                break;
              }
            }
            break;
          default:
            break;
        }
      });
    });
  }
}

// Fonction pour générer la balise img du diaporama
function createImg(element, lightbox) {
  let newMedia;
  newMedia = document.createElement('img');
  newSrc = element.getAttribute('src');
  newAlt = element.getAttribute('alt');
  newDataIndex = element.getAttribute('data-index');
  newClass = element.getAttribute('class');
  newMedia.setAttribute('src', newSrc);
  newMedia.setAttribute('alt', newAlt);
  newMedia.setAttribute('class', newClass);
  newMedia.setAttribute('data-index', newDataIndex);
  newMedia.setAttribute('aria-label', 'image');
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-label', 'image closeup view');
  lightbox.appendChild(newMedia);
  return newMedia;
}

// Fonction pour générer la balise vidéo et source du diaporama
function createVid(element, lightbox) {
  let newMedia;
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
  newMedia.setAttribute('aria-label', 'video');
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-label', 'video closeup view');
  lightbox.appendChild(newMedia);
  return newMedia;
}

// Pour pouvoir appeler le lightbox modal à cause du async media mais devra être rappelé à chaque filtre
setTimeout(() => {
  lightboxModal();
}, 1000);

// Appel des fonctions pour injecter les informations dans le DOM
getProfile();
