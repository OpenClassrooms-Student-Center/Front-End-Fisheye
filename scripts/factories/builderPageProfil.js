///creer l'image du photographe
function createHTML(el) {
  //creer l'image du photographe
  const userImg = `
        <img src="./assets/photographers/${el.portrait}"></img>`;

  let image = document.createElement("div");
  image.innerHTML = userImg;
  const photographersHeader = document.querySelector(".photograph-header");
  const contactBtn = document.querySelector(".contact_button");
  photographersHeader.appendChild(image);

  // creer le paragraphe dans le header
  const htmlHeader = `
                  <h2>${el.name}</h2>       
              <div class="photographer-details">
                          <h3>${el.city}, ${el.country}</h3>
                          <h5>${el.tagline}</h5>
                         
              </div>`;
  const article = document.createElement("article");
  article.innerHTML = htmlHeader;
  photographersHeader.insertBefore(article, contactBtn);
}

//fonction pour ajouter des articles avec les images
function buildGallery(el) {
  //const phtographGallery = document.querySelector(".gallerie");
  const htmlInbox = `<a>
       <img src="./assets/photos/${el.image}"></img>
       <div class="photo-details">
            <h3>${el.title} </h3>
            <div class="likes">${el.likes} <i class="fas fa-heart"></i></div>
        </div
   </a>`;

  const article = document.createElement("article");
  article.innerHTML = htmlInbox;
  sectionGallery.appendChild(article);
}
//fonction pour faire la div filtres
function buildFilters() {
  const phtographGallery = document.querySelector(".gallerie");
  const htmlFilters = `
    <label for="filters"> Trier par </label>
    <select name = "photofilter" id= "filters">
        <option value="popularity">Popularité</option>
        <option value="date">Date</option>
        <option value="date">Titre</option>
    </select>`;

  const filters = document.createElement("div");
  filters.classList.add("filtersMenu");
  filters.innerHTML = htmlFilters;
  phtographGallery.append(filters);
  const section = document.createElement("section");
  section.classList.add("pictures");
  phtographGallery.append(section);
}
buildFilters();

//fonction pour l'encart orange avec le nombre de likes et le prix journalier
function buildPrice(el) {
  const prix = document.createElement("div");
  prix.classList.add("priceBox");
  const htmlPrice = `
    <div class="numbersOfLikes">123 <i class="fas fa-heart"></i></div>
    <div class="price">${el.price}€ /jour</div>`;
  prix.innerHTML = htmlPrice;
  main.append(prix);
}
//recuperer elements du dom
const sectionGallery = document.querySelector(".pictures");
const main = document.getElementById("main");

export { createHTML, buildGallery, buildPrice };
