export class Mediaphotographer {
  constructor() {
    this.totalLikes = 0; // Variable pour suivre le total des likes
  }
  async getOnePhotographer() {
    const url = new URLSearchParams(document.location.search);
    const id = parseInt(url.get("id"));

    const response = await fetch("../../data/photographers.json");
    const data = await response.json();
    const photographer = data.photographers.find(
      (onePhotographer) => onePhotographer.id === id
    );
    const allMedias = data.media.filter(
      (dataMediaPhotographer) => dataMediaPhotographer.photographerId === id
    );

    for (const element of allMedias) {
      this.insertMedias(element, photographer);
    }
    this.insertHeaderPhotographer(photographer);
  }

  insertHeaderPhotographer(photographer) {
    const photographHeader = document.getElementById("photograph-header");
    const h2Name = document.getElementById("h2Name");
    const { name, portrait, city, country, tagline, price } = photographer;
    h2Name.innerText = `Contactez-moi ${name}`;
    const spanPrice = document.querySelector("#price");
    spanPrice.innerText = `${price}€ / jour`;
    const picture = `../../assets/photographers/${portrait}`;
    photographHeader.innerHTML = `
            <div>
             <h1 aria-label="${name}">${name}</h1>
             <span aria-label="${city}, ${country}">${city}, ${country}</span>
             <p aria-label="${tagline}">${tagline}</p>
            </div>
            <div> 
               <button aria-label="Contact me" class="contact_button" onClick="displayModal()" aria-label="Bouton d'ouverture du modal de contact">Contactez-moi</button>
            </div>
            <img src="${picture}" alt="${name}" aria-label="${name}">
            `;
  }
  async insertMedias(media, photographer) {
    const containerCards = document.getElementById("containerCards");
    const card = document.createElement("div");
    let { title, image, id, likes, video } = media;
    const regexName = /^\w+/; // permets de supprimé le nom de famille de name du fichier json
    const result = await photographer.name.match(regexName)[0];
    let picture, mediaHtml;

    if (image?.endsWith(".jpg")) {
      picture = `assets/images/${result}/${image}`;
      picture = `assets/images/${result}/${image}`;
      mediaHtml = `<img lightbox-media=${title} src="${picture}" alt="${title}" tabIndex="0" />`;
    } else if (video?.endsWith(".mp4")) {
      picture = `assets/images/${result}/${video}`;
      mediaHtml = `<video lightbox-media=${title} src="${picture}" tabIndex="0"></video>`;
    }
    card.innerHTML = `
  <div class="card" id="card" >
    ${mediaHtml}
    <div class="containerInfos" >
      <h2>${title}</h2>
      <div class="containerLikes_i">
       <span class="totalLikes" id="like-${id}">${likes}</span>
       <i id="heart-${id}" class="fa-solid fa-heart heart" aria-label="likes" tabIndex="0"></i>
      </div>
    </div>
  </div>
`;
    containerCards.append(card);
    const heartId = document.getElementById(`heart-${id}`);
    const likeClass = document.getElementById(`like-${id}`);
    console.log(id)
    likes = Number(likeClass.textContent);
    this.total = 0;
    
    heartId.addEventListener("click", () => {
      if (likeClass.classList.contains("likes")) {
        // Si l'élément a déjà été "aimé", supprimez le like
        likeClass.classList.remove("likes");
        likes -= 1;
        this.totalLikes -= 1;
      } else {
        // Sinon, ajoutez un like
        likeClass.classList.add("likes");
        likes += 1;
        this.totalLikes += 1;
      }
    
      likeClass.innerText = likes;
      
      // Mettez à jour l'élément HTML avec le total des likes
      const totalLikesElement = document.getElementById("total-likes");
      if (totalLikesElement) {
        totalLikesElement.innerText = this.totalLikes.toString();
      }
    });
}
}
