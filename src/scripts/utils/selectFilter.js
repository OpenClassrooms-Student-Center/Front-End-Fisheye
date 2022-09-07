import { displayMedia } from '../data/displayMedia';
import { sortByLikes, sortByDate, sortByTitle } from '../utils/sortBy';


/** GENERATE EVENT FOR SELECT FILTER COMPONENTS AND BEHAVIOR */
export function selectFilterComponent(data, idURL) {

    const selectFilterButton = document.querySelector(".select_filter .select_button"); // Button Select
    const selectFilterSelect1 = document.getElementById("select1"); // First Select (by default Date)
    const selectFilterSelect2 = document.getElementById("select2"); // 2nd Select (by default Titre)


    function handleFilterAction(event) {

        const selectedItem = event.target.innerHTML; // Get innerHTML of selected item


        switch (selectedItem) {
            case 'Date':
                selectFilterButton.innerHTML = "Date";
                selectFilterSelect1.innerHTML = "Popularité";
                selectFilterSelect2.innerHTML = "Titre";

                document.querySelector('.media_section').innerHTML = "";
                // Build Medias Data
                displayMedia(data.sort(sortByDate), ".media_section", idURL);
                // End build Medias Data

                break;
            case 'Titre':
                selectFilterButton.innerHTML = "Titre";
                selectFilterSelect1.innerHTML = "Date";
                selectFilterSelect2.innerHTML = "Popularité";


                document.querySelector('.media_section').innerHTML = "";
                // Build Medias Data
                displayMedia(data.sort(sortByTitle), ".media_section", idURL);
                // End build Medias Data

                break;
            case 'Popularité':
                selectFilterButton.innerHTML = "Popularité";
                selectFilterSelect1.innerHTML = "Date";
                selectFilterSelect2.innerHTML = "Titre";

                document.querySelector('.media_section').innerHTML = "";
                // Build Medias Data
                displayMedia(data.sort(sortByLikes), ".media_section", idURL);
                // End build Medias Data
                break;
            default:
                console.error("selectedItem not found error about handleFilterAction()");
        }


    };



    selectFilterSelect1.addEventListener("click", handleFilterAction)
    selectFilterSelect2.addEventListener("click", handleFilterAction)
}
/** END GENERATE EVENT FOR SELECT FILTER COMPONETNS AND BEHAVIOR */
