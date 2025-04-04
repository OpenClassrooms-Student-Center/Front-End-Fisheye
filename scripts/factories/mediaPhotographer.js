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
    const medias = data.media.filter(
      (dataMediaPhotographer) => dataMediaPhotographer.photographerId === id
    );
    for (const media of medias) {
      this.insertMedias(media, photographer);
      this.totalLikes += media.likes;
    }
    // Mettez à jour l'élément HTML avec le total des likes
    const totalLikesElement = document.getElementById("total-likes");
    if (totalLikesElement) {
      totalLikesElement.innerText = this.totalLikes.toString();
    }
    const section = document.getElementById("containerCards");
    const select = document.querySelector("#orderSelect");

    // Tri initial par likes
    medias.sort((a, b) => b.likes - a.likes);

    // Afficher les médias triés par likes
    medias.forEach((element) => {
      section.appendChild(document.getElementById(`card-${element.id}`));
    });

    // Système de tri
    select.addEventListener("change", async () => {
      const selectedOption = select.options[select.selectedIndex];
      const selectedValue = selectedOption.value;
      let filteredMedia;

      switch (selectedValue) {
        case "popularity":
          filteredMedia = [...medias].sort((a, b) => b.likes - a.likes);
          break;

        case "date":
          filteredMedia = [...medias].sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          );
          break;

        case "title":
          filteredMedia = [...medias].sort((a, b) => {
            if (a.title < b.title) return -1;
            if (a.title > b.title) return 1;
            return 0;
          });
          break;
      }

      filteredMedia.forEach((element) => {
        section.appendChild(document.getElementById(`card-${element.id}`));
      });
    });

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
    <aside class="infos" aria-labelledby='aside-title' tabIndex="0">
    <div class="infos-name">
    <h1 id='aside-title'>${name}</h1>
    </div>	
    <span class="origin">${city}, ${country}</span>
    <span class="tagline">${tagline}</span>
  </aside>	
  <button class="contact_button" aria-label="cliquer pour ouvrir le formulaire de contact" onclick='displayModal()'>Contactez-moi</button>
  <img alt="portrait du photographe ${name}" src="${picture}" tabindex="0">
`
  }
  insertMedias(media, photographer) {
    const containerCards = document.getElementById("containerCards");
    const card = document.createElement("div");
    card.id = `card-${media.id}`;
    let { title, image, id, likes, video } = media;
    const regexName = /^\w+/; // permets de supprimé le nom de famille de name du fichier json
    const result = photographer.name.match(regexName)[0];
    let picture, mediaHtml;
    if (image?.endsWith(".jpg")) {
      picture = `assets/images/${result}/${image}`;
      mediaHtml = `<img lightbox-media="${title}" src="${picture}" alt="${title}" tabIndex="0" />`;
    } else if (video?.endsWith(".mp4")) {
      picture = `assets/images/${result}/${video}`;
      mediaHtml = `<video lightbox-media="${title}" src="${picture}" alt="${title}" tabIndex="0"></video>`;
    }
    card.innerHTML = `
  <div class="card" id="card" >
    ${mediaHtml}
    <div class="containerInfos" >
      <h1>${title}</h1>
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

    heartId.addEventListener("click", () => {
      const totalLikesElement = document.getElementById("total-likes");
      if (likeClass.classList.contains("likes")) {
        // Si l'élément a déjà été "aimé", supprimez le like
        likeClass.classList.remove("likes");
        likes -= 1;
        totalLikesElement.innerText = this.totalLikes -= 1;
      } else {
        // Sinon, ajoutez un like
        likeClass.classList.add("likes");
        likes += 1;
        totalLikesElement.innerText = this.totalLikes += 1;
      }
      // Mettez à jour le texte de l'élément HTML avec le total des likes
      likeClass.innerText = likes;
    });
  }
}
