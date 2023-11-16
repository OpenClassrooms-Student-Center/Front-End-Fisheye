function displayModal() {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const id = urlParams.get('id')
  const name = JSON.parse(sessionStorage.getItem(id)).name
  const contactMe = document.querySelector('.contact-me')
  contactMe.innerHTML = `<h2 class="contact-me">Contactez-moi <br>${name}</h2>`
  const modal = document.getElementById('contact-modal')
  modal.style.display = 'block'
}

function closeModal() {
  const modal = document.getElementById('contact-modal')
  modal.style.display = 'none'
}
