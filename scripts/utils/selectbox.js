// Selected Box
// Le source est une adaptation de:
// https://www.w3schools.com/howto/howto_custom_select.asp
// A l'origine capable de gérer plusieurs select-box en parallèle
// Ici on ne gère que le tri de nos medias

/**
 * 
 * @param {*} medias : la liste des medias
 */
function SortBoxManagement(medias){
    const mediasList = new MediasList(medias)
    var j, lOptions, selElmnt, aBtn, bList, cOption;
    let checkInterval
    /* Look for element with the class "custom-select": */
    const selectBox = document.querySelector(".custom-select");
    selElmnt = selectBox.getElementsByTagName("select")[0];
    lOptions = selElmnt.length;
    /* For each element, create a new button that will act as the selected item: */
    aBtn = document.createElement("button");
    aBtn.setAttribute("class", "select-selected hover_css");
    selElmnt.selectedIndex = 0;
    aBtn.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    selectBox.appendChild(aBtn);
    /* For each element, create a new DIV that will contain the option list: */
    bList = document.createElement("DIV");
    bList.setAttribute("class", "select-items select-hide");
    for (j = 0; j < lOptions; j++) {
        /* For each option in the original select element,
        create a new button that will act as an option item: */
        cOption = document.createElement("button");
        cOption.setAttribute("class", "select-item hover_css");
        cOption.innerHTML = selElmnt.options[j].innerHTML;
        cOption.addEventListener("click", function(e) {
            /* When an item is clicked, update the original select box,
            and the selected item: */
            
            var y, i, k, s, h, sl, yl;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            sl = s.length;
            h = this.parentNode.previousSibling;
            for (i = 0; i < sl; i++) {
                if (s.options[i].innerHTML == this.innerHTML) {
                    s.selectedIndex = i;
                    h.innerHTML = this.innerHTML;
                    y = this.parentNode.getElementsByClassName("same-as-selected");
                    yl = y.length;
                    for (k = 0; k < yl; k++) {
                        y[k].setAttribute("class", "select-item hover_css")
                    }
                    this.setAttribute("class", "same-as-selected select-item hover_css");
                    // On fait le tri maintenant
                    mediasList.sortAndRender(h.innerHTML)
                    break;
                }
            }
            h.click();
        });
        bList.appendChild(cOption);
    }
    selectBox.appendChild(bList);
    aBtn.addEventListener("click", function(e) {
        /* When the select box is clicked, close any other select boxes,
        and open/close the current select box: */
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
        // check each second if the focus is outside the select list box
        checkInterval = setInterval(CheckIfSelectHasFocus,1000)
    });

    function closeAllSelect(elmnt) {
        var selItems,ySelected;
        // Dans le cas où on a lancé la surveillance sur la select box, on arrête cette surveillance
        if(checkInterval)
            clearInterval(checkInterval)

        selItems = document.querySelector(".select-items");
        ySelected = document.querySelector(".select-selected");
        selItems.classList.add("select-hide");
        ySelected.classList.remove("select-arrow-active");
    }

    // Check if the focus is outside the select box. If yes, close the select list box
    function CheckIfSelectHasFocus(){
        if(document.activeElement.className === undefined){
            closeAllSelect()
            return
        }
        if(!document.activeElement.className.includes("select")){
            closeAllSelect()
        }
    }

    /* If the user clicks anywhere outside the select box,
    then close all select boxes: */
        document.addEventListener("click", closeAllSelect);
}

