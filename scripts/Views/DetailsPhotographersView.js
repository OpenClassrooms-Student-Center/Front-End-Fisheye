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

  static async selectDropdown(medias, photographer) {
    //menu déroulant trier par
    const dropdownMenu = document.querySelector(".dropdown");

    let sortBy = document.createElement("label");
    sortBy.setAttribute("class", "sort-by");
    sortBy.textContent = "Trier par";
    dropdownMenu.appendChild(sortBy);

    let select = document.createElement("select");

    let optionPop = document.createElement("option");
    optionPop.text = "Popularité";
    optionPop.value = "pop";
    let optionDate = document.createElement("option");
    optionDate.text = "Date";
    optionDate.value = "date";
    let optionTitle = document.createElement("option");
    optionTitle.text = "Titre";
    optionTitle.value = "title";

    select.add(optionPop); //méthode add
    select.add(optionDate);
    select.add(optionTitle);

    select.addEventListener("change", (event) => {
      console.log(event.target.value);

      switch (event.target.value) {
        case "pop":
          medias.sort((a, b) => b.likes - a.likes);
          break; //trier le tableau par les likes >

        case "date":
          medias.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        // console.log(medias);

        case "title":
          medias.sort((a, b) => a.title > b.title); // PB DS LE TRI !!!!!
          console.log();
          break;
      }

      let galeryContainer = document.querySelector(".photograph_medias");
      console.log(medias);
      if (galeryContainer) {
        galeryContainer.innerHTML = "";
      }
      //for (let index = 0; index < galeryContainer.children.length; index++) {
      //console.log(index);
      //galeryContainer.items(index).remove();
      //}
      //console.log("pop");

      this.showListMediasPhotographer(medias, photographer);
    });

    dropdownMenu.appendChild(select);
  }

  static async showListMediasPhotographer(medias, photographer) {
    const mediasSection = document.querySelector(".photograph_medias");
    for (let index = 0; index < medias.length; index++) {
      const enregMedia = medias[index];
      //console.log(enregMedia);
      const pictures = `assets/Sample Photos/${photographer.name}/${enregMedia.image}`;
      const video = `assets/Sample Photos/${photographer.name}/${enregMedia.video}`;
      let lightbox = new Lightbox(medias, photographer.name);

      for (let attributeName in enregMedia) {
        //
        if (attributeName == "image") {
          //
          let newImage = document.createElement("img");
          newImage.setAttribute("src", pictures);
          newImage.setAttribute("class", "picturespage");
          newImage.style = "cursor:pointer";
          newImage.addEventListener("click", () => {
            lightbox.displayLightbox(enregMedia.id);
          });

          //crée l'élement container titre + likes + <3 de la photo // CSS set attributes for all

          let newContainer = document.createElement("div");
          newContainer.appendChild(newImage);
          let newContent = document.createTextNode(enregMedia.title);

          newContainer.appendChild(newContent);

          //crée élément nombre de likes de la photo / CSS

          const likesMedia = document.createElement("p");
          likesMedia.textContent = enregMedia.likes;
          newContainer.appendChild(likesMedia);

          //crée élément coeur de la photo / CSS à faire
          const heart = document.createElement("p");
          heart.innerHTML = '<i class="fas fa-heart"></i>';
          newContainer.appendChild(heart);

          mediasSection.appendChild(newContainer);

          //
          break;
          //
        } else if (attributeName == "video") {
          let newVideo = document.createElement("video");
          newVideo.setAttribute("src", video);
          newVideo.controls = true;
          newVideo.setAttribute("class", "controls");

          let newContainer = document.createElement("a");
          newContainer.addEventListener("click", () => {
            lightbox.displayLightbox(enregMedia.id);
          });
          // créer élément title et likes pour la video??
          newContainer.appendChild(newVideo);
          mediasSection.appendChild(newContainer);
          break;
        }
      }
    }
  }
}
