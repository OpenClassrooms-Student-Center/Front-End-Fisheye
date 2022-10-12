let btnContact = document.querySelectorAll(".contact_button");

btnContact.forEach(function (btn) {
  btn.addEventListener("click", displayModal);
});

let closeBtnModal = document.querySelector(".closeContactModal");

closeBtnModal.addEventListener("click", closeModal);

function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}
