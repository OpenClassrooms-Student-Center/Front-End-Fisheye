function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    const modalAttribute = document.querySelector(".modal");
    modalAttribute.setAttribute("aria-modal", "true");
    const main = document.getElementById("main");
    main.setAttribute("aria-modal", "false");
    const close = document.querySelector('.btnClose');
    const form = document.getElementById('formContact');
    modalAttribute.focus();
    close.addEventListener("keydown", (ev) => {
        if(ev.key == "Enter") {
            modal.style.display = "none";  
            main.setAttribute("aria-modal", "true"); 
            modalAttribute.setAttribute("aria-modal", "false");
        }
    })
    form.addEventListener('submit', function(e) { 
        e.preventDefault();
        
        validForm();
    });
}



function closeModal() {
    const modal = document.getElementById("contact_modal");
    const btnModal = document.querySelector(".contact_button");
    const modalAttribute = document.querySelector(".modal");
    const main = document.getElementById("main");
    const body = document.getElementById("body");
    modal.style.display = "none";
    modalAttribute.setAttribute("aria-modal", "false");
    main.setAttribute("aria-modal", "true");
    body.classList.remove("no-scroll");
    btnModal.focus();
}


const validForm = () => {
    const formData = document.querySelectorAll(".formData");
    var formValid = [];
    const mailValid = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;
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

    const success = document.querySelectorAll(".success");
    const firstName = document.getElementById('prenom');
    const lastName = document.getElementById('nom');
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
    
    if(formData.length == success.length){
        formValid.push("Prenom: " + firstName.value);
        formValid.push("Nom: " + lastName.value);
        formValid.push("Email: " + mail.value);
        formValid.push("Message: " + messageForm.value);
        closeModal();
        
        return console.log(formValid);
    } 
}




        

    
            
