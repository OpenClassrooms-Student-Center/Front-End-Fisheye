import { sortByLikes, sortByDate, sortByTitle } from '../utils/sortBy';
import * as photographer from '../pages/photographer';

/** GENERATE EVENT FOR SELECT FILTER COMPONENTS AND BEHAVIOR */
export function selectFilterComponent(idURL) {

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
                photographer.initMedia(idURL, sortByDate);
                // End build Medias Data

                break;
            case 'Titre':
                selectFilterButton.innerHTML = "Titre";
                selectFilterSelect1.innerHTML = "Date";
                selectFilterSelect2.innerHTML = "Popularité";


                document.querySelector('.media_section').innerHTML = "";
                // Build Medias Data
                photographer.initMedia(idURL, sortByTitle);
                // End build Medias Data

                break;
            case 'Popularité':
                selectFilterButton.innerHTML = "Popularité";
                selectFilterSelect1.innerHTML = "Date";
                selectFilterSelect2.innerHTML = "Titre";

                document.querySelector('.media_section').innerHTML = "";
                // Build Medias Data
                photographer.initMedia(idURL, sortByLikes);
                // End build Medias Data
                break;
            default:
                console.error("selectedItem not found error about handleFilterAction()");
        }


    };



    selectFilterSelect1.addEventListener("click", handleFilterAction);
    selectFilterSelect2.addEventListener("click", handleFilterAction);
}
/** END GENERATE EVENT FOR SELECT FILTER COMPONETNS AND BEHAVIOR */
