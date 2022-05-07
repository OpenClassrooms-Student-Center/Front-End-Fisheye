async function displayData (photographers) {
  const photographersSection = document.querySelector('.photographer_section')

  photographers.forEach((photographer) => {
    // eslint-disable-next-line no-undef
    const photographerModel = new PhotographerFactory(photographer)
    const userCardDOM = photographerModel.getUserCardDOM()
    photographersSection.appendChild(userCardDOM)
  })
}

async function init () {
  // Récupère les datas des photographes
  // eslint-disable-next-line no-undef
  const photographerApi = new PhotographerApi('data/photographers.json')
  const { photographers } = await photographerApi.get()
  displayData(photographers)
}

init()
