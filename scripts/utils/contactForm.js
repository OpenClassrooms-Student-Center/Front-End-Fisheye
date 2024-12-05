export function openModal() {
  const modal = document.getElementById('contact__modal');
    modal.style.display = 'flex';  
}
export function closeModal() {
  const modal = document.querySelector('.modal__form--BtnClose');
    modal.style.display = 'none';
}