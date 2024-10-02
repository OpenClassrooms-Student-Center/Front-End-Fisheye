const firstNameInput = document.getElementById(`firstNameInput`)
const lastNameInput = document.getElementById(`lastNameInput`)
const mailInput = document.getElementById(`mailInput`)
const msgArea = document.getElementById(`msgArea`)
const sendFormBtn = document.getElementById(`sendFormBtn`)

document.addEventListener(`DOMContentLoaded`, function () {
	const modal = document.getElementById(`contact_modal`);
	
	const focusElementsSelector = `button, input, textarea, .modalHeader img`;
	const closeModalBtn = document.querySelector(`.modalHeader img`);

	// ----------------------------------------------------------------//

	function trapFocus(event) {
		const focusableElements = modal.querySelectorAll(focusElementsSelector)
		const firstFocusable = focusableElements[0];
		const lastFocusable = focusableElements[focusableElements.length - 1];

		if (event.key === 'Tab') {
			if (event.shiftKey) {
				if (document.activeElement === firstFocusable) {
					event.preventDefault();
					lastFocusable.focus();
				}
			} else {
				if (document.activeElement === lastFocusable) {
					event.preventDefault();
					firstFocusable.focus();
				}
			}
		}
	}


	window.displayModal = function () {
		modal.style.display = 'block';
		const firstFocusable = modal.querySelector(focusElementsSelector);
		if (firstFocusable) {
			firstFocusable.focus();
		}
		document.addEventListener('keydown', trapFocus);
	};

	window.closeModal = function () {
		modal.style.display = 'none';
		document.removeEventListener('keydown', trapFocus);
	};

	closeModalBtn.addEventListener('keydown', (event) => {
		if (event.key === 'Enter') {
			window.closeModal();
		} else if (event.key === 'Escape') {
			window.closeModal();
		}
	});
});

	
	//--------------------------------------------------------------//

	function checkUserName(userName) {
		let regexNames = new RegExp(
			"^[a-zA-ZÀ-ÖØ-öøç]{2,15}[-]{0,1}[a-zA-ZÀ-ÖØ-öøç]{0,15}$");
		return regexNames.test(userName);
	}

	function checkedUserMail(userMail) {
		let regexMail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,6}$/;
		return regexMail.test(userMail);
	}

	function checkMessageLength(userMsg) {
		let regexMsgLetters = /^[a-zA-ZÀ-ÖØ-öøçéèêëàâîïôùûüÿç\s,.'-:;]{10,1000}$/;
		return regexMsgLetters.test(userMsg);
	}

	//--------------------------------------------------------------------------//

	firstNameInput.addEventListener(`change`, (event) => {
		const userInput = event.target.value;
		console.log(`Prénom: ${userInput}`)
		const nameIsItValid = checkUserName(userInput);
		if (nameIsItValid) {
			firstNameInput.style.background = "green";
			firstNameInput.style.color = "white";
		} else {
			firstNameInput.style.background = "red";
			firstNameInput.style.color = "white";
		}
	});

	lastNameInput.addEventListener(`change`, (event) => {
		const userInput = event.target.value;
		const nameIsItValid = checkUserName(userInput);
		console.log(`Nom: ${userInput}`)
		if (nameIsItValid) {
			lastNameInput.style.background = "green";
			lastNameInput.style.color = "white";
		} else {
			lastNameInput.style.background = "red";
			lastNameInput.style.color = "white";
		}
	});

	mailInput.addEventListener(`change`, (event) => {
		const userInput = event.target.value;
		console.log(`Mail: ${userInput}`)
		const mailIsItValid = checkedUserMail(userInput);

		if (mailIsItValid) {
			mailInput.style.background = "green";
			mailInput.style.color = "white";
		} else {
			mailInput.style.background = "red";
			mailInput.style.color = "white";
		}
	});

	msgArea.addEventListener(`change`, (event) => {
		const userInput = event.target.value;
		console.log(`message: ${userInput}`)
		const msgLenghtIsItValid = checkMessageLength(userInput);
		if (msgLenghtIsItValid) {
			msgArea.style.background = "green";
			msgArea.style.color = "white";
		} else {
			msgArea.style.background = "red";
			msgArea.style.color = "white";
		}
	});

//---------------------------------------------------------------------------------//	

	function checkedValidityOfForm() {
		const isValidFirstName = checkUserName(firstNameInput.value);
		const isValidLastName = checkUserName(lastNameInput.value);
		const isValidMail = checkedUserMail(mailInput.value);
		const isValidMsg = checkMessageLength(msgArea.value);

		if (isValidFirstName && isValidLastName && isValidMail && isValidMsg) {
			lastNameInput.style.background = "green";
			lastNameInput.style.color = "white";
		}
	}


//------------------------------------------------------------------//	
	sendFormBtn.addEventListener(`click`, (event) => {
		event.preventDefault();
		checkedValidityOfForm();
	});

	

