export  function openModal() {
  const modal = document.getElementById('contact__modal');
  const mainContainer = document.getElementById('main');
  const btn = document.getElementById('openModalJS');
  btn.addEventListener('click', () => {
    modal.style.display = 'flex';
    mainContainer.style.display = 'none';
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