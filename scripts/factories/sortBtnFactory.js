export function sortBtnFactory() {
    const sortBtn = document.createElement("ul");
    sortBtn.classList.add("sort-btn");

    const selected = document.createElement("li");
    selected.textContent = "Popularité";
    selected.classList.add("sort-btn__selected");

    const icon = document.createElement("span");
    icon.classList.add("sort-btn__icon");

    selected.appendChild(icon);

    selected.addEventListener("click", openDropdown);

    const option1 = document.createElement("li");
    option1.textContent = "Date";
    option1.classList.add("sort-btn__option");
    option1.classList.add("sort-btn__option--hidden");

    const option2 = document.createElement("li");
    option2.textContent = "Titre";
    option2.classList.add("sort-btn__option");
    option2.classList.add("sort-btn__option--hidden");

    const options = [selected, option1, option2];

    sortBtn.appendChild(selected);
    sortBtn.appendChild(option1);
    sortBtn.appendChild(option2);

    function openDropdown() {
        selected.removeEventListener("click", openDropdown);

        option1.classList.remove("sort-btn__option--hidden");
        option2.classList.remove("sort-btn__option--hidden");

        options.forEach((option) => {
            option.addEventListener("click", closeDropdown);
        });
    }

    function closeDropdown(e) {
        options.forEach((option) => {
            option.removeEventListener("click", closeDropdown);
        });

        let filterChoosen = e.target.textContent;

        if (filterChoosen !== selected.textContent) {
            switch (filterChoosen) {
                case option1.textContent:
                    option1.textContent = selected.textContent;
                    break;
                case option2.textContent:
                    option2.textContent = selected.textContent;
                    break;
                default:
                    break;
            }

            selected.textContent = filterChoosen;
            selected.appendChild(icon);
        }

        option1.classList.add("sort-btn__option--hidden");
        option2.classList.add("sort-btn__option--hidden");

        selected.addEventListener("click", openDropdown);
    }

    return sortBtn;
}
