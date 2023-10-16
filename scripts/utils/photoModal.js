// Global DOM var
const body = document.body;
const openModalBtn = document.querySelector(".open-modal-btn");
const openPicBtn = document.querySelector(".media-img");
const mainWrapper = document.querySelector(".main-wrapper");
const modal = document.querySelector(".photo_modal");
const modalCloseBtn = document.querySelector(".modal-close-btn");

// Func
export const onOpenModal = () => {
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
openModalBtn ? openModalBtn.addEventListener("click", onOpenModal) : null;
// Event
openPicBtn ? openPicBtn.addEventListener("click", onOpenPic) : null;
// Func
export async function onOpenPic() {
  mainWrapper.setAttribute("aria-hidden", "true");
  modal.setAttribute("aria-hidden", "false");
  body.classList.add("no-scroll");
  modal.style.display = "flex";
  modalCloseBtn.focus();
}

modalCloseBtn.addEventListener("click", onCloseModal);

// Close modal when escape key is pressed
document.addEventListener("keydown", (e) => {
  const keyCode = e.keyCode ? e.keyCode : e.which;

  if (modal.getAttribute("aria-hidden") === "false" && keyCode === 27) {
    onCloseModal();
  }
});
