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
  const modal = document.querySelector('.modal')
  modal.classList.replace('closed', 'opened')
  modal.setAttribute('aria-hidden', 'false')
  closeBtn.focus()
  const envoyer = document.querySelector('form button')

  document.addEventListener('keydown', e => {
    const key = e.key
    if (modal.getAttribute('aria-hidden') == 'false' && key === 'Escape') closeModal()
  })

  envoyer.addEventListener('click', e => {
    e.preventDefault()
    const inputs = document.querySelectorAll('input')
    const prenom = inputs[0].value
    const nom = inputs[1].value
    const email = inputs[2].value
    const message = document.querySelector('textarea').value
    console.log(`Nom: ${nom} \nPrénom: ${prenom} \nEmail: ${email} \nMessage: ${message}`)
    closeModal()
  })
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
