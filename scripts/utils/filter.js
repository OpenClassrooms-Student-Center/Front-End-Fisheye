import { afficheTotalLikes} from "../utils/likes.js";
import { displayLightbox } from "../utils/lightbox.js";
/**
 * @function openCloseFilterMenu   
 * 
 * Fonction pour ouvrir et fermer le menu de filtre.
 * Cette fonction gère l'affichage du menu déroulant de filtre et met à jour les attributs ARIA pour l'accessibilité.
 */
export function openCloseFilterMenu  ()  {
    const filterMenu = document.querySelector(".filter__Dropdown--Ul");
    const filterMenuButton = document.querySelector(".filter__Dropdown--Btn");
    const filterButtons = document.querySelectorAll(".dropdown__option--btn");
        
    filterMenuButton.addEventListener("click", () => {
        const isExpanded = filterMenuButton.getAttribute("aria-expanded") === "true" || false;
        filterMenuButton.setAttribute("aria-expanded", !isExpanded);
        filterMenu.classList.toggle("curtain__effect");
        document.querySelector(".fa-chevron-up").classList.toggle("rotate");
        const newAriaHiddenValue = filterMenu.classList.contains("curtain__effect") ? "false" : "true";
        filterMenu.setAttribute("aria-hidden", newAriaHiddenValue);
        const newTabIndexValue = filterMenu.classList.contains("curtain__effect") ? "0" : "-1";
        filterButtons.forEach(button => button.setAttribute("tabindex", newTabIndexValue));
    });
};

/**
 * Fonction pour afficher les médias en fonction du filtre sélectionné.
 * Cette fonction met à jour l'affichage des médias en fonction du filtre sélectionné par l'utilisateur.
 * @param {Object} mediasTemplate - L'objet contenant les médias à afficher.
 */
export function displayMediaWithFilter(mediasTemplate) {
    const currentFilter = document.getElementById('Selected__FilterJS');
    const allFilters = Array.from(document.querySelectorAll('.dropdown__option--btn'));
    console.log("currentFilter", currentFilter, "allFilters", allFilters);
    // Trouver le filtre actuellement sélectionné et le masquer
    let filterAlreadySelected = allFilters.find(filter => filter.textContent == currentFilter.textContent);
    console.log("filterAlreadySelected", filterAlreadySelected);
    filterAlreadySelected.style.display = 'none';
    // Ajouter des écouteurs d'événements pour chaque filtre
    allFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Mettre à jour le texte du filtre actuel
            currentFilter.textContent = filter.textContent;
            console.log("currentFilter.textContent", currentFilter.textContent);
            // Afficher l'ancien filtre sélectionné et masquer le nouveau
            if (filterAlreadySelected) filterAlreadySelected.style.display = 'block';            
            filterAlreadySelected = filter;
            filterAlreadySelected.style.display = 'none';
            // Trier et afficher les médias en fonction du filtre sélectionné
            sortByFilter(filter.textContent);
        });
    });
    // Fonction pour trier et afficher les médias en fonction du filtre sélectionné
    /**
     * 
     * @param {*} filterValue 
     */
    function sortByFilter(filterValue) {
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
        
        // Mettre à jour l'affichage des médias
        mediasTemplate.createPhotographerMedia();
        const mediasFiltered = mediasTemplate;
        displayLightbox(mediasFiltered);
        afficheTotalLikes();
        
        // Ajouter une animation aux cartes de médias
        const mediaElements = document.querySelectorAll('.gallery__card');
        mediaElements.forEach((media, index) => {
            setTimeout(() => {
                media.classList.add('animeCard');
            }, 100 * index);
        });
    }
}