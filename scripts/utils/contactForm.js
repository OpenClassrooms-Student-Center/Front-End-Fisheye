function displayModal() {
    const firstNameElement = document.querySelector("#firstName");
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
    firstNameElement.focus();
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true")
}

function sendMessage(event) {

    event.preventDefault();
  
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const email = document.querySelector("#email").value;
    const message = document.querySelector("#message").value;
    const form = document.querySelector("#contact_form");



    if(checkInputs(firstName, lastName, email, message)) {
        closeModal();
        form.reset();
    }

   const dataToSend = {
       firstName,
       lastName,
       email,
       message
   }

   console.log(dataToSend);
}

function checkInputs(firstName, lastName, email, message) {

    let isFormValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const firstNameError = document.getElementById("firstNameError");
    const lastNameError = document.getElementById("lastNameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");



    if (firstName === "") {
        firstNameError.style.display = "block";
        isFormValid = false;
    } else {
        firstNameError.style.display = "none";
    }
    
    if (lastName === "") {
        lastNameError.style.display = "block";
        isFormValid = false;
    } else {
        lastNameError.style.display = "none";
    }
    
    if (email === "" || !emailRegex.test(email)) {
        emailError.style.display = "block";
        isFormValid = false;
    } else {
        emailError.style.display = "none";
    }
    
    if (message === "") {
        messageError.style.display = "block";
        isFormValid = false;
    } else {
        messageError.style.display = "none";
    }

    return isFormValid;

}