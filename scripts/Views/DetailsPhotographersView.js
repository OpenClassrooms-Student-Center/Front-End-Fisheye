class DetailsPhotographersView {
  static async showDetailsPhotographer(photographer) {
    const photographersSection = document.querySelector(".photograph_header");
    console.log(photographer);
    const picture = `assets/photographers/${photographer.portrait}`;

    let html = `
    
    <div class="photograph-header">
    <div class="photograph-name">
    <h1>${photographer.name}</h1>
    </div>
    <div class="photograph-txt">
      <h2>${photographer.city}, ${photographer.country}</h2>
      <p>${photographer.tagline}</p>
    </div>
</div>

<button class="contact_button" onclick="displayModal()">
Contactez-moi
</button>

<div class="photograph-img">
  <img src="${picture}" class="cardpicture"></img>
</div>  
    `;

    photographersSection.innerHTML = html;
  }
  static async showListMediasPhotographer(medias, photographer) {
    const mediasSection = document.querySelector(".photograph_medias");
    for (let index = 0; index < medias.length; index++) {
      const enregmedia = medias[index];
      console.log(enregmedia.image);
      const pictures = `assets/Sample Photos/${photographer.name}/${enregmedia.image}`;
      const video = `assets/Sample Photos/${photographer.name}/${enregmedia.video}`;
      console.log(video);
      let newImage = document.createElement("img");
      newImage.setAttribute("src", pictures);
      newImage.setAttribute("class", "picturespage");
      mediasSection.appendChild(newImage);
    }
  }
}
