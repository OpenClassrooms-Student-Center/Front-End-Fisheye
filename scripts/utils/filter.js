"use_strict";

const dropdownUlElt = document.querySelector(".dropdown-ul");
const dropdownElt = document.querySelector(".dropdown-wrapper");

// open and close filter on keydown "enter" keyborad button
function navigateOnFilterWithKeyboard() {
    let direction = false;

    dropdownElt.addEventListener("keydown", (e) => {
        if (e.key.toLowerCase() === "enter") {
            if (direction === false) {
                dropdownUlElt.style.opacity = "1";
                filterLabelElt.style.setProperty('--selectdivAfterTransform','rotate(-90deg)');
                dropdownElt.style.borderRadius = "5px 5px 0 0";
                direction = true;
            } else {
                dropdownUlElt.style.opacity = "0";
                filterLabelElt.style.setProperty('--selectdivAfterTransform','rotate(90deg)');
                dropdownElt.style.borderRadius = "5px";
                direction = false;
            }
        }
    });
}

function turnChevronDropdownList() {
    let direction = false;
    
    filterLabelElt.addEventListener("click", () => {
        if (direction === false) {
            dropdownUlElt.style.opacity = "1";
            filterLabelElt.style.setProperty('--selectdivAfterTransform','rotate(-90deg)');
            dropdownElt.style.borderRadius = "5px 5px 0 0";
            direction = true;
        } else {
            dropdownUlElt.style.opacity = "0";
            filterLabelElt.style.setProperty('--selectdivAfterTransform','rotate(90deg)');
            dropdownElt.style.borderRadius = "5px";
            direction = false;
        }
    });
}

turnChevronDropdownList();
navigateOnFilterWithKeyboard();