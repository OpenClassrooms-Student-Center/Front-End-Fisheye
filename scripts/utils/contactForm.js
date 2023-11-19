function displayModal() {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const id = urlParams.get('id')
  const name = JSON.parse(sessionStorage.getItem(id)).name

  const contactMe = document.querySelector('.contact-me')
  contactMe.innerHTML = `Contactez-moi <br>${name}`

  const main = document.querySelector('main')
  const body = document.querySelector('body')
  body.classList.add('no-scroll')
  main.setAttribute('aria-hidden', 'true')

  const closeBtn = document.getElementById('close-modal-btn')
  closeBtn.focus()

  const modal = document.querySelector('.modal')
  modal.classList.replace('closed', 'opened')
  modal.setAttribute('aria-hidden', 'false')
}

function closeModal() {
  const main = document.querySelector('main')
  const body = document.querySelector('body')
  body.classList.remove('no-scroll')
  main.setAttribute('aria-hidden', 'false')

  const modal = document.querySelector('.modal')
  modal.classList.replace('opened', 'closed')
  modal.setAttribute('aria-hidden', 'true')

  const contactBtn = document.querySelector('.contact-button')
  contactBtn.focus()
}
