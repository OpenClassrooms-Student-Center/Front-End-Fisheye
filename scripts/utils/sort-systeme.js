const sortMediaMenu = document.querySelector(".sort-medias");
const openIcon = document.querySelector(".open-icon");
const closeIcon = document.querySelector(".close-icon");

let sortedBy = null;

const options = Array.from(document.querySelectorAll(".sort-option"));
options.forEach((option) => {
  option.addEventListener("click", () => {
    sortedBy = option.textContent;
    option.classList.add("active");
    console.log("sorted by :", sortedBy);
    closeSelect();
    const unActiveOptions = options.filter(
      (opt) => opt.textContent !== option.textContent
    );
    unActiveOptions.forEach((option) => option.classList.remove("active"));
  });
});

openIcon.addEventListener("click", () => openSelect());

closeIcon.addEventListener("click", () => closeSelect());

function openSelect() {
  options.forEach((option) => option.classList.add("active"));
  sortMediaMenu.classList.add("opened");
  openIcon.classList.add("hide");
  closeIcon.classList.remove("hide");
}

function closeSelect() {
  sortMediaMenu.classList.remove("opened");
  openIcon.classList.remove("hide");
  closeIcon.classList.add("hide");
}
