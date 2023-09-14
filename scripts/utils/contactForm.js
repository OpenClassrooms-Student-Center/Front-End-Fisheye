const contactModal = document.getElementById("contact_modal");
const form = document.getElementById('contact_form');
const formDatas = document.querySelectorAll('#contact_form .form_data input, #contact_form .form_data textarea');

// Prevent submit and just close modal
form.addEventListener('submit', (e) => {
    e.preventDefault();
    formDatas.forEach(elt => console.log(`${elt.name}: ${elt.value}`))
    closeContactModal();
});
let photographerName = '';

// Add close function on close modal btn
const closeModalBtn = document.querySelector('.contact_me_container img');
closeModalBtn.addEventListener('click', closeContactModal);

/**
 * Show form modal, set photographer name on open and reset data
 */
function openContactModal(photographerData) {
    contactModal.classList.remove('hidden');
    const photographerNameElt = document.querySelector('.modal header > h2');
    photographerNameElt.textContent = photographerData.name;
    const formDatas = document.querySelectorAll('#contact_form .form_data input, #contact_form .form_data textarea');
    formDatas.forEach(field => field.value = '');
}

/**
 * Hide form modal
 */
function closeContactModal() {
    contactModal.classList.toggle('hidden');
}


