const modal = document.querySelector(".contact_modal");

document.querySelector(".contact_form").addEventListener("click", displayModal);
document.querySelector(".close_form").addEventListener("click", closeModal);
document.querySelector(".send_form").addEventListener("click", (e) => {
    e.preventDefault();
    closeModal();
});


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
