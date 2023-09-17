export class Onephotographer {
  async getOnePhotographer() {
    const url = new URLSearchParams(document.location.search);
    const id = parseInt(url.get("id"));

    const response = await fetch("../../data/photographers.json");
    const data = await response.json();
    const photographer = data.photographers.find((onePhotographer) => onePhotographer.id === id);
    console.log(photographer);
    this.insertHeaderPhotographer(photographer);
  }


  insertHeaderPhotographer(photographer) {
    const photographHeader = document.getElementById("photograph-header");
    const { name, portrait, city, country, tagline, } = photographer;

    const picture = `assets/photographers/${portrait}`;
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
}
