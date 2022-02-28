export function sortBtnFactory() {
    const sortBtn = document.createElement("ul");
    sortBtn.classList.add("sort-btn");

    const selectedContainer = document.createElement("li");
    const selected = document.createElement("button");
    selected.textContent = "Popularité";
    selectedContainer.classList.add("sort-btn__selected");

    selectedContainer.appendChild(selected);

    const icon = document.createElement("i");
    icon.classList.add("sort-btn__icon");

    selected.appendChild(icon);

    selectedContainer.addEventListener("click", openDropdown);

    const option1Container = document.createElement("li");
    const option1 = document.createElement("button");
    option1.textContent = "Date";
    option1Container.classList.add("sort-btn__option");
    option1Container.classList.add("sort-btn__option--hidden");

    option1Container.appendChild(option1);

    const option2Container = document.createElement("li");
    const option2 = document.createElement("button");
    option2.textContent = "Titre";
    option2Container.classList.add("sort-btn__option");
    option2Container.classList.add("sort-btn__option--hidden");

    option2Container.appendChild(option2);

    const options = [selectedContainer, option1Container, option2Container];

    sortBtn.appendChild(selectedContainer);
    sortBtn.appendChild(option1Container);
    sortBtn.appendChild(option2Container);

    function openDropdown() {
        selectedContainer.removeEventListener("click", openDropdown);

        icon.classList.add("sort-btn__icon--alt");
        option1Container.classList.remove("sort-btn__option--hidden");
        option2Container.classList.remove("sort-btn__option--hidden");

        options.forEach((option) => {
            option.addEventListener("click", closeDropdown);
        });
    }

    function closeDropdown(e) {
        options.forEach((option) => {
            option.removeEventListener("click", closeDropdown);
        });

        let filterChoosen = e.target.textContent;

        console.log(filterChoosen);

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

        icon.classList.remove("sort-btn__icon--alt");
        option1Container.classList.add("sort-btn__option--hidden");
        option2Container.classList.add("sort-btn__option--hidden");

        selectedContainer.addEventListener("click", openDropdown);
    }

    return sortBtn;
}
