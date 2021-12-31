function displayModal() {
  const modal = document.getElementById("contact_modal");
  const body = document.querySelector("body");
  body.classList.add("noscroll");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  const body = document.querySelector("body");
  body.classList.remove("noscroll");
  modal.style.display = "none";
}
