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

    // incrémentation +1 au tableau this.medias
    for (let index = 0; index < this.medias.length; index++) {
      const enregMedia = this.medias[index];
      const pictures = `assets/Sample Photos/${this.photographer.name}/${enregMedia.image}`;
      const video = `assets/Sample Photos/${this.photographer.name}/${enregMedia.video}`;
      let lightbox = new Lightbox(this.medias, this.photographer.name);

      //si c'est une image :

      for (let attributeName in enregMedia) {
        //
        if (attributeName == "image") {
          //
          let newImage = document.createElement("img");
          newImage.setAttribute("src", pictures);
          newImage.setAttribute("class", "picturesSize");
          newImage.style = "cursor:pointer";
          newImage.addEventListener("click", () => {
            lightbox.displayLightbox(enregMedia.id);
          });

          //crée l'élement newContainer titre + likes + <3 de la photo // CSS set attributes for all

          let newContainer = document.createElement("div");
          newContainer.setAttribute("class", "underpicture");

          //crée element container de tout
          let container = document.createElement("div");
          container.setAttribute("class", "cardSize");
          container.append(newContainer, newImage);

          let newContent = document.createTextNode(enregMedia.title);

          //crée élément nombre de likes de la photo / CSS
          const loveContainer = document.createElement("div");
          loveContainer.setAttribute("class", "likesHeart");

          const likesMedia = document.createElement("p");
          likesMedia.setAttribute("class", "picturesText");
          likesMedia.textContent = enregMedia.likes;
          //likesMedia.textContent = enregMedia.likes;
          //loveContainer.appendChild(likesMedia);

          //crée élément coeur de la photo / CSS à faire
          const heart = document.createElement("p");
          heart.innerHTML = '<i class="fas fa-heart"></i>';
          heart.setAttribute("class", "picturesText");
          //loveContainer.appendChild(heart);
          loveContainer.append(likesMedia, heart);

          loveContainer.addEventListener("click", (event) => {
            //console.log(event.target.parentNode); //p du heart

            likesMedia.textContent = enregMedia.likes += 1;
            this.stickyBar(this.photographer, this.medias);
          });
          newContainer.append(newContent, loveContainer);

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
  stickyBar() {
    console.log(this.photographer);
    let stickBar = document.createElement("aside");
    stickBar.setAttribute("class", "stickyBar");
    document.body.appendChild(stickBar);
    console.log(this.medias);
    let totalLikes = this.calculateTotalLikes();
    let stickyBarTextOne = document.createElement("p");
    stickyBarTextOne.textContent = `${totalLikes} likes`;
    let stickyBarTextTwo = document.createElement("p");
    stickyBarTextTwo.textContent = `${this.photographer.price}€/jour`;

    stickBar.append(stickyBarTextOne, stickyBarTextTwo);
  }
  calculateTotalLikes() {
    let totalLikes = 0;
    console.log(this.medias);
    this.medias.map((element) => {
      totalLikes += element.likes;
      console.log("totalLikes");
    });
    return totalLikes;
  }
}
