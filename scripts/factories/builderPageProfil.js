///creer l'image du photographe
function createHTML(el) {
  //creer l'image du photographe
  const userImg = `
        <img src="./assets/photographers/${el.portrait}"></img>`;

  let image = document.createElement("div");
  image.innerHTML = userImg;
  const photographersHeader = document.querySelector(".photograph-header");
  const contactBtn = document.querySelector(".contact_button");
  photographersHeader.appendChild(image);

  // creer le paragraphe dans le header

  const htmlHeader = `
                  <h2>${el.name}</h2>       
              <div class="photographer-details">
                          <h3>${el.city}, ${el.country}</h3>
                          <h5>${el.tagline}</h5>
                         
              </div>`;
  const article = document.createElement("article");
  article.innerHTML = htmlHeader;
  photographersHeader.insertBefore(article, contactBtn);
}

function buildGallery(el) {
  //recuperer les elements du dom
  const phtographGallery = document.querySelector(".gallerie");

  const htmlInbox = `<a>
    
    <img src="./assets/photos/${el.image}"></img>
    <h3>${el.title} </h3>
    
</a>`;
  const article = document.createElement("article");
  article.innerHTML = htmlInbox;
  phtographGallery.appendChild(article);
}

export { createHTML, buildGallery };
