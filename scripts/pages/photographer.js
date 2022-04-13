let currentPhotographer = null
let currentPhotographerMedias = null

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
    modal.classList.remove('display-none')
    modal.showModal()
  })

  closeModal.addEventListener('click', () => {
    modal.classList.add('display-none')
    modal.close()
  })

  form.addEventListener('submit', (e) => {
    modal.classList.add('display-none')
    // Can use 'form' or 'e.target'
    const formData = new FormData(e.target)
    for (const [key, value] of formData.entries()) {
      console.log((`${key}: ${value}`))
    }
    form.reset()
  })
}

async function displayMediasCards () {
  const mediaSection = document.querySelector('.mediaCards')
  currentPhotographerMedias.forEach(media => {
    const mediaCardDOM = media.getMediaCardDOM()
    mediaSection.appendChild(mediaCardDOM)
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
  console.log(currentPhotographer, currentPhotographerMedias)

  displayPhotographerData ()
  displayMediasCards ()
  displayPhotographerComplementaryData ()
  modalUtilities ()
}

init()
