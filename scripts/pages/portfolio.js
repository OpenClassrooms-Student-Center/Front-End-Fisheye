//Mettre le code JavaScript lié à la page photographer.html
function portfolioTemplate(id) {
  const data = JSON.parse(sessionStorage.getItem(id))

  const contactBtn = document.querySelector('.contact-button').cloneNode(true)
  console.log(contactBtn)
  const photographHeader = document.querySelector('.photograph-header')
  photographHeader.innerHTML = ''
  photographHeader.innerHTML = `
  <div class="photographer_profile">
    <h2 class='photographer-name'>${data.name}</h2>
    <p class="location">${data.city}, ${data.country}</p>
    <p class="tag">${data.tagline}</p>
  </div>
  ${contactBtn.outerHTML}
  <img class='profile-picture' src="assets/photographers/${data.portrait}" alt="${data.name}">
  `

  console.log(photographHeader)
}

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get('id')
portfolioTemplate(id)
