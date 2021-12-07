let params = new URL(document.location).searchParams
const photographerId = params.get('id')

console.log(photographerId)
async function getPhotographerInfos() {
  try {
    const response = await fetch('../data/photographers.json')
    return await response.json()
    console.log(response)
  } catch {
    console.log('erreur de la requête')
  }
}

async function displayPortfolioInfos(photographers) {
  let photographerinfos

  const photographerHeader = document.querySelector('.photograph-header')

  if (photographerId) {
    photographerInfos = photographers.find(
      (photographer) => photographer.id == photographerId,
    )
  } else {
    console.log(
      "Les information sur votre photographe n'ont pas pu être chargé",
    )
  }

  // -- > profil picture
  const picture = `../assets/photographers/${photographerInfos.portrait}`
  const img = document.createElement('img')
  img.setAttribute('src', picture)
  img.setAttribute('alt', `portrait de ${photographerInfos.name}`)

  // --> name
  const h1 = document.createElement('h1')
  h1.textContent = photographerInfos.name

  // -- > location
  const h3 = document.createElement('h3')
  h3.textContent = `${photographerInfos.city}, ${photographerInfos.country}`

  // --> tagline
  const p = document.createElement('p')
  p.textContent = photographerInfos.tagline

  // insert intems in header
  photographerHeader.appendChild(h1)
  photographerHeader.appendChild(h3)
  photographerHeader.appendChild(p)
  photographerHeader.appendChild(img)
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographerInfos()
  displayPortfolioInfos(photographers)
}

init()
