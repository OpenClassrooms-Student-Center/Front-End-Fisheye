// Global variables
let currentPhotographer = null
let currentPhotographerMedias = null
let lighboxCurrentMediaId = null
let currentFilter = 'filter_popular'

// Global selectors
const lightbox = document.querySelector('#lightbox')
const closeLightbox = document.querySelector('.close_lightbox')
const lightboxMediaContent = document.querySelector('.lightbox__content--middleColumn')


// Display functions
async function displayPhotographerData () {
  const photographerSection = document.querySelector('.photographHeader')

  const photographerHeaderDOM = currentPhotographer.getPhotographerHeaderDOM()
  photographerSection.appendChild(photographerHeaderDOM)
}

async function displayPhotographerComplementaryData () {
  const photographerComplementarySection = document.querySelector('.photographComplementary')

  currentPhotographerMedias.forEach(media => {
    currentPhotographer.totalLikes += media.likes
  });
  const photographerComplementaryDOM = currentPhotographer.getPhotographerComplementaryDOM()
  photographerComplementarySection.appendChild(photographerComplementaryDOM)
}

async function displayMediasCards () {
  const mediaSection = document.querySelector('.mediaCards')
  mediaSection.textContent = ''
  currentPhotographerMedias.forEach(media => {
    const mediaCardDOM = media.getMediaCardDOM()
    mediaSection.appendChild(mediaCardDOM)
    likesUtilities (media.id)
  });
  addEventListenersToCards ()
}

function displayMediaInLightbox (media) {
  lightboxMediaContent.textContent = ''
  lightboxMediaContent.appendChild(media.getMediaLightboxDOM())
}

// Utilities functions
function addEventListenersToCards () {
  const openLightboxs = document.querySelectorAll('.open_lightbox')
  
  openLightboxs.forEach((openLightbox) => {
    openLightbox.addEventListener('click', (e) => {
      lighboxCurrentMediaId = Number(e.target.id)
      const selectedMedia = currentPhotographerMedias.filter((media) => media.id === lighboxCurrentMediaId)[0]
      displayMediaInLightbox(selectedMedia)
      lightbox.showModal()
    })
  })

  closeLightbox.addEventListener('click', () => {
    lightbox.close()
  })
}

async function modalUtilities () {
  const mainSection = document.querySelector('main')

  const modalDOM = currentPhotographer.getPhotographerModalDOM()
  mainSection.after(modalDOM)

  const modal = document.querySelector('#contact_modal')
  const openModal = document.querySelector('.contact_button')
  const closeModal = document.querySelector('.close_modal')
  const form = document.querySelector('#form')

  openModal.addEventListener('click', () => {
    modal.showModal()
  })

  closeModal.addEventListener('click', () => {
    modal.close()
  })

  form.addEventListener('submit', (e) => {
    // Can use 'form' or 'e.target'
    const formData = new FormData(e.target)
    // Use reduce
    for (const [key, value] of formData.entries()) {
      console.log((`${key}: ${value}`))
    }
    form.reset()
  })
}

async function lightboxUtilities () {
  const nextSlideButton = document.querySelector('.lightbox__rightButton')
  const previousSlideButton = document.querySelector('.lightbox__leftButton')

  nextSlideButton.addEventListener('click', () => {
    // Check if current item is last and define next item
    const lighboxCurrentMediaIndex = currentPhotographerMedias.findIndex((media) => media.id === lighboxCurrentMediaId)
    let nextMediaIndex
    if (lighboxCurrentMediaIndex === currentPhotographerMedias.length - 1) {
      nextMediaIndex = 0
    } else {
      nextMediaIndex = lighboxCurrentMediaIndex + 1
    }
    let nextMedia = currentPhotographerMedias[nextMediaIndex]

    // Display next item
    displayMediaInLightbox(nextMedia)

    // Define current item
    lighboxCurrentMediaId = nextMedia.id
  })

  previousSlideButton.addEventListener('click', () => {
    // Check if current item is first and define next item
    const lighboxCurrentMediaIndex = currentPhotographerMedias.findIndex((media) => media.id === lighboxCurrentMediaId)
    let nextMediaIndex
    if (lighboxCurrentMediaIndex === 0) {
      nextMediaIndex = currentPhotographerMedias.length - 1
    } else {
      nextMediaIndex = lighboxCurrentMediaIndex - 1
    }
    let nextMedia = currentPhotographerMedias[nextMediaIndex]

    // Display next item
    displayMediaInLightbox(nextMedia)

    // Define current item
    lighboxCurrentMediaId = nextMedia.id
  })
}

function filterUtilities () {
  const filterSelectedElement = document.querySelector('.photographMedias__filtersMenu--selected')
  const filterListElement = document.querySelector('.photographMedias__filtersMenu--list')
  const filterItemsElement = document.querySelectorAll('.photographMedias__filtersMenu--list > li')
  filterItemsElement.forEach(element => {
    element.addEventListener('click', (e) => {
      let currentFilterElement = e.target
      sortMediasBy(currentFilterElement.id)
      filterSelectedElement.innerHTML = `${currentFilterElement.textContent}<i class="fa-solid fa-chevron-down"></i>`
      filterSelectedElement.classList.toggle('displayNone')
      filterListElement.classList.toggle('displayNone')
      displayMediasCards ()
    })
  })
  filterSelectedElement.addEventListener('click', () => {
    filterSelectedElement.classList.toggle('displayNone')
    filterListElement.classList.toggle('displayNone')
  })
}

function sortMediasBy (filter) {
  currentPhotographerMedias.sort((a, b) => {
    if (filter === 'filter_popular') return b.likes - a.likes
    if (filter === 'filter_date') return b.date.localeCompare(a.date)
    if (filter === 'filter_title') return a.title.localeCompare(b.title)
  })
  currentFilter = filter
}

function likesUtilities (mediaId) {
  const likeButton = document.querySelector(`#likes--${mediaId}`)
  likeButton.addEventListener('click', () => {
    const currentMediaIndex = currentPhotographerMedias.findIndex((media) => media.id === mediaId)
    const currentMediaCardNode = document.querySelector(`#mediaCard--${mediaId}`)
    const currentMedia = currentPhotographerMedias[currentMediaIndex]
    currentMedia.swapLiked ()
    if (currentMedia.isLiked) {     
      currentPhotographer.addLike ()
      if (currentFilter !== 'filter_popular') return
      if (currentMediaIndex > 0) {
        const previousMedia = currentPhotographerMedias[currentMediaIndex - 1]
        if (previousMedia.likes < currentMedia.likes) {
          swapNodes (currentMediaCardNode, currentMediaCardNode.previousElementSibling)
        }
      }
    } else {
      currentPhotographer.removeLike ()
      if (currentFilter !== 'filter_popular') return
      if (currentMediaIndex < currentPhotographerMedias.length - 1) {
        const nextMedia = currentPhotographerMedias[currentMediaIndex + 1]
        if (nextMedia.likes > currentMedia.likes) {
          swapNodes (currentMediaCardNode, currentMediaCardNode.nextElementSibling)
        }
      }
    }
  })
}

function swapNodes (nodeA, nodeB) {
  sortMediasBy ('filter_popular')
  const parentA = nodeA.parentNode;
  const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

  // Move `nodeA` to before the `nodeB`
  nodeB.parentNode.insertBefore(nodeA, nodeB);

  // Move `nodeB` to before the sibling of `nodeA`
  parentA.insertBefore(nodeB, siblingA);
}

async function init () {
  // Récupère l'id passer en parametre de l'url
  const photographerId = parseInt(new URL(document.location).searchParams.get('id'))
  // Récupère les datas des photographes et des medias
  // eslint-disable-next-line no-undef
  const photographerApi = new PhotographerApi('data/photographers.json')
  const { photographers, media } = await photographerApi.get()
  // Filtre pour obtenir le photographe et les medias liés
  const photographer = photographers.filter(elt => elt.id === photographerId)[0]
  const medias = media.filter(elt => elt.photographerId === photographerId)

  // eslint-disable-next-line no-undef
  currentPhotographer = new PhotographerFactory(photographer)
  // Use some 'hack' to get photographer folder due to lack of consistency in data
  // split(' ') doesn't work with Ellie-Rose => 'Ellie Rose'
  const photographersFolders = {
    243: 'Mimi',
    930: 'Ellie Rose',
    82:  'Tracy',
    527: 'Nabeel',
    925: 'Rhode',
    195: 'Marcel'
  }
  // eslint-disable-next-line no-undef
  currentPhotographerMedias = medias.map(elt => new MediaFactory(elt, photographersFolders[photographerId]))

  // displayData(photographer, medias)
  // console.log(currentPhotographer, currentPhotographerMedias)

  displayPhotographerData ()
  sortMediasBy(currentFilter)
  displayMediasCards ()
  displayPhotographerComplementaryData ()
  modalUtilities ()
  lightboxUtilities ()
  filterUtilities ()
}

init()
