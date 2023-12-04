// Global DOM var
const body = document.body;
const mainWrapper = document.querySelector(".main-wrapper");
const modal = document.querySelector(".photo-modal");
const modalCloseBtn = document.querySelector(".modal-close-btn");

$(document).on("keydown", (e) => {
  const keyCode = e.keyCode ? e.keyCode : e.which;

  if (modal.getAttribute("aria-hidden") === "false" && keyCode === 27) {
    onClosePic();
  }
});

// Func
export async function onOpenPic() {
  mainWrapper.setAttribute("aria-hidden", "true");
  modal.setAttribute("aria-hidden", "false");
  body.classList.add("no-scroll");
  modal.style.display = "flex";
  modalCloseBtn.focus();
}

export async function onClosePic() {
  mainWrapper.setAttribute("aria-hidden", "false");
  modal.setAttribute("aria-hidden", "true");
  body.classList.remove("no-scroll");
  modal.style.display = "none";
}
