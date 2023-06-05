// affiche la div contenant la liste des options , et change le sens de la flèche en fonction
function renderOptionsList() {
  const button = document.querySelector(".sort__button");
  const list = document.querySelector(".sort__options");
  button.addEventListener("click", function() {
    const sort = document.querySelector(".sort__select");
    sort.classList.toggle("sort__select-open");
    if (sort.classList.contains("sort__select-open")) {
      button.setAttribute("aria-expanded", "true");
      sort.querySelector("i").classList.toggle("fa-caret-up");
      sort.querySelector("i").classList.remove("fa-caret-down");
      list.style.display = "block";
    } else {
      button.setAttribute("aria-expanded", "false");
      sort.querySelector("i").classList.toggle("fa-caret-down");
      sort.querySelector("i").classList.remove("fa-caret-up");
      list.style.display = "none";
    }
  })
}

function closeOptionsList() {
  const button = document.querySelector(".sort__button");
  const list = document.querySelector(".sort__options");
  const sort = document.querySelector(".sort__select");
  button.setAttribute("aria-expanded", "false");
  sort.querySelector("i").classList.add("fa-caret-down");
  sort.querySelector("i").classList.remove("fa-caret-up");
  sort.classList.toggle("sort__select-open");
  list.style.display = "none"
}

// au click, donne au bouton la valeur de l'option choisie, et applique display= none sur l'option choisie
function selectOption() {
  const options = document.querySelectorAll(".sort__option");
  const orderBtn = document.querySelector(".sort__button");
  options.forEach(option => {
    option.classList.remove("sort__hide");
    // option.parentElement.style.display = "block";
    option.display = "block";
    option.addEventListener("click", (event) => {

      orderBtn.innerText = event.target.innerText;
      const arrow = document.createElement("i");
      arrow.classList.add("sort__down", "fa-solid", "fa-caret-down");
      orderBtn.appendChild(arrow);

      options.forEach(option => {
        // option.parentElement.style.display = "block";
        option.style.display = "block";
        option.setAttribute("tabindex", "0")
        option.setAttribute("aria-selected", "false");
      })
      option.classList.add("sort__hide");
      option.setAttribute("aria-selected", "true");
      // option.parentElement.style.display = "none";
      // option.parentElement.setAttribute("tabindex", "-1")
      option.setAttribute("tabindex", "-1")
      option.style.display = "none";

      closeOptionsList();
    })
  })
}

export function initOptionsList() {
  renderOptionsList();
  closeOptionsList();
  selectOption();
}
