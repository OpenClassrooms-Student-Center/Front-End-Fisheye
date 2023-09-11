const contactModal = document.getElementById("contact_modal");
const form = document.getElementById('contact_form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    closeContactModal();
});
let photographerName = '';

const closeModalBtn = document.querySelector('.contact_me_container img');
closeModalBtn.addEventListener('click', closeContactModal);

function openContactModal(photographerData) {
    contactModal.classList.remove('hidden');
    const photographerNameElt = document.querySelector('.modal header > h2');
    photographerNameElt.textContent = photographerData.name;
    const formDatas = document.querySelectorAll('#contact_form .form_data input, #contact_form .form_data textarea');
    formDatas.forEach(field => field.value = '');
}

function closeContactModal() {
    contactModal.classList.toggle('hidden');
}


