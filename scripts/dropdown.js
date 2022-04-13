import GalleryFactory from "./factories/media.js";

export default class DropdownSort {
  Dropdown(data) {
    let sortOpen = document.getElementsByClassName("sort-btn");
    let hiddenSort = document.getElementsByClassName("hidden-sort");
    if (sortOpen) {
      sortOpen[0].addEventListener("click", () => {
        hiddenSort[0].style.display = "block";
        this.sortMedias(data);
      });
    }
  }

  // Trier les médias
  sortMedias(data) {
    let mediaSorted = [];
    const MEDIAS = data.dataMedias;
    let btnSort = document.querySelector(".sort-btn");
    let hiddenSort = document.getElementsByClassName("hidden-sort");
    let sortBtn = document.querySelectorAll(".sort");

    sortBtn.forEach((btn, index) =>
      btn.addEventListener("click", () => {
        hiddenSort[0].style.display = "none";
        if (index == 0) {
          btnSort.innerHTML = `Popularité<i class="fas fa-chevron-down"></i>`;
          // Trier par popularité
          mediaSorted = MEDIAS.sort((a, b) => {
            return b.likes - a.likes;
          });
        } else if (index == 1) {
          btnSort.innerHTML = `Date<i class="fas fa-chevron-down"></i>`;
          // Trier par date
          mediaSorted = MEDIAS.sort((a, b) => {
            return new Date(a.date).valueOf() - new Date(b.date).valueOf();
          });
        } else if (index == 2) {
          btnSort.innerHTML = `Titre<i class="fas fa-chevron-down"></i>`;
          // Trier par titre
          mediaSorted = MEDIAS.sort((a, b) => {
            return a.title.localeCompare(b.title);
          });
        }
        // Affichage des médias triés
        this.displaySort(mediaSorted);
        console.log(mediaSorted);
      })
    );
  }
  // Appel méthode builder() de GalleryFactory()
  displaySort(mediaSorted) {
    document.getElementById("photographer-gallery").innerHTML = null;
    new GalleryFactory().builderGallery(mediaSorted);
  }
}
