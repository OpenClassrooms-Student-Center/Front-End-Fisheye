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

  export {MediaBuilderFactory}
