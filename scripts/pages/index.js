async function getPhotographers() {
  const url = './data/photographers.json'
  let response = await fetch(url)
  console.log(response.url)
  let photographers = await response.json()
  return photographers
}

// getPhotographers()

async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section')

  photographers.forEach(photographer => {
    console.log(photographer)
    const photographerModel = photographerTemplate(photographer)
    const userCardDOM = photographerModel.getUserCardDOM()
    photographersSection.appendChild(userCardDOM)
  })
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers()
  displayData(photographers)
}

init()
