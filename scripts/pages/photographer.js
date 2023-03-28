//Récupérer l'id de l'url
async function getPhotographerData() {
  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");

  const response = await fetch("../data/photographers.json");
  const data = await response.json();
  const photographer = data.photographers.filter(
    (photographer) => photographer.id == id
  );

  const responseMedia = await fetch("../data/photographers.json");
  const dataMedia = await responseMedia.json();
  const media = dataMedia.media.filter((media) => media.photographerId == id);
  console.log(media);

  function getLikes(photographerId) {
    let likes = 0;
    dataMedia.media.forEach((media) => {
      if (media.photographerId == photographerId) {
        likes += media.likes;
      }
    });
    return likes;
  }

  const photographerCard = document.querySelector(".photograph-header");
  photographerCard.innerHTML = `
  <figure>
    <figcaption tabindex=${photographer[0].tabindex}>
      <img src="assets/photographers/${
        photographer[0].portrait
      }" alt="portrait de ${photographer[0].name} aria-label="profil de  ${
    photographer[0].name
  }" " >
    </figcaption>
    <button class="contact_button" onclick="displayModal()" tabindex=${
      photographer[0].tabindex
    } >Contactez-moi</button>
    <div class="photograph-info">
      <h1 tabindex=${photographer[0].tabindex + 1}>${photographer[0].name}</h1>
      <div tabindex=${photographer[0].tabindex + 1}> 
      <h2>${photographer[0].city}, ${photographer[0].country}</h2>
      <p>${photographer[0].tagline}</p>
      </div>
    </div>
    </figure>
    <p class="banner" tabindex="0"><span>${getLikes(
      id
    )}<i class="fas fa-heart" aria-label=" fois liké">  </i></span> ${
    photographer[0].price
  }€/jour</p>
  `;

  // Créer la liste des photos du photographe en créeant un élément html div
  const mediaList = document.querySelector(".photograph-media");

  media.forEach((photographer) => {
    let mediaElement;

    if (photographer.hasOwnProperty("video")) {
      // Si le média contient une vidéo, créer une balise vidéo et y ajouter l'URL de la vidéo
      mediaElement = document.createElement("video");
      mediaElement.setAttribute("aria-label", "video de " + photographer.title);
      mediaElement.src = `assets/videos/${photographer.video}`;
      mediaElement.controls = true;
    } else {
      // Si le média ne contient pas de vidéo, créer une balise img et y ajouter l'URL de l'image
      mediaElement = document.createElement("img");
      mediaElement.src = `assets/photos/${photographer.image}`;
      mediaElement.alt = photographer.title;
    }

    // Créer un élément div pour chaque média et y ajouter le mediaElement et les autres éléments
    const mediaCard = document.createElement("div");
    mediaCard.classList.add("cards");
    mediaCard.addEventListener("click", displaySlider);
    mediaCard.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        displaySlider(mediaCard.id);
      }
    });
    mediaCard.id = photographer.id;
    mediaCard.setAttribute("tabindex", "0");
    mediaCard.innerHTML = `
    <div class="descriptionBox">
    <h2>${photographer.title}</h2>
    <button class="likes"><p>${photographer.likes}</p><i class="fas fa-heart"></i></button>
    </div>
    `;
    mediaCard.appendChild(mediaElement);

    // Ajouter un like au click sur le bouton avec la classe likes et ne pas jouer l'ébènement click sur la carte du média
    const likeButton = mediaCard.querySelector(".likes");
    likeButton.addEventListener("click", (e) => {
      e.stopPropagation();
      photographer.likes++;
      // si le like à déja été cliquer on ne l'ajoute pas
      if (likeButton.classList.contains("liked")) {
        return;
      }
      likeButton.classList.add("liked");

      console.log(photographer.id);
      console.log(photographer.likes);
      // ajouter un like au média dans le tableau media et dans le fichier json media.json
      media.forEach((media) => {
        if (media.id == photographer.id) {
          likeButton.innerHTML = `
          <p>${media.likes}</p>
          <i class="fas fa-heart"></i>
          `;

          console.log(media.likes);
          const likes = document.querySelector(".banner span");
          likes.innerHTML = `
          ${getLikes(id)}
          <i class="fas fa-heart" aria-label=" fois liké">  </i>
          `;
        }
      });
    });

    // Ajouter la carte du média à la liste des médias
    mediaList.appendChild(mediaCard);

    const carrousel = document.querySelector(".carrousel-media");
    carrousel.innerHTML = "";
    media.forEach((media) => {
      let mediaElement;
      if (media.hasOwnProperty("video")) {
        // Si le média contient une vidéo, créer une balise vidéo et y ajouter l'URL de la vidéo
        mediaElement = document.createElement("video");
        mediaElement.setAttribute("aria-label", "video de " + media.title);
        mediaElement.classList.add("mediaElement");
        mediaElement.src = `assets/videos/${media.video}`;
        mediaElement.controls = true;
      } else {
        // Si le média ne contient pas de vidéo, créer une balise img et y ajouter l'URL de l'image
        mediaElement = document.createElement("img");
        mediaElement.classList.add("mediaElement");
        mediaElement.setAttribute("aria-label", "image de " + media.title);
        mediaElement.setAttribute("tabindex", "0");
        mediaElement.src = `assets/photos/${media.image}`;
        mediaElement.alt = media.title;
      }
      const mediaCard = document.createElement("div");
      mediaCard.classList.add("images");
      mediaCard.id = media.id;

      const imageContainer = document.createElement("div");
      imageContainer.classList.add("imageContainer");

      mediaCard.appendChild(imageContainer);
      carrousel.appendChild(mediaCard);

      imageContainer.appendChild(mediaElement);

      //ajouter le titre du média à la carte du média
      const mediaTitle = document.createElement("h2");
      mediaTitle.innerHTML = media.title;
      mediaTitle.classList.add("mediaTitle");
      mediaCard.appendChild(mediaTitle);
    });

    // au click sur entrer ouvrir le carrousel
    document.getElementById(mediaCard.id).addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        // afficher le tableau de média
        const carrousel = document.querySelector(".carrousel-media");
        carrousel.innerHTML = "";
        media.forEach((media) => {
          let mediaElement;
          if (media.hasOwnProperty("video")) {
            // Si le média contient une vidéo, créer une balise vidéo et y ajouter l'URL de la vidéo
            mediaElement = document.createElement("video");
            mediaElement.setAttribute("aria-label", "video de " + media.title);
            mediaElement.classList.add("mediaElement");
            // add a size to the video to avoid the video to be bigger than the screen
            mediaElement.width = 720;
            mediaElement.src = `assets/videos/${media.video}`;
            mediaElement.controls = true;
          } else {
            // Si le média ne contient pas de vidéo, créer une balise img et y ajouter l'URL de l'image
            mediaElement = document.createElement("img");
            mediaElement.classList.add("mediaElement");
            mediaElement.width = 720;
            mediaElement.setAttribute("aria-label", "image de " + media.title);
            mediaElement.setAttribute("tabindex", "0");
            mediaElement.src = `assets/photos/${media.image}`;
            mediaElement.alt = media.title;
          }
          const mediaCard = document.createElement("div");
          mediaCard.classList.add("images");
          mediaCard.id = media.id;

          mediaCard.appendChild(mediaElement);
          carrousel.appendChild(mediaCard);
        });
      }
    });
  });

  const namedForm = document.querySelector(".contact_header");
  namedForm.innerHTML = `
  <h2>Contacter:</h2>
  <button aria-label="fermer le formulaire" id="close" onclick="closeModal()">X</button>
  <h3>${photographer[0].name}</h3>
  `;
}

getPhotographerData();

//au click sur le slider
function previousImg() {
  console.log("previous");
  const slider = (document.querySelector("#carrousel").width = 720);
  document.querySelector(".carrousel-media").scrollLeft -= slider;
}

function nextImg() {
  const slider = (document.querySelector("#carrousel").width = 720);
  console.log("next");
  document.querySelector(".carrousel-media").scrollLeft += slider;
}

function displaySlider() {
  const container = document.querySelector("#carrousel");
  container.style.display = "block";
  // add aria-hidden to false to the modal
  container.setAttribute("aria-hidden", "false");
  const photograph = document.querySelector("#photographer-main");
  photograph.style.display = "none";
}

function closeSliderModal(event) {
  const container = document.querySelector("#carrousel");
  container.style.display = "none";
  container.setAttribute("aria-hidden", "true");
  const photograph = document.querySelector("#photographer-main");
  photograph.style.display = "block";
}
