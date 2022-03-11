//fonction pour faire la div filtres
function buildFilters() {
  const phtographGallery = document.querySelector(".gallerie");
  const htmlFilters = `
    <label for="filters"> Trier par </label>
    <select name = "photofilter" id= "filters">
        <option class="popularity" value="popularity">Popularité</option>
        <option class="date" value="date">Date</option>
        <option class="title" value="title">Titre</option>
    </select>`;

  const filters = document.createElement("div");
  filters.classList.add("filtersMenu");
  filters.innerHTML = htmlFilters;
  phtographGallery.append(filters);
  const section = document.createElement("section");
  section.classList.add("pictures");
  phtographGallery.append(section);
}

export { buildFilters };
