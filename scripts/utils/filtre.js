/**
 * Listens to the filter and returns its value.
 */
document.getElementById('filtres').addEventListener('change', function () {
    typeSort = this.value;
    sortData();
    displayImage(data);
});


async function sortData() {
    if (typeSort === "pop") {
        data[1].sort(function (a, b) { return a.likes - b.likes });
        data[1].reverse();
    } else if (typeSort === "date") {
        data[1].sort(function (a, b) { return a.date - b.date });
        data[1].reverse();
    } else if (typeSort === "titre") {
        data[1].sort((a, b) => a.title.localeCompare(b.title))
    }
}


function initFiltre() {
    //On insert la liste des options dans les div

    swapTextDiv();
    let customSelect = document.getElementById("custom-select");
    let arrow = document.getElementById("arrow");

    customSelect.addEventListener("click", function () {
        arrow.classList.add("active");
        customSelect.classList.add("custom-select_active");
    });


}


document.getElementById("opt_2").addEventListener("click", function () {
    let optionChoice = document.getElementById("opt_2").innerText;
    let index = options.indexOf(optionChoice);
    swapOptions(index)
    swapTextDiv();


    let sel = document.getElementById("custom-select");
    console.log(sel.classList);
    sel.classList.remove("custom-select_active");
    console.log("apres: " + sel.classList);
});

function swapOptions(index) {
    let tmp = options[index];
    options[index] = options[0];
    options[0] = tmp;
}

function swapTextDiv() {
    let divOptionsTitre = document.getElementsByClassName("custom-select__name");

    for (let i = 0; i < options.length; i++) {
        divOptionsTitre[i].textContent = options[i];
    }
}

function closeFiltre() {

}