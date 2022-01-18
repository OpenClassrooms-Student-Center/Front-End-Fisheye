class DetailsPhotographersView {
  constructor(photographer, medias) {
    this.photographer = photographer;
    this.medias = medias;
  }

  async showDetailsPhotographer() {
    this.stickyBar(this.photographer, this.medias);

    const photographersSection = document.querySelector(".photograph_header");
    console.log(this.photographer);
    const picture = `assets/photographers/${this.photographer.portrait}`;

    let html = `
    
    <div class="photograph-header">
    <div class="photograph-name">
    <h1>${this.photographer.name}</h1>
    </div>
    <div class="photograph-txt">
      <h2>${this.photographer.city}, ${this.photographer.country}</h2>
      <p>${this.photographer.tagline}</p>
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

  selectDropdown() {
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
          function compare(a, b) {
            if (a.title < b.title) {
              return -1;
            }

            if (a.title > b.title) {
              return 1;
            }
            return 0;
          }

          medias.sort(compare);

          break;
      }

      let galeryContainer = document.querySelector(".photograph_medias");

      if (galeryContainer) {
        galeryContainer.innerHTML = "";
      }

      this.showListMediasPhotographer();
    });

    dropdownMenu.appendChild(select);
  }

  showListMediasPhotographer() {
    const mediasSection = document.querySelector(".photograph_medias");

    // boucle sur le tableau this.medias

    for (let index = 0; index < this.medias.length; index++) {
      const enregMedia = this.medias[index];
      const pictures = `assets/Sample Photos/${this.photographer.name}/${enregMedia.image}`;
      const video = `assets/Sample Photos/${this.photographer.name}/${enregMedia.video}`;
      let lightbox = new Lightbox(this.medias, this.photographer.name);

      //si c'est une image :
      for (let attributeName in enregMedia) {
        if (attributeName == "image") {
          let newImage = document.createElement("img");
          newImage.setAttribute("src", pictures);
          newImage.setAttribute("class", "picturesSize");
          newImage.style = "cursor:pointer";
          newImage.addEventListener("click", () => {
            lightbox.displayLightbox(enregMedia.id);
          });

          //crée l'élement pictureLegend titre + likes + <3 de la photo

          let pictureLegend = document.createElement("div");
          pictureLegend.setAttribute("class", "underpicture");

          //crée le titre
          let pictureTitle = document.createTextNode(enregMedia.title);

          //crée élément nombre de likes de la photo / CSS
          const likesMedia = document.createElement("p");
          likesMedia.setAttribute("class", "picturesText");
          likesMedia.textContent = enregMedia.likes;

          //crée élément coeur de la photo / CSS à faire
          const heart = document.createElement("p");
          heart.innerHTML = '<i class="fas fa-heart"></i>';
          heart.setAttribute("class", "picturesText");

          //le loveContainer - au clic, met à jour le like et le total like de la stickybar
          const loveContainer = document.createElement("div");
          loveContainer.setAttribute("class", "likesHeart");
          loveContainer.append(likesMedia, heart);
          loveContainer.addEventListener("click", () => {
            likesMedia.textContent = enregMedia.likes += 1;
            // cursor main au survol? CSS hover
            this.stickyBar(this.photographer, this.medias);
          });
          pictureLegend.append(pictureTitle, loveContainer);

          //crée element container de tout
          let container = document.createElement("div");
          container.setAttribute("class", "cardSize");
          container.append(pictureLegend, newImage);

          //mediasSection.appendChild(newImage);

          mediasSection.appendChild(container);

          //
          break;
          //
        } else if (attributeName == "video") {
          let newVideo = document.createElement("video");
          newVideo.setAttribute("src", video);
          newVideo.controls = true;
          newVideo.setAttribute("class", "controls");

          let videoLegend = document.createElement("a");
          videoLegend.addEventListener("click", () => {
            lightbox.displayLightbox(enregMedia.id);
          });
          // créer élément title et likes pour la video??
          videoLegend.appendChild(newVideo);
          mediasSection.appendChild(videoLegend);
          break;
        }
      }
    }
  }
  stickyBar() {
    let stickBar = document.createElement("aside");
    stickBar.setAttribute("class", "stickyBar");
    document.body.appendChild(stickBar);

    let totalLikes = this.calculateTotalLikes();
    let stickyBarTextOne = document.createElement("p");
    stickyBarTextOne.innerHTML = `${totalLikes} <i class="fas fa-heart"></i>`;
    let stickyBarTextTwo = document.createElement("p");
    stickyBarTextTwo.textContent = `${this.photographer.price}€/jour`;

    stickBar.append(stickyBarTextOne, stickyBarTextTwo);
  }
  calculateTotalLikes() {
    let totalLikes = 0;
    this.medias.map((element) => {
      totalLikes += element.likes;
      //console.log("totalLikes");
    });
    return totalLikes;
  }
}
