//Mettre le code JavaScript lié à la page photographer.html
// ma classe photographerPage retourne le template ou la vue de mes cartes photographer 
class PhotographerPage {
    constructor(photographer, media){
        this._photographer = new Photographer(photographer);
        this._media = new PhotographerMedia(media);
    }

    createPhotographerPage() {
        const altImg = `${this._photographer._name}, ${this._photographer._city}, ${this._photographer._tagline}, ${this._photographer.price}€ par jour`;
        
        const $articlePage = document.createElement('article');
        const photographerPage =
        `
        <article class="cardPhotographer">
        
        <div class="cardPhotographer__infos">
        <h1>${this._photographer.name}</h1>
        <h2>${this._photographer.city}, ${this._photographer.country}</h2>
        <p>${this._photographer.tagline}</p>
        </div>
        <button class="contact_button" onclick="displayModal()" aria-label="contactez-moi ${this._photographer.name}" aria-haspopup="dialog" aria-controls="dialog">Contactez-moi</button>
        <img src="${this._photographer.portrait}" alt="${altImg}"/>
        </article>
        
        <div class="filter">
        <p>Trier par</p>
          <div class="filter_btn" onclick="displayChevron()" type="menubar" aria-expanded="false" >
          <span class="chevron-down"><i class="fa-solid fa-chevron-down"></i></span> <span class="chevron-up"><i class="fa-solid fa-chevron-up"></i></span>
            <div class="filter_list"  aria-label="Trier les medias par">
              <button class="filter_popular" type="menuitem" aria-selected="true">Popularité</button>
              <button class="filter_date" type="menuitem" aria-selected="false">Date</button>
              <button class="filter_title" type="menuitem" aria-selected="false">Titre</button>
            </div>
          </div> 
        </div>
        `
        $articlePage.innerHTML = photographerPage;
        return $articlePage;
    }

    createLikes(totalLikes) {
      const $articleLikes = document.createElement('article');
      const displayLikes = 
      `
      <div class="displayTarif">
      <p class="displayTarif_likes" aria-label="total de likes">${totalLikes} <i class="fa-solid fa-heart likesDisplay_heart"></i></p>
      <p class="displayTarif_price" aria-label="tarif journalier">${this._photographer.price}€/Jour</p>
      `
      $articleLikes.innerHTML = displayLikes;
      return $articleLikes;
    }

    incrementLikes(totalLikes) {
      const hearts = document.querySelectorAll('.mediaDisplay_heart');
      let like = document.querySelectorAll('.mediaDisplay_infosLike');
      let likesTotal = document.querySelector('.displayTarif_likes');
      hearts.forEach((heart, index) => {
        heart.addEventListener('click', () => {
          if(!heart.classList.contains('active')) {
            like[index].innerHTML ++;
            heart.classList.add('active');
            heart.setAttribute('aria-pressed', 'true');
            heart.setAttribute('aria-label', 'j\'aime');
            this._media.likes = like[index].innerHTML;
            totalLikes ++;
            likesTotal.innerHTML = `${totalLikes} <i class="fa-solid fa-heart likesDisplay_heart"></i>`;
          } else {
            like[index].innerHTML --;
            heart.classList.remove('active');
            heart.setAttribute('aria-pressed', 'false');
            heart.setAttribute('aria-label', 'je n\'aime plus');
            this._media.likes = like[index].innerHTML;
            totalLikes --;
            likesTotal.innerHTML = `${totalLikes} <i class="fa-solid fa-heart likesDisplay_heart"></i>`;
          }
        })
      });
    }

    renderMedia(media) {
        if(media.image) {
            return `<img class="linkRenderMedia" data-id="${media.id}" src="/assets/photographers/${this._photographer.name}/${media.image}"  alt="${media.title}"/>`;
        } else if (media.video) {
            return `<video class="linkRenderMedia" data-id="${media.id}" src="/assets/photographers/${this._photographer.name}/${media.video}" poster="" type="video/mp4" aria-label="${media.title}"></video>`;
        }
    }

    linkMedia(media) {
      if(media.image) {
        return `/assets/photographers/${this._photographer.name}/${media.image}`;
      } else if(media.video) {
        return `/assets/photographers/${this._photographer.name}/${media.video}`;
      }
    }
    
    createPhotographerMedia() {
      const $articleMedias = document.createElement('article');
      const displayMedias = 
      `
      <div class="mediaDisplay_bloc">
      <a href="${this.linkMedia(this._media)}" name="${this._media.title}" aria-label="${this._media.title}" class="mediaDisplay_link">
      ${this.renderMedia(this._media)}
      </a>
      
      <p class="mediaDisplay_infosTitle">${this._media.title}</p>
      <div class="mediaDisplay_boxLike">
      <p class="mediaDisplay_infosLike" aria-label="aimé ${this._media.likes} fois">${this._media.likes}</p>
      <i class="fa-solid fa-heart mediaDisplay_heart" aria-label="Coeur, Cliquez ici pour aimer"></i>
      </div>
      </div>   
      `
      $articleMedias.innerHTML = displayMedias;
      return $articleMedias;
    }
    

    createModalDisplay() {
      const $displayModal = document.createElement('div');
      $displayModal.setAttribute('class', 'modal');
      $displayModal.setAttribute('role', 'dialog');
      $displayModal.setAttribute('id', 'dialog');
      $displayModal.setAttribute('aria-labelledby', 'modalTitle');
      $displayModal.setAttribute('aria-describedby', 'coordonees');
      $displayModal.setAttribute('tabindex', '-1');
      $displayModal.setAttribute('aria-modal', 'false');

      const modalDisplay = 
      `
      <header>
        <h2 id="modalTitle">Contactez-moi <br>${this._photographer.name}</h2>
        <button class="btnClose" type="button" aria-label="Fermer" title="Fermer cette modale">
          <img src="assets/icons/close.svg" onclick="closeModal()" class="closeModal" aria-controls="dialog" alt="Fermer"/>
        </button>
      </header>
      <form id="formContact" action="photographer.html" name="contact" method="get" oninvalid="false" onsubmit="validForm()">
        <div id="coordonees">
          <div class="formData">
            <label for="prenom">Prénom</label>
            <input type="text" id="prenom" name="firstName" aria-labelledby="prenom" tabindex="0"/>
            <span class="errorMessage"></span>
          </div>
          <div class="formData">
            <label for="nom">Nom</label>
            <input type="text" id="nom" name="lastName" aria-labelledby="nom"/>
            <span class="errorMessage"></span>
          </div>
          <div class="formData">
            <label for="email">Email</label>
            <input type="text" id="email" name="email" aria-labelledby="email"/>
            <span class="errorMessage"></span>
          </div>
          <div class="formData">
            <label for="message">Votre Message</label>
            <textarea type="text" id="message" name="message" aria-labelledby="message"></textarea>
            <span class="errorMessage"></span>
          </div>
        </div>  
        <button class="contact_button" aria-label="Envoyer le formulaire">Envoyer</button>
      </form>
      `
      $displayModal.innerHTML = modalDisplay;
      return $displayModal;
    }
    
    displayLightBox() {  
      const $content = document.createElement('div');
      $content.setAttribute('class', 'lightbox__container');
      const $image = document.querySelectorAll('a[href$=".jpg"]');
      const $video = document.querySelectorAll('a[href$=".mp4"]');
      const links = [...$image, ...$video];   
      const modalLightbox = document.getElementById('lightbox');
      const bodyLightbox = document.getElementById('bodyLightbox');
      const main = document.getElementById('main');
      const $next = document.querySelector('.next');
      const $prev = document.querySelector('.prev');
      const $close = document.querySelector('.closeLightbox');
      
      let compteur = 0;

      links.forEach((link, index) => {
        link.addEventListener('click', function(e) {
          var linkSrc = this.querySelector('img, video').src;
          e.preventDefault();
          if(linkSrc.endsWith('.jpg')){
            var linkElement = document.createElement('img');
            var titleMedia = document.createElement('p');
            titleMedia.setAttribute('class', 'titleMedia');
            linkElement.setAttribute('src', linkSrc);
            linkElement.setAttribute('alt', link.name);
            titleMedia.innerHTML = `${link.name}`;
            $content.appendChild(linkElement);
            $content.appendChild(titleMedia);
          } else if(linkSrc.endsWith('.mp4')) {
            var linkElement = document.createElement('video');
            var titleMedia = document.createElement('p');
            titleMedia.setAttribute('class', 'titleMedia');
            linkElement.setAttribute('src', linkSrc);
            linkElement.setAttribute('alt', link.name);
            linkElement.setAttribute('controls', true);
            linkElement.setAttribute('autoplay', true);
            titleMedia.innerHTML = `${link.name}`;
            $content.appendChild(linkElement);
            $content.appendChild(titleMedia);
          }
          compteur = index;
          modalLightbox.setAttribute('aria-hidden', 'false')
          bodyLightbox.setAttribute('aria-hidden', 'false')
          main.setAttribute('aria-hidden', 'true');
          modalLightbox.style.display = "block"
        })
      });
      $next.addEventListener('click', function(e) {
        e.preventDefault();
        compteur++;
        if(compteur === links.length) {
          compteur = 0;
        }
        var linkSrc = links[compteur].querySelector('img, video').src;
        if(linkSrc.endsWith('.jpg')){
          $content.innerHTML = "";
          var linkElement = document.createElement('img');
          linkElement.setAttribute('src', `${linkSrc}`);
          linkElement.setAttribute('alt', `${links[compteur].name}`);
          var titleMedia = document.createElement('p');
          titleMedia.setAttribute('class', 'titleMedia');
          $content.appendChild(linkElement);
          titleMedia.innerHTML = `${links[compteur].name}`;
          $content.appendChild(titleMedia);
        } else if(linkSrc.endsWith('.mp4')) {
          $content.innerHTML = "";
          var linkElement = document.createElement('video');
          linkElement.setAttribute('src', `${linkSrc}`);
          linkElement.setAttribute('controls', true);
          linkElement.setAttribute('autoplay', true);
          linkElement.setAttribute('alt', `${links[compteur].name}`);
          var titleMedia = document.createElement('p');
          titleMedia.setAttribute('class', 'titleMedia');
          titleMedia.innerHTML = `${links[compteur].name}`;
          $content.appendChild(linkElement);
          $content.appendChild(titleMedia);
        }
      });
      $prev.addEventListener('click', function(e) {
        e.preventDefault();
        compteur--;
        if(compteur < 0) {
          compteur = links.length - 1;
        }
        var linkSrc = links[compteur].querySelector('img, video').src;
        if(linkSrc.endsWith('.jpg')){
          $content.innerHTML = "";
          var linkElement = document.createElement('img');
          linkElement.setAttribute('src', `${linkSrc}`);
          linkElement.setAttribute('alt', `${links[compteur].name}`);
          var titleMedia = document.createElement('p');
          titleMedia.setAttribute('class', 'titleMedia');
          titleMedia.innerHTML = `${links[compteur].name}`;
          $content.appendChild(linkElement);
          $content.appendChild(titleMedia);
        } else if(linkSrc.endsWith('.mp4')) {
          $content.innerHTML = "";
          var linkElement = document.createElement('video');
          linkElement.setAttribute('src', `${linkSrc}`);
          linkElement.setAttribute('controls', true);
          linkElement.setAttribute('autoplay', true);
          linkElement.setAttribute('alt', `${links[compteur].name}`);
          var titleMedia = document.createElement('p');
          titleMedia.setAttribute('class', 'titleMedia');
          titleMedia.innerHTML = `${links[compteur].name}`;
          $content.appendChild(linkElement);
          $content.appendChild(titleMedia);
        }
      });  
      $close.addEventListener('click', function() {
        modalLightbox.setAttribute('aria-hidden', 'true')
        bodyLightbox.setAttribute('aria-hidden', 'true')
        main.setAttribute('aria-hidden', 'false');
        modalLightbox.style.display = "none"
        $content.innerHTML = "";
      });
      document.addEventListener('keydown', (e) => {
        if(e.key == "ArrowRight") {
          compteur++;
          if(compteur === links.length) {
            compteur = 0;
          }
          var linkSrc = links[compteur].querySelector('img, video').src;
          if(linkSrc.endsWith('.jpg')){
            $content.innerHTML = "";
            var linkElement = document.createElement('img');
            linkElement.setAttribute('src', `${linkSrc}`);
            var titleMedia = document.createElement('p');
            titleMedia.setAttribute('class', 'titleMedia');
            $content.appendChild(linkElement);
            titleMedia.innerHTML = `${links[compteur].name}`;
            $content.appendChild(titleMedia);
          } else if(linkSrc.endsWith('.mp4')) {
            $content.innerHTML = "";
            var linkElement = document.createElement('video');
            linkElement.setAttribute('src', `${linkSrc}`);
            linkElement.setAttribute('controls', true);
            linkElement.setAttribute('autoplay', true);
            var titleMedia = document.createElement('p');
            titleMedia.setAttribute('class', 'titleMedia');
            titleMedia.innerHTML = `${links[compteur].name}`;
            $content.appendChild(linkElement);
            $content.appendChild(titleMedia);
          }
        } else if(e.key == "ArrowLeft"){
          compteur--;
          if(compteur < 0) {
            compteur = links.length - 1;
          }
          var linkSrc = links[compteur].querySelector('img, video').src;
          if(linkSrc.endsWith('.jpg')){
            $content.innerHTML = "";
            var linkElement = document.createElement('img');
            linkElement.setAttribute('src', `${linkSrc}`);
            var titleMedia = document.createElement('p');
            titleMedia.setAttribute('class', 'titleMedia');
            titleMedia.innerHTML = `${links[compteur].name}`;
            $content.appendChild(linkElement);
            $content.appendChild(titleMedia);
          } else if(linkSrc.endsWith('.mp4')) {
            $content.innerHTML = "";
            var linkElement = document.createElement('video');
            linkElement.setAttribute('src', `${linkSrc}`);
            linkElement.setAttribute('controls', true);
            linkElement.setAttribute('autoplay', true);
            var titleMedia = document.createElement('p');
            titleMedia.setAttribute('class', 'titleMedia');
            titleMedia.innerHTML = `${links[compteur].name}`;
            $content.appendChild(linkElement);
            $content.appendChild(titleMedia);
          }
        } else if (e.key == "Escape") {
          modalLightbox.setAttribute('aria-hidden', 'true')
          bodyLightbox.setAttribute('aria-hidden', 'true')
          main.setAttribute('aria-hidden', 'false');
          modalLightbox.style.display = "none"
          $content.innerHTML = "";
        }
         
      });  
      return $content;
    } 

}

