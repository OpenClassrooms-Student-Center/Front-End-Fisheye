async function displayPhotographerData (photographer) {
  const photographerSection = document.querySelector('.photographHeader')

  // eslint-disable-next-line no-undef
  const photographerModel = new PhotographerFactory(photographer)
  const photographerHeaderDOM = photographerModel.getPhotographerHeaderDOM()
  photographerSection.appendChild(photographerHeaderDOM)
}

async function displayMediasCards (medias, photographerFolder) {
  const mediaSection = document.querySelector('.mediaCards')
  medias.forEach(media => {
    // eslint-disable-next-line no-undef
    const mediaModel = new MediaFactory(media, photographerFolder)
    const mediaCardDOM = mediaModel.getMediaCardDOM()
    mediaSection.appendChild(mediaCardDOM)
  });
}

async function displayPhotographerComplementaryData (photographer, medias) {
  const photographerComplementarySection = document.querySelector('.photographComplementary')

  // eslint-disable-next-line no-undef
  const photographerModel = new PhotographerFactory(photographer)
  medias.forEach(media => {
    photographerModel.totalLikes += media.likes
  });
  const photographerComplementaryDOM = photographerModel.getPhotographerComplementaryDOM()
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

  // displayData(photographer, medias)
  // console.log(photographer, medias)

  displayPhotographerData (photographer)

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
  displayMediasCards (medias, photographersFolders[photographerId])

  displayPhotographerComplementaryData (photographer, medias)
}

init()
