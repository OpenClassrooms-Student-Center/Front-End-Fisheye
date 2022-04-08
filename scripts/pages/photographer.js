async function displayPhotographerData (photographer) {
  const photographerSection = document.querySelector('.photographHeader')

  // eslint-disable-next-line no-undef
  const photographerModel = photographerFactory(photographer)
  const photographerInfoDOM = photographerModel.getPhotographerInfoDOM()
  const photographerContactDOM = photographerModel.getPhotographerContactDOM()
  const photographerImgDOM = photographerModel.getPhotographerImgDOM()
  photographerSection.appendChild(photographerInfoDOM)
  photographerSection.appendChild(photographerContactDOM)
  photographerSection.appendChild(photographerImgDOM)
}

async function init () {
  // Récupère l'id passer en parametre de l'url
  const photographerId = parseInt(new URL(document.location).searchParams.get('id'))
  // Récupère les datas des photographes et des medias
  // eslint-disable-next-line no-undef
  const { photographers, media } = await getPhotographers()
  // Filtre pour obtenir le photographe et les medias liés
  const photographer = photographers.filter(elt => elt.id === photographerId)[0]
  const medias = media.filter(elt => elt.photographerId === photographerId)
  // displayData(photographer, medias)
  console.log(photographer, medias)

  displayPhotographerData (photographer)
}

init()
