const contactModal = document.getElementById("contact_modal");
const form = document.getElementById('contact_form');
const formDatas = document.querySelectorAll('#contact_form .form-data input, #contact_form .form-data textarea');
const closeModalBtn = document.querySelector('.contact_me_container img');
const headerElt = document.querySelector('header[role=banner]');
const bodyElt = document.querySelector('body');
const focusableContactModalElts = Array.from(contactModal.querySelectorAll('.contact_me_container img, #contact_form .form_data input, #contact_form .form_data textarea, button'));
let photographerName = '';

// Call validate function on submit
form.addEventListener('submit', validate);
 
// Add close function on close modal btn
closeModalBtn.addEventListener('click', (e) => closeContactModal(e));

function validate(event) {
	event.preventDefault();
	
	try {
		const isValid = checkFieldsValidity();
		
		if (isValid) {
			formDatas.forEach(elt => console.log(`${elt.name}: ${elt.value}`))
			closeContactModal(event);
		} else {
			return false;
		}
	} catch (e) {
		console.log(`error`, e);
	}
}

function checkFieldsValidity() {
	let isValid = false;
	const firstnameElt = form.firstname;
	const firstnameValue = firstnameElt.value.trim();
	let isFirstnameValid = /^[a-zA-Z]+[ \-']?[a-zA-Z]+$/.test(firstnameValue) && firstnameValue.length >= 2;
	
	const lastnameElt = form.lastname;
	const lastnameValue = lastnameElt.value.trim();
	let isLastnameValid = /^[a-zA-Z]+[ \-']?[a-zA-Z]+$/.test(lastnameValue) && lastnameValue.length >= 2;
	
	const mailElt = form.mail;
	const mailValue = mailElt.value.trim();
	let isMailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(mailValue);
	
	const messageElt = form.message;
	let isMessageValid = form.message.value.trim() !== '' && messageElt.value.length >= 2;

	if (!isFirstnameValid) {
		handleDataError(firstnameElt.parentElement, 'Le prénom doit faire au moins 2 caractères.');
	} else {
		firstnameElt.parentElement.setAttribute('data-error-visible', false);
		if (!isLastnameValid) {
			handleDataError(lastnameElt.parentElement, 'Le nom doit faire au moins 2 caractères.');
		} else {
			lastnameElt.parentElement.setAttribute('data-error-visible', false);
			if (!isMailValid) {
				handleDataError(mailElt.parentElement, 'Le mail doit être au format XXX@XXX.XX');
			} else {
				mailElt.parentElement.parentElement.setAttribute('data-error-visible', false);
			  if (!isMessageValid) {
					handleDataError(messageElt.parentElement, 'Le message doit faire au moins 2 caractères.');
				} else {
					messageElt.parentElement.setAttribute('data-error-visible', false);
					isValid = true;
				}
			}
		}
	}
	return isValid;
}

/**
 * Handle data-error message and focus
 * @param {*} element form-data element
 * @param {*} errorMsg
 */
function handleDataError(element, errorMsg) {
	element.parentElement.setAttribute('data-error', errorMsg);
	element.setAttribute('aria-errormessage', errorMsg);
	element.parentElement.setAttribute('data-error-visible', true);
	element.setAttribute('aria-invalid', true);

	element.focus();
}

/**
 * Show form modal, set photographer name on open and reset data
 */
function openContactModal(photographerData) {
	trapFocusInContactModal();
	contactModal.classList.remove('hidden');
	handleAria();
	closeModalBtn.focus();
	const photographerNameElt = document.querySelector('.modal header > h2');
	photographerNameElt.textContent = photographerData.name;
	formDatas.forEach(field => field.value = '');
	
  form.querySelectorAll('.form-data').forEach(elt => {
    delete elt.dataset.error;
    delete elt.dataset.errorVisible;
  })
}

/**
 * Hide form modal
*/
function closeContactModal(e) {
	e.preventDefault();
	contactModal.removeEventListener('keydown', handleKeydown);
	contactModal.classList.toggle('hidden');
	handleAria();
	const contactMeButton = document.querySelector('.contact_button');
	contactMeButton.focus();
}

function handleAria() {
	contactModal.setAttribute('aria-hidden', contactModal.getAttribute('aria-hidden') === 'true' ? 'false' : 'true');
	bodyElt.querySelectorAll('not[contact_modal]')
	mainElt.setAttribute('aria-hidden', mainElt.getAttribute('aria-hidden') === 'true' ? 'false' : 'true');
	headerElt.setAttribute('aria-hidden', headerElt.getAttribute('aria-hidden') === 'true' ? 'false' : 'true');
	bodyElt.classList.toggle('no-scroll');
}

function trapFocusInContactModal() {
	contactModal.addEventListener('keydown', handleKeydown);
}

function handleKeydown(e) {
	const keyCode = e.key;
	const firstFocusableElt = focusableContactModalElts[0];
	const lastFocusableElt = focusableContactModalElts[focusableContactModalElts.length - 1];

	if (keyCode === 'Escape' || (document.activeElement === closeModalBtn && keyCode === 'Enter')) {
		closeContactModal(e);
	} else if (keyCode === 'Enter') {
		validate(e);
	} else if (keyCode === 'Tab') {
		if (e.shiftKey) {
			if (document.activeElement === firstFocusableElt) {
				lastFocusableElt.focus();
        e.preventDefault();
      }
		} else {
			if (document.activeElement === lastFocusableElt) {
				firstFocusableElt.focus();
        e.preventDefault();
      }
		}
	}
}
