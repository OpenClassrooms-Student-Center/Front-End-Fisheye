// DOM elements
const modal = document.querySelector(".contact_modal");

document.querySelector(".contact_button").addEventListener("click", displayModal);
document.querySelector("#close_form").addEventListener("click", closeModal);

function displayModal() {
    modal.classList.add('fade-out');
	modal.style.display = "block";
    window.setTimeout(() => {
        modal.classList.remove('fade-out');
      }, 50)
}

function closeModal() {
    modal.classList.add('fade-out');
    window.setTimeout(() => {
        modal.style.display = "none";
        modal.classList.remove('fade-out');
      }, 300)
}
