class DetailsPhotographersView {
  static async showDetailsPhotographer(photographer) {
    const photographersSection = document.querySelector(".photograph_header");

    let html = `
    
    <div class="photograph-info">
    <div class=photograph-name>
    <h1>${photographer.name}</h1>
    </div>
    <div class="photograph-txt">
      <h2>${photographer.city}, ${photographer.country}</h2>
      <p>${photographer.tagline}</p>
    </div>
</div>
  <button class="contact_button">Contactez-moi</button>
  <div class="photograph-img">
    <img src="${photographer.picture}" alt="${photographer.alt}"/>
  </div>  
    `;

    photographersSection.innerHTML = html;

    /*photographers.forEach((photographer) => {
      const photographerModel = photographerPageFactory(photograph);
      const userBigCardDOM = photographerModel.getPhotographerCardDOM();
      photographersSection.appendChild(userBigCardDOM);
    });*/
  }
}
