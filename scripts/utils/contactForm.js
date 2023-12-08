const openBtn = document.getElementById("contact_btn");
const closeBtn = document.getElementById("close_btn");

function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

openBtn.addEventListener("click", displayModal);
closeBtn.addEventListener("click", closeModal);
export { displayModal, closeModal };
