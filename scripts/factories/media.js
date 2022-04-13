// Création d'un élément image et ses attributs src, alt et role
import LightBox from "../lightbox.js";
export class ImageFactory {
  createHTML(element) {
    let eltImage = document.createElement("img");
    eltImage.setAttribute("src", element.image);
    eltImage.setAttribute("title", element.title);
    eltImage.setAttribute("alt", element.alt);
    eltImage.setAttribute("role", "button");
    eltImage.className = "ph-media";
    return eltImage;
  }
}
// Création d'un élément vidéo et ses attributs controls, src et role
class VideoFactory {
  createHTML(element) {
    let eltVideo = document.createElement("video");
    eltVideo.setAttribute("src", element.video);
    eltVideo.setAttribute("title", element.title);
    //eltVideo.setAttribute("controls", "controls");
    eltVideo.setAttribute("role", "button");
    eltVideo.className = "ph-media";
    return eltVideo;
  }
}

// Test type d'élément image ou vidéo
class MediaFactory {
  returnedMedia(element) {
    let factory = null;
    if (element.image) {
      factory = new ImageFactory();
    } else if (element.video) {
      factory = new VideoFactory();
    }
    return factory.createHTML(element);
  }
}

// Construction gallerie de médias et de la lightbox
export default class GalleryFactory {
  constructor() {
    this.totalPhLike = 0;
  }
  builderGallery(dataMedias) {
    const id = new URLSearchParams(window.location.search).get("id");
    ////// Création du média via MediaFactory///////
    let mediaFactory = new MediaFactory();
    //initialisation des element necessaire pour la lightbox
    let mediaItems = [];
    let mediaName = [];

    dataMedias.forEach((element) => {
      if (id == element.photographerId) {
        let sectionGallery = document.getElementById("photographer-gallery");
        let articleGallery = document.createElement("article");
        // On passe le média à la factory
        let mediaHTML = mediaFactory.returnedMedia(element);
        let workTemplate = `
                <a href='#' title=${element.title}>
                ${mediaHTML.outerHTML}
                </a>
                <div class="media-detail">
                    <h2 class="media-detail-title">${element.title}</h2>
                    <span class="media-detail-price">${element.price} €</span>
                    <div class='media-detail-like'>
                        <span><a class="like-counter">${element.likes}</a></span>
                        <i class="far fa-heart heart-btn" aria-label='likes' role="button" data-value="${element.likes}"></i>
                    </div>
                </div>
                `;

        articleGallery.innerHTML = workTemplate;
        sectionGallery.appendChild(articleGallery);
        articleGallery.classList.add("media-art");
        this.totalPhLike += parseInt(element.likes);
        //stockage des elements a utilisier pour la lightbox
        mediaItems.push(mediaHTML.outerHTML);
        mediaName.push(element.title);
        // Création de la lightbox
        new LightBox().lightboxOpen(mediaItems, mediaName);
      }
    });

    return this;
  }
}
