// Global DOM var
const body = document.body;
const openPicBtn = document.querySelector(".media-img");
const mainWrapper = document.querySelector(".main-wrapper");
const modal = document.querySelector(".photo-modal");
const modalCloseBtn = document.querySelector(".modal-close-btn");
const nextImage = document.querySelector(".next-image");

// Func
export async function onOpenPic() {
  mainWrapper.setAttribute("aria-hidden", "true");
  modal.setAttribute("aria-hidden", "false");
  body.classList.add("no-scroll");
  modal.style.display = "flex";
  modalCloseBtn.focus();
}

export async function onClosePic() {
  console.log(1);
  mainWrapper.setAttribute("aria-hidden", "false");
  modal.setAttribute("aria-hidden", "true");
  body.classList.remove("no-scroll");
  modal.style.display = "none";
}

$(document).on("keydown", (e) => {
  const keyCode = e.keyCode ? e.keyCode : e.which;

  if (modal.getAttribute("aria-hidden") === "false" && keyCode === 27) {
    onClosePic();
  }
});


