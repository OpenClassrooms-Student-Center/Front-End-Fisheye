// Global DOM var
const body = document.body;
const openModalBtn = document.querySelector(".open-modal-btn");
const mainWrapper = document.querySelector(".main-wrapper");
const modal = document.querySelector(".photo_modal");
const modalTitle = document.querySelector(".modal-title");
const modalCloseBtn = document.querySelector(".modal-close-btn");

// Func
const onOpenModal = () => {
  console.log("tst");
  mainWrapper.setAttribute("aria-hidden", "true");
  modal.setAttribute("aria-hidden", "false");
  body.classList.add("no-scroll");
  modal.style.display = "flex";
  modalCloseBtn.focus();
};

const onCloseModal = () => {
  mainWrapper.setAttribute("aria-hidden", "false");
  modal.setAttribute("aria-hidden", "true");
  body.classList.remove("no-scroll");
  modal.style.display = "none";
  openModalBtn.focus();
};

// Event
openModalBtn.addEventListener("click", () => {
  onOpenModal();
});

modalCloseBtn.addEventListener("click", () => {
  onCloseModal();
});

// Close modal when escape key is pressed
document.addEventListener("keydown", (e) => {
  const keyCode = e.keyCode ? e.keyCode : e.which;

  if (modal.getAttribute("aria-hidden") === "false" && keyCode === 27) {
    onCloseModal();
  }
});
