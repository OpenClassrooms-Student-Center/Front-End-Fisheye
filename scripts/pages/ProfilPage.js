import { MediaBuilderFactory } from "../factories/MediaBuilderFactory.js";
import { Filters } from "../utils/Filters.js";
///////////////////////////////////////////////
// constuction de la page photographer.js
class ProfilPage {
  constructor(response) {
    this.medias = response.media;
    this.photographers = response.photographers;

    let url = new URL(window.location.href);
    let photographerId = url.searchParams.get("id");

    this.mediaFotographers = new Set();
    this.medias.forEach((media) => {
      if (photographerId == media.photographerId) {
        this.mediaFotographers.add(media);
      }
    });

    this.photographers.forEach((photograph) => {
      if (photographerId == photograph.id) {
        this.photographer = photograph;
      }
    });

    this.likes = 0;
  }

  // initiale tout
  generateAll() {
    this.generateProfilDetail();
    this.generateCarrousel();
    this.generateFooter();
    this.generateLike();
    
  }
  
      
  //////////////////////////////////////////////////
  // construit le header de la page photographer.html
  generateProfilDetail() {
    //get DOM elements
    const photographersHeader = document.querySelector(".photograph-header");
    const contactBtn = document.querySelector(".contact_button");

    let profil = this.photographer;
    //create HTML bloc
    const userImg = `
        <img src="./assets/photographers/${profil.portrait}"></img>`;
    const htmlHeader = `
                    <h2>${profil.name}</h2>       
                <div class="photographer-details">
                            <h3>${profil.city}, ${profil.country}</h3>
                            <h5>${profil.tagline}</h5>
                           
                </div>`;

    //create variables and put HTML inside
    let image = document.createElement("div");
    image.innerHTML = userImg;
    const article = document.createElement("article");
    article.innerHTML = htmlHeader;

    // insert HTML into the page
    photographersHeader.appendChild(image);
    photographersHeader.insertBefore(article, contactBtn);
  }

  ////////////////////////////////////////////
  // construit la gallerie de photos et videos
  generateCarrousel(filter) {
      
    const sectionGallery = document.querySelector(".pictures");
    sectionGallery.innerHTML = "";
    let builder = new MediaBuilderFactory();
    let medias  = this.mediaFotographers;
    let filters = new Filters(medias);
    medias = filters.sortBy(filter)
    
      medias.forEach((media) => {
        builder.build(media);

        this.likes += media.likes;
  })
}

  ////////////////////////////////////////////
  // construit le footer avec le prix et les likes
  generateFooter() {
    let profil = this.photographer;

    const prix = document.createElement("div");
    prix.classList.add("priceBox");
    const htmlPrice = `
        <div class="numbersOfLikes"><span>${this.likes}</span> <i class="fas fa-heart"></i></div>
        <div class="price">${profil.price}€ /jour</div>`;
    prix.innerHTML = htmlPrice;
    main.append(prix);
  }

  generateLike() {
    const likes = document.querySelectorAll(".likes");

    likes.forEach((el) => {
      el.addEventListener("click", (e) => {
        //recup le span nombre
        const numero = el.querySelector(".likes__nbr");
        const coeur = el.querySelector(".fa-heart");
        let footer = document.querySelector(".numbersOfLikes  span");
        let newLikes = parseInt(footer.innerHTML);

        //recup le html existant
        let text = parseInt(numero.innerHTML);

        //remplace le html par un nombre et ajoute 1
        let ajout = text + 1;

        //ajoute une classe
        if (coeur.classList.contains("liked")) {
          coeur.classList.remove("liked");
          numero.innerHTML = ajout - 2;
          newLikes = newLikes - 1;
          footer.innerHTML = newLikes;
          return;
        }
        numero.innerHTML = ajout;
        coeur.classList.add("liked");

        newLikes = newLikes + 1;

        footer.innerHTML = newLikes;

        localStorage.setItem("gcliké", "oui");
      });
    });
  }
}

export { ProfilPage };
