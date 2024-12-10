export  function openModal(photographer) {
  const modal = document.getElementById('contact__modal');
  const mainContainer = document.getElementById('main');
  const btn = document.getElementById('openModalJS');
  const closeBtn = document.getElementById('closeModalJS');
  const photographerModalName = document.querySelector('.modal__form--photographerName') 
  btn.addEventListener('click', () => {
    modal.style.display = 'flex';
    photographerModalName.textContent = photographer._name;
    mainContainer.style.display = 'none';
    closeBtn.focus();
  });
}
export  function closeModal() {
  const modal = document.getElementById('contact__modal');
  const mainContainer = document.getElementById('main');
  const btn = document.getElementById('closeModalJS');
  btn.addEventListener('click', () => {
    modal.style.display = 'none';
    mainContainer.style.display = 'block';
  });
}