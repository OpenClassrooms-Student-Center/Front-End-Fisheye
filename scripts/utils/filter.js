import { afficheTotalLikes} from "../utils/likes.js";
//import { displayLightbox } from "../utils/lightbox.js";

export const openCloseFilterMenu = () => {
    const filterMenu = document.querySelector(".filter__Dropdown--Ul");
    const filterMenuButton = document.querySelector(".filter__Dropdown--Btn");
    const filterButtons = document.querySelectorAll(".dropdown__option--btn");

    filterMenuButton.addEventListener("click", () => {
        const isExpanded = filterMenuButton.getAttribute("aria-expanded") === "true" || false;
        filterMenuButton.setAttribute("aria-expanded", !isExpanded);
        filterMenu.classList.toggle("curtain_effect");
        document.querySelector(".fa-chevron-up").classList.toggle("rotate");

        const newAriaHiddenValue = filterMenu.classList.contains("curtain_effect") ? "false" : "true";
        filterMenu.setAttribute("aria-hidden", newAriaHiddenValue);

        const newTabIndexValue = filterMenu.classList.contains("curtain_effect") ? "0" : "-1";
        filterButtons.forEach(button => button.setAttribute("tabindex", newTabIndexValue));
    });
};

export const displayMediaWithFilter = mediasTemplate => {
    const currentFilter = document.getElementById('filter__Dropdown--BtnTitle');
    const allFilters = Array.from(document.querySelectorAll('.dropdown__option--btn'))

    let filterAlreadySelected = allFilters.find(filter => filter.textContent == currentFilter.textContent);
    filterAlreadySelected.style.display = 'none';

    allFilters.forEach(filter => {
        filter.addEventListener('click', () => {

            currentFilter.textContent = filter.textContent;
            if (filterAlreadySelected) filterAlreadySelected.style.display = 'block';

            filterAlreadySelected = filter;
            filterAlreadySelected.style.display = 'none';

            sortByFilter(filter.textContent);
        })
    });

    const sortByFilter = filterValue => {
        switch (filterValue) {
            case 'Titre':
                mediasTemplate.medias.sort((a, b) => a._title.localeCompare(b._title));
                break;
            case 'Popularité':
                mediasTemplate.medias.sort((a, b) => b._likes - a._likes);
                break;
            case 'Date':
                mediasTemplate.medias.sort((a, b) => new Date(b._date) - new Date(a._date));
                break;
        }
        
        mediasTemplate.createPhotographerMedia();
        const mediasFiltered = mediasTemplate;
        displayLightbox(mediasFiltered);
        afficheTotalLikes();
 
        const mediaElements = document.querySelectorAll('.gallery__card');
        console.log("mediaElements", mediaElements)
        mediaElements.forEach((media, index) => {
            setTimeout(() => {
                media.classList.add('animeCard');
            }, 100 * index);
        });   
    };
};