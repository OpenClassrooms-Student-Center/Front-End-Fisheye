import { mediasFactory } from "./medias.js"
export class Mediaphotographer {
  constructor() {
    this.totalLikes = 0; // Variable pour suivre le total des likes
  }
  async getOnePhotographer() {
    const url = new URLSearchParams(document.location.search);
    const id = parseInt(url.get("id"));

    const response = await fetch("../../data/photographers.json");
    const data = await response.json();
    const photographer = data.photographers.find(
      (onePhotographer) => onePhotographer.id === id
    );
    const allMedias = data.media.filter(
      (dataMediaPhotographer) => dataMediaPhotographer.photographerId === id
    );
    for (const media of allMedias) {
      this.insertMedias(media,photographer);
      this.totalLikes += media.likes
    }
    // Mettez à jour l'élément HTML avec le total des likes
    const totalLikesElement = document.getElementById("total-likes");
    if (totalLikesElement) {
      totalLikesElement.innerText = this.totalLikes.toString();
    }
    const section = document.getElementById("containerCards");
    const select = document.querySelector("#orderSelect");
    let filteredMedia = [...allMedias];
    select.addEventListener("change", async () => {
      const selectedOption = select.options[select.selectedIndex];
      const selectedValue = selectedOption.value;
      if (selectedValue === "popularity") {
        section.innerHTML = "";
        filteredMedia = [...allMedias].sort((a, b) => b.likes - a.likes);
        filteredMedia.forEach((element) => {
          this.insertMedias(element, photographer);
        });
      } else if (selectedValue === "date") {
        section.innerHTML = "";
        filteredMedia = [...allMedias].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        filteredMedia.forEach((element) => {
          this.insertMedias(element, photographer);
        });
      } else if (selectedValue === "title") {
        section.innerHTML = "";
        filteredMedia = [...allMedias].sort((a, b) => {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return 0;
        });
        filteredMedia.forEach((element) => {
          this.insertMedias(element, photographer);
        });
      }
    });
    this.insertHeaderPhotographer(photographer);
  }

  insertHeaderPhotographer(photographer) {
    const photographHeader = document.getElementById("photograph-header");
    const h2Name = document.getElementById("h2Name");
    const { name, portrait, city, country, tagline, price } = photographer;
    h2Name.innerText = `Contactez-moi ${name}`;
    const spanPrice = document.querySelector("#price");
    spanPrice.innerText = `${price}€ / jour`;
    const picture = `../../assets/photographers/${portrait}`;
    photographHeader.innerHTML = `
            <div>
             <h1 aria-label="${name}">${name}</h1>
             <span aria-label="${city}, ${country}">${city}, ${country}</span>
             <p aria-label="${tagline}">${tagline}</p>
            </div>
            <div>
               <button aria-label="Contact me" class="contact_button" onClick="displayModal()" aria-label="Bouton d'ouverture du modal de contact">Contactez-moi</button>
            </div>
            <img src="${picture}" alt="${name}" aria-label="${name}">
            `;
  }
  insertMedias(media, photographer) {
   
    const mediaModel = mediasFactory(media, photographer);
    mediaModel.getMediasCardDOM();
   
  }
}