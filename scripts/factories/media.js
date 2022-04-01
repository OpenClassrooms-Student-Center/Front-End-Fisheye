// Création d'un élément image et ses attributs src, alt et role
 export class ImageFactory {
    createHTML(element) {
        let eltImage = document.createElement('img');
        eltImage.setAttribute('src', element.image);
        eltImage.setAttribute('title', element.title);
        eltImage.setAttribute('alt', element.alt);
        eltImage.setAttribute('role', 'button');
        eltImage.className = 'ph-media';

        return eltImage;
    }
}

// Création d'un élément vidéo et ses attributs controls, src et role
 class VideoFactory {
    createHTML(element) {
        let eltVideo = document.createElement('video');
        eltVideo.setAttribute("controls", "controls")
        eltVideo.setAttribute('src', element.video);
        eltVideo.setAttribute('title', element.title);
        eltVideo.setAttribute('role', 'button');
        eltVideo.className = 'ph-media';

        return eltVideo;
    }
}
// Test type d'élément image ou vidéo
 class MediaFactory {
    returnedMedia(element) {
        let factory = null;
        if (element.hasOwnProperty('image')) {
            factory = new ImageFactory();
        } else if (element.hasOwnProperty('video')) {
            factory = new VideoFactory();
        }
        return factory.createHTML(element);
    }
}



    // Construction gallerie de médias et de la lightbox
 class GalleryFactory {
    builderGallery(dataMedias) {
        const id = window.location.search.split('id=')[1];
        // Création du média via MediaFactory
        let mediaFactory = new MediaFactory();
        let currentMedia = [];
        let currentMediaName = [];
          console.log(dataMedias)
        dataMedias.forEach(element => {
            if (id == element.photographerId) {
                let sectionGallery = document.getElementById('photographer-gallery');
                let articleGallery = document.createElement("article");
                // On passe le média à la factory
                let mediaHTML = mediaFactory.returnedMedia(element);
                let workTemplate = `
                <a href='#' title=${element.title}>
                ${mediaHTML.outerHTML}
                </a>
                <div class="ph-work-elt-text">
                    <h2 class="ph-work-title">${element.title}</h2>
                    <span class="ph-work-price">${element.price} €</span>
                    <div class='ph-elt-like'>
                    <span class="ph-work-like">
                        <a class="like-counter">${element.likes}</a>
                    </span>
                    <i class="far fa-heart heart-btn" aria-label='likes' role="button" data-value="${element.likes}"></i>
                    </div>
                </div>
                `
                articleGallery.innerHTML = workTemplate;
                sectionGallery.appendChild(articleGallery);
                articleGallery.classList.add("ph-work-elt");

console.log(sectionGallery)
                currentMedia.push(mediaHTML.outerHTML);
                currentMediaName.push(element.title);
            }
        })
        return this;
    }
}
export default class MediaBuilder {
    photographersMedias(data) {
        const MEDIAS = data.dataMedias;
        // Appel de la méthode de GalleryFactory pour créer la gallerie
        new GalleryFactory().builderGallery(MEDIAS);
    }
}