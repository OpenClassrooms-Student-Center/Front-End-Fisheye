
let isOpen = false;

function displayModal() {
  isOpen = true;
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  hiddeBanner();
}

function closeModal() {
  isOpen = false;
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  hiddeBanner();
}

function hiddeBanner() {
  if (isOpen) {
    const banner = document.querySelector(".banner");
    banner.style.display = "none";
  } else {
    const banner = document.querySelector(".banner");
    banner.style.display = "block";
  }
}

