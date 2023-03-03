const selector = document.querySelector(".selectBox_container");

selector.innerHTML = `
        <div class="container_name_selectBox">
          <p>Trier par :</p>
        </div>
        <div id="selectBox">
        <div id="selectBoxVisible">
            <div class="container_arrow_first_choice">
                <button type="button" class="btn-choice" id="first-choice" data-filtre="likes">Popularité</button>
                    <img src="/assets/icons/chevron-up-solid.svg" class="arrow_selection" id="arrow_selection"/> 
            </div>
            <span id="hidden_options" class="hidden_options">
            <button type="button" class="btn-choice border-top" data-filtre="date">Date</button>
            <button type="button" class="btn-choice" data-filtre="title">Titre</button>
            </span>
            </div>
        </div>`;


hiddenOptions = document.getElementById("hidden_options")
hiddenOptions.style.display = "none";
let arrow = document.getElementById("arrow_selection");
let isOpen = false;
let firstOption = document.getElementById("first-choice");
const selectOptions = document.getElementById("OurSelectBox");
const allButtons = selectOptions.querySelectorAll("button");
let firstOptionText = firstOption.textContent;

//Handling opening and closure of the list
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
///////////////////////////////////

let items = document.querySelectorAll('.gallery-item');

// Handling click on first option

//const sortValue = button.dataset.filtre;

document.getElementById("first-choice").addEventListener("click", () => {
  if (isOpen === false) {
    console.log("SELECT FIRST")
    return handleButtonsOptions();
  }
});

function closeSelect() {
  // On ferme le faux select

  hiddenOptions.style.display = "none";

  return (isOpen = false);
}

function handleButtonsOptions() {
  allButtons.forEach((button) => {
    button.onclick = () => {
      console.log('rentre dans handleButtons')
      const buttonText = button.textContent;

      button.innerHTML = firstOption.textContent;
      console.log(firstOptionText)
      firstOption.innerHTML = buttonText;
      return closeSelect()
    }})}
    
/*let isOpen = false;

const selectOptions = document.querySelector("#select-block-options");

let firstButtonText = document.querySelector("#select-first-option-text");

const arrow = document.querySelector(".arrow-down-open");

const optionsButtons = selectOptions.querySelectorAll("button");

const select = document.querySelector(".sort-base");

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