function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

function addModalListeners() {
  const openBtn = document.getElementById("contact_btn");
  openBtn.addEventListener("click", displayModal);

  const closeBtn = document.getElementById("close_btn");
  closeBtn.addEventListener("click", closeModal);
}

export { displayModal, closeModal, addModalListeners };
