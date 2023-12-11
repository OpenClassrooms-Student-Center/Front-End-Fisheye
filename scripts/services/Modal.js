import { getPhotographer } from '../Repository/Repository.js'
import getIdFromUrl from '../utils/urlHelpers.js'

class Modal {

	constructor(modal, modalOverlay, form, contactBtn, submitBtn, closeBtn) {

		this.modal = document.querySelector(modal)
		this.modalOverlay = document.querySelector(modalOverlay)
		this.form = document.querySelector(form)
		this.contactBtn = document.querySelector(contactBtn)
		this.submitBtn = document.querySelector(submitBtn)
		this.closeBtn = document.querySelector(closeBtn)
	}

	openModal() {
		this.contactBtn.addEventListener('click', () => {
			this.modal.style.display = 'block'
			this.modalOverlay.style.display = 'block'

			const mainElements = document.querySelectorAll('main, main *')
			if (mainElements) {
				mainElements.forEach(element => {
					element.setAttribute('aria-hidden', 'true')
					element.setAttribute('tabindex', '-1')
				})
			}

			const headerElement = document.querySelector('header')
			if (headerElement) {
				headerElement.setAttribute('aria-hidden', 'true')
				headerElement.setAttribute('tabindex', '-1')
			}
		})
	}

	closeModal() {
		this.modal.style.display = 'none'
		this.modalOverlay.style.display = 'none'

		const mainElements = document.querySelectorAll('main, main *')
		mainElements.forEach(element => {
			element.removeAttribute('aria-hidden')
		})

		const headerElement = document.querySelector('header')
		if (headerElement) {
			headerElement.removeAttribute('aria-hidden')
		}
	}

	closeModalWithClick() {
		this.closeBtn.addEventListener('click', () => {
			this.closeModal()
		})
	}

	closeModalWithEsc() {
		document.addEventListener('keydown', (event) => {
			if (event.key === 'Escape') {
				this.closeModal()
			}
		})
	}

	closeModalWithEnter() {
		this.closeBtn.addEventListener('keydown', (event) => {
			if (event.key === 'Enter') {
				this.closeModal()
			}
		})
	}

	getFormValues() {
		const formValues = {}
		for (let i = 0; i < this.form.elements.length; i++) {
			const element = this.form.elements[i]
			formValues[element.name] = element.value
		}
		return formValues
	}

	getLogForm() {
		this.form.addEventListener('submit', (event) => {
			event.preventDefault()
			console.log(this.getFormValues())
			this.modal.style.display = 'none'
			this.modalOverlay.style.display = 'none'
		})
	}

	init() {
		this.openModal()
		this.closeModalWithClick()
		this.closeModalWithEnter()
		this.closeModalWithEsc()
		this.getFormValues()
		this.getLogForm()
	}
}

const newModal = new Modal('#contact_modal', '#contact_modal_overlay', 'form', '.contact_button', '.submit_button', '#close_button')
newModal.init()

async function addNameToModal() {
	const photographer = await getPhotographer(getIdFromUrl())
	const nameAdded = photographer.name
	const nameInModal = document.querySelector('.name_in_modal')
	nameInModal.setAttribute('alt', `${nameAdded}`)
	nameInModal.textContent = 'Contactez-moi ' + `${nameAdded}`
	nameInModal.setAttribute('aria-label', 'Formulaire de contact pour' + `${nameAdded}`)
}

addNameToModal()
