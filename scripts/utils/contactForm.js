function displayModal() {
    const modal = document.getElementById("contact_modal");
    const modalAttribute = document.querySelector(".modal");
    const main = document.getElementById("main");
	modal.style.display = "block";
    modalAttribute.setAttribute("aria-hidden", "false");
    main.setAttribute("aria-hidden", "true");
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    const modalAttribute = document.querySelector(".modal");
    const main = document.getElementById("main");
    modal.style.display = "none";
    modalAttribute.setAttribute("aria-hidden", "true");
    main.setAttribute("aria-hidden", "false");
}

const form = document.getElementById('formContact');
var formData = document.querySelectorAll(".formData");
const mailValid = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;

form.addEventListener('submit', function(e) {
    e.preventDefault();

    validData();
});

const setError = (element, message) => {
    const formData = element.parentElement;
    const errorDisplay = formData.querySelector('.errorMessage');

    errorDisplay.innerHTML = message;
    formData.classList.add("error");
    formData.classList.remove("success");
}

const setSuccess = (element) => {
    const formData = element.parentElement;
    const errorDisplay = formData.querySelector('.errorMessage');

    errorDisplay.innerHTML = "";
    formData.classList.add("success");
    formData.classList.remove("error");
}

const validData = () => {
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const mail = document.getElementById('email');
    const messageForm = document.getElementById('message');

    if(firstName.value.trim() == "") {
        setError(firstName, "Saisissez votre prénom");
    } else {
        setSuccess(firstName);
    }
    if(lastName.value.trim() == "") {
        setError(lastName, "Saisissez votre Nom");
    } else {
         setSuccess(lastName);
    }
    if(mail.value.trim() == "") {
        setError(mail, "Saisissez une adresse mail");
    } else if(mailValid.test(mail.value) == false) {
        setError(mail, "Saisissez une adresse mail valide");
    } else {
        setSuccess(mail);
    }
    if(messageForm.value.trim() == "") {
        setError(messageForm, "Saisissez un message")
    } else if( messageForm.value.trim().length < 10) {
        setError(messageForm, "Saisissez un message de plus de 10 caractères");
    } else {
        setSuccess(messageForm);
    }   
}

