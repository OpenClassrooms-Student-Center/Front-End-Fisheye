//DOM elements
const contactBtn = document.querySelector('.contact_button');
const closeBtn = document.querySelector('#contact_modal img');


contactBtn.addEventListener( 'click' , displayModal);
closeBtn.addEventListener( 'click' , closeModal);
function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "flex";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

export { displayModal }
