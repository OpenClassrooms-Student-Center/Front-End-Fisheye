let currentPhotographer = null
let currentPhotographerMedias = null
let lighboxCurrentMediaId = null

async function displayPhotographerData () {
  const photographerSection = document.querySelector('.photographHeader')

  const photographerHeaderDOM = currentPhotographer.getPhotographerHeaderDOM()
  photographerSection.appendChild(photographerHeaderDOM)
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
    for (const [key, value] of formData.entries()) {
      console.log((`${key}: ${value}`))
    }
    form.reset()
  })
}

async function lightboxUtilities () {
  const lightbox = document.querySelector('#lightbox')
  const openLightboxs = document.querySelectorAll('.open_lightbox')
  const closeLightbox = document.querySelector('.close_lightbox')
  const lightboxMediaContent = document.querySelector('.lightbox__content--middleColumn')

  openLightboxs.forEach((openLightbox) => {
    openLightbox.addEventListener('click', (e) => {
      lighboxCurrentMediaId = Number(e.target.id)
      const selectedMedia = currentPhotographerMedias.filter((media) => media.id === lighboxCurrentMediaId)[0]
      lightboxMediaContent.textContent = ''
      lightboxMediaContent.appendChild(selectedMedia.getMediaLightboxDOM())
      lightbox.showModal()
    })
  })
  
  closeLightbox.addEventListener('click', () => {
    lightbox.close()
  })

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
    lightboxMediaContent.textContent = ''
    lightboxMediaContent.appendChild(nextMedia.getMediaLightboxDOM())

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
    lightboxMediaContent.textContent = ''
    lightboxMediaContent.appendChild(nextMedia.getMediaLightboxDOM())

    // Define current item
    lighboxCurrentMediaId = nextMedia.id
  })
}

async function displayMediasCards () {
  const mediaSection = document.querySelector('.mediaCards')
  currentPhotographerMedias.forEach(media => {
    const mediaCardDOM = media.getMediaCardDOM()
    mediaSection.appendChild(mediaCardDOM)

    // Like management
    let likeButton = document.querySelector(`#likes--${media.id}`)
    likeButton.addEventListener('click', () => {
      let totalMediaLikesElement = document.querySelector(`#totalMedialikes--${media.id}`)
      let totalPhotographerLikesElement = document.querySelector(`#photographComplementary__totalLikes`)
      let totalMediaLikes = totalMediaLikesElement.firstChild.nodeValue
      let totalPhotographerLikes = totalPhotographerLikesElement.firstChild.nodeValue
      if (likeButton.classList.contains('fa-solid')) {     
        likeButton.classList.remove('fa-solid')
        likeButton.classList.add('fa-regular')
        totalMediaLikes--
        totalPhotographerLikes--
        totalMediaLikesElement.textContent = totalMediaLikes
        totalPhotographerLikesElement.textContent = totalPhotographerLikes
      } else {
        likeButton.classList.add('fa-solid')
        likeButton.classList.remove('fa-regular')
        totalMediaLikes++
        totalPhotographerLikes++
        totalMediaLikesElement.textContent = totalMediaLikes
        totalPhotographerLikesElement.textContent = totalPhotographerLikes
      }
      
    })
  });

}

async function displayPhotographerComplementaryData () {
  const photographerComplementarySection = document.querySelector('.photographComplementary')

  currentPhotographerMedias.forEach(media => {
    currentPhotographer.totalLikes += media.likes
  });
  const photographerComplementaryDOM = currentPhotographer.getPhotographerComplementaryDOM()
  photographerComplementarySection.appendChild(photographerComplementaryDOM)
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
  displayMediasCards ()
  displayPhotographerComplementaryData ()
  modalUtilities ()
  lightboxUtilities ()
}

init()
