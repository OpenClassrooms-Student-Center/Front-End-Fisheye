//////////////////////////////////////////////
//affiche le nombre de media image et video
class MediaBuilderFactory {
    
    build(media) {
        const sectionGallery = document.querySelector(".pictures");
      if (media.image) {
        
        const htmlInbox = `<a>
         <img src="./assets/photos/${media.image}" class="active"></img>
         <div class="photo-details">
              <h3>${media.title} </h3>
              <div class="likes"><span class="likes__nbr">${media.likes}</span>&nbsp<span class="fas fa-heart" ></span></div>
          </div
     </a>`;
  
        const article = document.createElement("article");
        article.innerHTML = htmlInbox;
        sectionGallery.appendChild(article);
      }
      if (media.video) {
        const htmlInbox = `<a>
         <video controls src="./assets/photos/${media.video}" class="active"></video>
         <div class="photo-details">
              <h3>${media.title} </h3>
              <div class="likes"><span class="likes__nbr">${media.likes}</span>&nbsp<span class="fas fa-heart" ></span></div>
          </div
     </a>`;
     const article = document.createElement("article");
        article.innerHTML = htmlInbox;
        sectionGallery.appendChild(article);
      }
    }
  }

  export {MediaBuilderFactory}
