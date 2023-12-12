/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// DOM Elements
const validationMessage = document.getElementById('validation-message')
const formBod = document.querySelector('.form-body')
const modal = document.querySelector('#contact_modal')

$(document).on('keydown', (e) => {
  const keyCode = e.keyCode ? e.keyCode : e.which

  if (modal.getAttribute('aria-hidden') === 'false' && keyCode === 27) {
    console.log(123)
    closeModal()
  }
})

export function displayModal () {
  const modal = document.getElementById('contact_modal')
  modal.style.display = 'block'
}

export function closeModal () {
  const modal = document.getElementById('contact_modal')
  modal.style.display = 'none'
}

export function closePhotoModal () {
  const modal = document.getElementById('modal-wrapper')
  modal.style.display = 'none'
}

// display validation message
function displayValidationMessage () {
  validationMessage.style.display = 'flex'
  validationMessage.textContent = 'Merci! Votre réservation a été reçue.'
}

// hide modal form content
function hideContent () {
  formBod.style.display = 'none'
}

function validate (event) {
  // paramètre event
  try {
    event.preventDefault() // prevents page refreshing when form is filled
    let isValid = true // set status to valid to prevent errors showing before form is sent

    const fields = [
      // array of objects with form fields to be validated
      { id: 'first', name: 'prénom' },
      { id: 'second', name: 'nom' },
      { id: 'third', name: 'email' },
      { id: 'fourth', name: 'message' }
    ]

    fields.forEach((field) => {
      // loop through each field id, trimmed spaces and error message
      const baliseField = document.getElementById(field.id)
      const valeurField = baliseField.value.trim()
      const errorElement = document.getElementById('error-' + field.id)
      errorElement.textContent = ''

      if (valeurField === '') {
        // condition and outcome message
        console.log(`Le champ ${field.name} est vide`)
        isValid = false
        errorElement.textContent = `Le champ ${field.name} est vide`
      }
    })

    // --------------------------------------------------------------------------

    // query selector to initiate the "error-message" class
    const errorMessageSpans = document.querySelectorAll('.error-message')

    // apply red text color to all error message spans and hide if no error
    let hasError = false
    errorMessageSpans.forEach((span) => {
      if (span.innerHTML.trim() !== '') {
        span.style.color = 'red'
        hasError = true
      } else {
        span.style.backgroundColor = ''
      }
    })
    // --------------------------------------------------------------------------

    // if all validation conditions are met then logic is applied
    if (isValid) {
      fields.forEach((field) => {
        const errorElement = document.getElementById('error-' + field.id)
        errorElement.textContent = '' // no error message is displayed
      })
      hideContent() // content is hidden
      console.log('All fields are filled, message sent')
      displayValidationMessage() // validation message is displayed
      setTimeout(() => {
        closeModal()
      }, 5000)
    }
  } catch (error) {
    // else error messages are displayed
    console.error(error.message)
  }
}

const form = document.querySelector('form') // initialize form
form.addEventListener('submit', validate) // sumbit form if valide
