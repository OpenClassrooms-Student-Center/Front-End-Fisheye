"use_strict";

const dropdownUlElt = document.querySelector(".dropdown-ul");
const dropdownElt = document.querySelector(".dropdown-wrapper");

function openDropdownList() {
    dropdownUlElt.style.opacity = "1";
    filterLabelElt.style.setProperty('--selectdivAfterTransform','rotate(-90deg)');
    dropdownElt.style.borderRadius = "5px 5px 0 0";
}

function closeDropdownList() {  
    dropdownUlElt.style.opacity = "0";
    filterLabelElt.style.setProperty('--selectdivAfterTransform','rotate(90deg)');
    dropdownElt.style.borderRadius = "5px";
}

// open and close filter on keydown "enter" keyborad button
function navigateOnFilterWithKeyboard() {
    let direction = false;

    filterLabelElt.addEventListener("keydown", (e) => {
        if (e.key.toLowerCase() === "enter") {
            if (direction === false) {
                openDropdownList();
                direction = true;
            } else {
                closeDropdownList();
                direction = false;
            }
        }
    });
}

function navigateOnFilterWithMouse() {
    let direction = false;
    
    filterLabelElt.addEventListener("click", () => {
        if (direction === false) {
            openDropdownList();
            direction = true;
        } else {
            closeDropdownList();
            direction = false;
        }
    });
}

navigateOnFilterWithKeyboard();
navigateOnFilterWithMouse();

