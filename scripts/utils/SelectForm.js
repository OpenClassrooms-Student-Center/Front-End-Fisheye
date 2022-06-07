const dropdownToggle = document.querySelector(".dropdown-toggle");
const dropdownList = document.querySelector(".dropdown-list");
const dropdownOptions = document.querySelectorAll(".dropdown-list li");

//Evenement click du select
dropdownToggle.addEventListener("click", () => {
  handleDropdownToggle(true);
});

// Afficher les options du select
function handleDropdownToggle(show) {
  let expanded =
    dropdownToggle.getAttribute("aria-expanded") == "true" ? "false" : "true";
  dropdownToggle.setAttribute("aria-expanded", expanded);
  dropdownList.style.display = show ? "flex" : "none";
}

// Choix d'une option du select
function handleOption(option) {
  if (option.getAttribute("aria-selected") == "false") {
    dropdownList.insertBefore(option, dropdownList.firstChild);
    sortMedia(option.dataset.name);
    dropdownToggle.innerText = option.innerText;
    let oldActiveOption = document.querySelector(
      `.dropdown-list li[aria-selected="true"]`
    );
    oldActiveOption.setAttribute("aria-selected", "false");
  }
  option.setAttribute("aria-selected", "true");
  handleDropdownToggle(false);
}

//Evenement click option select
dropdownOptions.forEach((option) => {
  option.addEventListener("click", () => handleOption(option));
  option.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
      handleOption(option);
    }
  });
});

setFocusOnlyInContainer(
  ".dropdown-list",
  ".dropdown-list li:first-child",
  ".dropdown-list li:last-child"
);
