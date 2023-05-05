const modal = document.getElementById("contact_modal");

function displayModal() {
	modal.style.display = "block";
}

function closeModal() {
    // const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

let contact_data = [];

const contactBtn = document.querySelector(".contact_button");
contactBtn.addEventListener("click", displayModal);

const closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", closeModal);

const form = document.querySelector(".form");
let formSubmit = false;
form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const firstName = document.querySelector("#firstname").value;
    const lastName = document.querySelector("#lastname").value;
    const email = document.querySelector("#email").value;
    const message = document.querySelector("#message").value;

    contact_data.push(`prénom: ${firstName}, nom: ${lastName}, email: ${email}, message: ${message}`);
    console.log(contact_data);
    formSubmit = true;
});

function submitForm(){
    if(formSubmit){
        form.reset();
        closeModal();
    }
}
form.addEventListener("submit", submitForm);