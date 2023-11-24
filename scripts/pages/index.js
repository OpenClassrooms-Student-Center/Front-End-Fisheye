async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers()
  displayData(photographers)
}

async function getPhotographers() {
  const url = './data/photographers.json'
  let response = await fetch(url)
  let photographers = await response.json()
  return photographers
}

async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section')
  photographers.forEach(photographer => {
    sessionStorage.setItem(photographer.id, JSON.stringify(photographer))
    const photographerModel = photographersTemplate(photographer)
    const photographerCard = photographerModel.createDOM()
    photographersSection.appendChild(photographerCard)
  })
}

init()
