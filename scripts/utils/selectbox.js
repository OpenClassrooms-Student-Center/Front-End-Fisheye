const selector = document.querySelector(".selectBox_container");

selector.innerHTML = `
        <div class="container_name_selectBox">
          <p>Trier par :</p>
        </div>
        <div id="selectBox">
        <div id="selectBoxVisible">
            <div class="container_arrow_first_choice">
                <button class="btn-choice" id="first-choice">Popularité</button>
                    <img src="/assets/icons/chevron-up-solid.svg" class="arrow_selection" id="arrow_selection"/> 
            </div>
            <span id="hidden_options" class="hidden_options">
            <button class="btn-choice border-top">Date</button>
            <button class="btn-choice">Titre</button>
            </span>
            </div>
        </div>`;


hiddenOptions = document.getElementById("hidden_options")
hiddenOptions.style.display = "none";
let arrow = document.getElementById("arrow_selection");
let isOpen = false;
    arrow.onclick = function(){
        if(!isOpen){
            hiddenOptions = document.getElementById("hidden_options")
            hiddenOptions.style.display = "block";
            
            isOpen = true;
        } else{
            hiddenOptions = document.getElementById("hidden_options")
            hiddenOptions.style.display = "none";
            
            isOpen = false;
        }
        
    }
/*
let isOpen = false;

const selectOptions = document.querySelector("#select-block-options");

let firstButtonText = document.querySelector("#select-first-option-text");

const arrow = document.querySelector(".arrow-down-open");

const optionsButtons = selectOptions.querySelectorAll("button");

const select = document.querySelector(".sort-base");

document.querySelector("#select-first-option").addEventListener("click", () => {
  arrow.classList.toggle("arrow-down-open");
  if (isOpen === false) {
    // On ouvre le faux select

    selectOptions.style.display = "block";
    select.style.borderRadius = "7px 7px 0 0";

    isOpen = true;

    return handleButtonsOptions();
  }

  if (isOpen === true) {
    return closeSelect();
  }
});

function closeSelect() {
  // On ferme le faux select

  selectOptions.style.display = "none";
  select.style.borderRadius = "7px";

  return (isOpen = false);
}

function handleButtonsOptions() {
  optionsButtons.forEach((button) => {
    button.onclick = () => {

      const buttonText = button.textContent;

      const sortValue = button.dataset.filtre;

      button.innerHTML = firstButtonText.textContent;
      button.dataset.filtre = firstButtonText.dataset.filtre;

      firstButtonText.innerHTML = buttonText;
      firstButtonText.dataset.filtre = sortValue;

      closeSelect();
      //

      let items = document.querySelectorAll('.gallery-item');

      [].slice.call(items).sort(function(a, b) {
          let textA = a.getAttribute('data-'+sortValue);
          let textB = b.getAttribute('data-'+sortValue);
          if(sortValue == 'likes'){
              return (parseInt(textA) < parseInt(textB)) ? -1 : (parseInt(textA) > parseInt(textB)) ? 1 : 0;
          } else {
              return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
          }
  
      }).forEach(function(el) {el.parentNode.appendChild(el)});

    };
  });
}
*/