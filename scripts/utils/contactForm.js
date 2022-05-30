const modal = document.getElementById("contact_modal");
function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

const body = document.body;
window.addEventListener("click", function (event) {
    if (event.target == body ) {
      closeModal();
    }
  });

function getData(event){
    event.preventDefault();
    var firstName = document.getElementById('firstName');
    var lastName = document.getElementById('lastName');
    var emailName = document.getElementById('email');
    var message = document.getElementById('message');

    console.log('Prénom: ', firstName.value);
    console.log('Nom: ', lastName.value);
    console.log('Email: ', emailName.value);
    console.log('Message: ', message.value);
    closeModal();
};

console.log('contactForm.js loaded')
// let getUrlMessage = new URL(document.location).searchParams;
// let validationMessageUrl = getUrlMessage.get('message=')

//   if (validationMessageUrl == validationMessageUrl){
//     alert('merci pour votre message')
//   }