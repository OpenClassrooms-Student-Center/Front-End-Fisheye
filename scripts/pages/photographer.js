// Global variables

let currentPhotographer = null
let currentPhotographerMedias = null
let lightboxCurrentMediaId = null
let currentFilter = 'filter_popular'
// Code for action (enter (keyCode = 13) espace (keyCode = 32))
const codeAction = ['Enter', 'Space']

// Global selectors

const lightbox = document.querySelector('#lightbox')
const closeLightbox = document.querySelector('.close_lightbox')
const lightboxMediaLeftContent = document.querySelector('.lightbox__content--leftColumn')
const filterSelectedElement = document.querySelector('.photographMedias__filtersMenu--selected')
const filterListElement = document.querySelector('.photographMedias__filtersMenu--list')
const filterItemsElement = document.querySelectorAll('.photographMedias__filtersMenu--list > li')

// Display functions

function displayPhotographerData () {
  const photographerSection = document.querySelector('.photographHeader')
  const photographerHeaderDOM = currentPhotographer.getPhotographerHeaderDOM()
  photographerSection.appendChild(photographerHeaderDOM)
}

function displayPhotographerComplementaryData () {
  const photographerComplementarySection = document.querySelector('.photographComplementary')
  // Count total media likes and assign to photographer
  let totalPhotographerLikes = 0
  currentPhotographerMedias.forEach(media => {
    totalPhotographerLikes += media.likes
  });
  currentPhotographer.totalLikes = totalPhotographerLikes
  const photographerComplementaryDOM = currentPhotographer.getPhotographerComplementaryDOM()
  photographerComplementarySection.appendChild(photographerComplementaryDOM)
}

function displayMediasCards () {
  const mediaSection = document.querySelector('.mediaCards')
  mediaSection.textContent = ''
  currentPhotographerMedias.forEach(media => {
    const mediaCardDOM = media.getMediaCardDOM()
    mediaSection.appendChild(mediaCardDOM)
    likesUtilities (media.id)
    addEventListenersToCard (mediaCardDOM)
  });
}

function displayMediaInLightbox (media) {
  const lightboxMediaContent = document.querySelector('.lightbox__content--middleColumn')
  if (document.body.contains(lightboxMediaContent)) lightboxMediaContent.remove()
  const mediaDOMElement = media.getMediaLightboxDOM()
  lightboxMediaLeftContent.after(mediaDOMElement)
  lightboxCurrentMediaId = media.id
}

function displayMediaInLightboxFromId (mediaId) {
  const selectedMedia = currentPhotographerMedias.filter((media) => media.id === mediaId)[0]
  displayMediaInLightbox(selectedMedia)
  lightbox.showModal()
}

// Utilities functions //

function addEventListenersToCard (card) {
  card.addEventListener('click', (e) => {
    if (!e.target.classList.contains('fa-heart') && !e.target.classList.contains('mediaCard__infos--title')) displayMediaInLightboxFromId (Number(e.target.id))
  })
  // Add eventListener on enter/space to display media
  card.addEventListener('keydown', (e) => {
    const stringId = e.target.id
    const mediaId = Number(stringId.replace('mediaCard--', ''))
    if (codeAction.includes(e.code) && !e.target.classList.contains('fa-heart') && !e.target.classList.contains('mediaCard__infos--title')) displayMediaInLightboxFromId (mediaId)
  })
}

function insertPhotographerModalDOM () {
  const mainSection = document.querySelector('main')
  const modalDOM = currentPhotographer.getPhotographerModalDOM()
  mainSection.after(modalDOM)
}

function modalUtilities () {
  insertPhotographerModalDOM ()
  const modal = document.querySelector('#contact_modal')
  const openModal = document.querySelector('#modal_contact_button')
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
    // Using reduce with object decomposition
    console.log(
      [...formData.entries()].reduce(
        (previousValue, currentValue) => {
          previousValue[currentValue[0]] = currentValue[1]
          return previousValue
        },
        {}
      )
    );
    form.reset()
  })
}

function lightboxUtilities () {
  const nextSlideButton = document.querySelector('.lightbox__rightButton')
  const previousSlideButton = document.querySelector('.lightbox__leftButton')
  const lightbox = document.querySelector('#lightbox')

  const displayNewMedia = (button, newMediaIndex) => {
    let media = currentPhotographerMedias[newMediaIndex]
    // Display new item
    displayMediaInLightbox(media)
    // Define current item
    lightboxCurrentMediaId = media.id
    // Focus
    button.focus()
  }
  
  const nextSlide = () => {
    // Check if current item is last and define next item
    const lighboxCurrentMediaIndex = currentPhotographerMedias.findIndex((media) => media.id === lightboxCurrentMediaId)
    let nextMediaIndex
    if (lighboxCurrentMediaIndex === currentPhotographerMedias.length - 1) {
      nextMediaIndex = 0
    } else {
      nextMediaIndex = lighboxCurrentMediaIndex + 1
    }
    displayNewMedia (nextSlideButton, nextMediaIndex)
  }

  const previousSlide = () => {
    // Check if current item is first and define next item
    const lighboxCurrentMediaIndex = currentPhotographerMedias.findIndex((media) => media.id === lightboxCurrentMediaId)
    let nextMediaIndex
    if (lighboxCurrentMediaIndex === 0) {
      nextMediaIndex = currentPhotographerMedias.length - 1
    } else {
      nextMediaIndex = lighboxCurrentMediaIndex - 1
    }
    displayNewMedia (previousSlideButton, nextMediaIndex)
  }

  nextSlideButton.addEventListener('click', nextSlide)
  previousSlideButton.addEventListener('click', previousSlide)
  nextSlideButton.addEventListener('keydown', e => {
    if (codeAction.includes(e.code)) nextSlide ()
  })
  previousSlideButton.addEventListener('keydown', e => {
    if (codeAction.includes(e.code)) previousSlide ()
  })
  lightbox.addEventListener('keydown', e => {
    if (lightbox.hasAttribute('open')) {
      if (e.code === 'ArrowLeft') previousSlide ()
      if (e.code === 'ArrowRight') nextSlide ()
    }
  })
  closeLightbox.addEventListener('click', () => {
    lightbox.close()
  })
  closeLightbox.addEventListener('keydown', (e) => {
    if (codeAction.includes(e.code)) {
      lightbox.close()
    }
  })
}

function filterUtilities () {
  filterItemsElement.forEach(element => {
    element.addEventListener('click', (e) => {
      selectFilter (e)
    })
    element.addEventListener('keydown', (e) => {
      if (codeAction.includes(e.code)) {
        e.preventDefault()
        selectFilter (e)
      }
    })
    element.addEventListener('focus', (e) => {
      filterSelectedElement.setAttribute('aria-activedescendant', e.target.id)
    })
  })
  filterSelectedElement.addEventListener('click', () => {
    filterToggleDisplay ()
  })
  document.addEventListener('click', (e) => {
    // If already display and click outside (not on list or button) just close
    if (filterSelectedElement.getAttribute('aria-expanded') === 'true' && !(e.target.getAttribute('role') === 'listbox') && !(e.target.getAttribute('id') === 'buttonFilter')) {
      filterToggleDisplay ()
    }
  })
  document.addEventListener('keydown', (e) => {
    // If already display and press escape just close
    if (filterSelectedElement.getAttribute('aria-expanded') === 'true') {
      if (e.code === 'Escape') {
        filterToggleDisplay ()
      }
    }
  })
}

function selectFilter (event) {
  let currentFilterElement = event.target
  sortMediasBy (currentFilterElement.id)
  // Adding icone
  filterSelectedElement.innerHTML = `${currentFilterElement.textContent}<i class="fa-solid fa-chevron-down"></i>`
  // Remove all sibbling aria-selected attribut
  filterItemsElement.forEach(element => element.removeAttribute('aria-selected'))
  // Add aria-selected on current element
  currentFilterElement.setAttribute('aria-selected', true)
  filterToggleDisplay ()
  displayMediasCards ()
  filterSelectedElement.focus()
}

function filterToggleDisplay () {
  filterSelectedElement.classList.toggle('displayNone')
  filterListElement.classList.toggle('displayNone')
  filterSelectedElement.setAttribute(
    'aria-expanded',
    // Get opposite value (true === false => false || false === false => true)
    filterSelectedElement.getAttribute('aria-expanded') === 'false'
  )
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
    swapMediaLike (mediaId)
  })
  likeButton.addEventListener('keydown', e => {
    const keyCode = e.code
    if (codeAction.includes(keyCode)) swapMediaLike (mediaId)
  })
}

function swapMediaLike (mediaId) {
  const currentMediaIndex = currentPhotographerMedias.findIndex((media) => media.id === mediaId)
  const currentMediaCardNode = document.querySelector(`#mediaCard--${mediaId}`)
  const currentMedia = currentPhotographerMedias[currentMediaIndex]
  currentMedia.swapLiked ()
  if (currentMedia.isLiked) {     
    currentPhotographer.addLike ()
    if (currentFilter !== 'filter_popular') return
    // If first element, no need to swap it will keep first
    if (currentMediaIndex > 0) {
      const previousMedia = currentPhotographerMedias[currentMediaIndex - 1]
      if (previousMedia.likes < currentMedia.likes) {
        swapNodes (currentMediaCardNode, currentMediaCardNode.previousElementSibling)
      }
    }
  } else {
    currentPhotographer.removeLike ()
    if (currentFilter !== 'filter_popular') return
    // If last element, no need to swap it will keep last
    if (currentMediaIndex < currentPhotographerMedias.length - 1) {
      const nextMedia = currentPhotographerMedias[currentMediaIndex + 1]
      if (nextMedia.likes > currentMedia.likes) {
        swapNodes (currentMediaCardNode, currentMediaCardNode.nextElementSibling)
      }
    }
  }
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
  // Get id from URL
  const photographerId = parseInt(new URL(document.location).searchParams.get('id'))
  // Get photographers and medias
  // eslint-disable-next-line no-undef
  const photographerApi = new PhotographerApi('data/photographers.json')
  const { photographers, media } = await photographerApi.get()
  // Filter to get the currentPhotographer and his medias
  const photographer = photographers.filter(elt => elt.id === photographerId)[0]
  const medias = media.filter(elt => elt.photographerId === photographerId)

  // eslint-disable-next-line no-undef
  currentPhotographer = new PhotographerFactory(photographer)
  // Use some 'hack' to get photographer folder due to lack of consistency in data
  // split(' ') doesn't work with 'Ellie-Rose' => 'Ellie Rose' may convert '-' into space to get it work need more feedback from back team
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

  displayPhotographerData ()
  sortMediasBy(currentFilter)
  displayMediasCards ()
  displayPhotographerComplementaryData ()
  modalUtilities ()
  lightboxUtilities ()
  filterUtilities ()
}

init()
