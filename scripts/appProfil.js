import { ApiProvider } from "./factories/ApiProvider.js";
import { buildFilters } from "./factories/buildFilters.js";
//import { closeLightbox } from "./utils/lightbox.js";
// import { addOneLike} from "./utils/likes.js"
////////////////////////////////////////

//va chercher les données du json dans la class ApiProvider
new ApiProvider()
  .getPhotographers()

  .then(function (apiResult) {
    return apiResult.json();
  })
  .then(function (response) {
    let page = new ProfilPage(response);
    page.generateAll();
    // console.dir(page);
    // console.dir(new ProfilPage(response));
  });
//////////////////////////////////////////////
//affiche le nombre de media image et video
class MediaBuilderFactory {
  build(media) {
    if (media.image) {
      const sectionGallery = document.querySelector(".pictures");
      const htmlInbox = `<a>
       <img src="./assets/photos/${media.image}" class="active"></img>
       <div class="photo-details">
            <h3>${media.title} </h3>
            <div class="likes"><span class="likes__nbr">${media.likes}</span><i class="fas fa-heart"></i></div>
        </div
   </a>`;

      const article = document.createElement("article");
      article.innerHTML = htmlInbox;
      sectionGallery.appendChild(article);
    }
    if (media.video) {
      console.log("une video");
    }
  }
}
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
    console.dir(this);
    this.generateProfilDetail();
    this.generateCarrousel();
    this.generateFooter();
    this.generateLightbox();
    this.generateLike();
    this.addOneLike();
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
  generateCarrousel() {
    let builder = new MediaBuilderFactory();

    this.mediaFotographers.forEach((media) => {
      builder.build(media);

      this.likes += media.likes;
    });
  }

  ////////////////////////////////////////////
  // construit le footer avec le prix et les likes
  generateFooter() {
    let profil = this.photographer;

    const prix = document.createElement("div");
    prix.classList.add("priceBox");
    const htmlPrice = `
      <div class="numbersOfLikes">${this.likes} <i class="fas fa-heart"></i></div>
      <div class="price">${profil.price}€ /jour</div>`;
    prix.innerHTML = htmlPrice;
    main.append(prix);
  }

  generateLightbox() {
    const images = document.querySelectorAll("a img");
    const lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    lightbox.innerHTML = `<button class="lightbox__close"><i class="fa-solid fa-xmark"></i></button>`
    document.body.appendChild(lightbox);

    images.forEach((image) => {
      image.addEventListener("click", (e) => {
        
        lightbox.classList.add("active");
        const img = document.createElement("img");
        img.src = image.src;
        lightbox.appendChild(img);
        img.classList.add("lightboxImg")
      });
      
    });
    const closeBtn = document.querySelector(".lightbox__close");
      closeBtn.addEventListener("click", (e) => {
          let imgActive = document.querySelector('.lightboxImg')
          lightbox.classList.remove("active");
          lightbox.removeChild(imgActive);
      });
  }
  generateLike() {
    ///////////////////////////////
    //get DOM Elements
    const heart = document.querySelectorAll(".fas");
    const likes = document.querySelectorAll(".likes__nbr");

    //recupere les nombre de likes
    likes.forEach((el) => {
      //recupere leur contenu html et transforme le en nombre
      const cont = parseInt(el.innerHTML);
      console.log(cont);
    });
  }

  addOneLike() {
    let media = this.medias;
    if (media == this.photographer) {
      console.log(media);
    }

    let compteur = 3;
    let sum = compteur++;
  }
}

buildFilters();
