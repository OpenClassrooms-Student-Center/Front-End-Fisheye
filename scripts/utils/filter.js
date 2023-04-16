"use_strict";

function turnChevronDropdownList() {
    let direction = false;
    
    filterLabelElt.addEventListener("click", () => {
        
        if (direction == false) {
            filterLabelElt.style.setProperty('--selectdivAfterTransform','rotate(-90deg)');
            dropdownElt.style.borderRadius = "5px 5px 0 0";
            direction = true;
        } else {
            filterLabelElt.style.setProperty('--selectdivAfterTransform','rotate(90deg)');
            dropdownElt.style.borderRadius = "5px";
            direction = false;
        }
    });
}

turnChevronDropdownList();