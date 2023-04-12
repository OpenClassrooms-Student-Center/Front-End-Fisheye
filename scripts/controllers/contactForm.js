const body = document.getElementById('body');
const mainWrapper = document.getElementById('main');
const openModalBtn = document.querySelector('.contact_button');
const modalTitle = document.querySelector('.modal_title');
const closeModalBtn = document.querySelector('.modal_close_btn');
const form = document.querySelector(".form");

function displayModal() {
    const modal = document.querySelector(".contact_modal");
	modal.style.display = "block";
    mainWrapper.setAttribute('aria-hidden', 'true')
    modal.setAttribute('aria-hidden', 'false')
    body.classList.add('no-scroll')

}

function closeModal() {
    const modal = document.querySelector(".contact_modal");
    modal.style.display = "none";
    mainWrapper.setAttribute('aria-hidden', 'false')
    modal.setAttribute('aria-hidden', 'true')
    body.classList.remove('no-scroll')
}