function initLightbox() {
  //création des éléments html de la lightbox
  const lightbox = document.createElement("div");
  const previousMedia = document.createElement("i");
  const closeMedia = document.createElement("i");
  const nextMedia = document.createElement("i");
  const titleMedia = document.createElement("p");
  //ajouts des attributs, classes etc sur les élements crées
  lightbox.id = "lightbox";
  lightbox.ariaLabel = "Zoom sur le media";
  lightbox.role = "dialog";
  lightbox.ariaModal = "true";
  previousMedia.className = "previous-media fa-solid fa-angle-left fa-4x";
  nextMedia.className = "next-media fa-solid fa-angle-right fa-4x";
  closeMedia.className = "close-media fa-solid fa-xmark fa-4x";
  closeMedia.setAttribute("onclick", "closeMedia()");
  //tabulation des i
  closeMedia.setAttribute("tabindex", "0");
  previousMedia.setAttribute("tabindex", "1");
  nextMedia.setAttribute("tabindex", "1");
  titleMedia.className = "title-media";

  document.body.appendChild(lightbox);

  const mediasHTML = document.querySelectorAll(".media_img");

  function displayImage(media) {
    document.querySelector(".content-lightbox").innerHTML = `
        <img src="http://127.0.0.1:5500/assets/photographers/${photographer.name}/${media.image}" alt=${media.title}>
        `;
  }
  function displayVideo(media) {
    document.querySelector(".content-lightbox").innerHTML = `
        <video controls>
            <source src="http://127.0.0.1:5500/assets/photographers/${photographer.name}/${media.video}" aria-label=${media.title}></source>
        </video>
        `;
  }
  mediasHTML.forEach((mediaHtml) => {
    mediaHtml.addEventListener("click", (e) => {
      let index = medias.findIndex((element) => {
        //function qui retourne l'index
        return element.id == mediaHtml.dataset.id;
      });
      let media = medias[index];
      let title = medias[index].title;
      //ajoute la classe active pour afficher la lightbox
      lightbox.classList.add("active");
      //création de la div pour la lightbox
      lightbox.innerHTML = '<div class="content-lightbox"></div>';
      //condition qui affiche une image ou une vidéo
      if (mediaHtml.tagName === "VIDEO") {
        displayVideo(media);
      } else {
        displayImage(media);
      }
      //créé les élements dans le DOM
      lightbox.appendChild(closeMedia);
      lightbox.appendChild(previousMedia);
      lightbox.appendChild(nextMedia);
      lightbox.appendChild(titleMedia);
      document.querySelector(".title-media").innerHTML = title;
      //focus sur la croix de fermeture
      document.querySelector(".close-media").focus();

      //evenement au click sur la fleche nextMedia
      document.querySelector(".next-media").addEventListener("click", (e) => {
        nextMediaEvent();
      });

      //evenement au click sur la fleche previous media
      document.querySelector(".previous-media").addEventListener("click", (e) => {
          previousMediaEvent();
        });
      //evenement flèche droite
      lightbox.addEventListener("keydown", (e) => {
        if (e.key == "ArrowRight") {
          nextMediaEvent();
        }
      });

      //evenement flèche gauche
      lightbox.addEventListener("keydown", (e) => {
        if (e.key == "ArrowLeft") {
          previousMediaEvent();
        }
      });
      //evenement touche echap
      lightbox.addEventListener("keydown", (e) => {
        if (e.key == "Escape") {
          lightbox.classList.remove("active");
          lightbox.innerHTML = "";
        }
      });
      //fonctions
      function nextMediaEvent() {
        if (index < medias.length - 1) {
          index++;
        } else {
          index = 0;
        }

        let med = medias[index];
        //changement du titre du média
        document.querySelector(".title-media").innerHTML = med.title;
        //changement de l'image, vérification si c'es une image ou vidéo
        if (medias[index].video) {
          displayVideo(medias[index]);
        } else {
          displayImage(medias[index]);
        }
      }
      function previousMediaEvent() {
        if (index > 0) {
          index--;
        } else {
          index = medias.length - 1;
        }
        document.querySelector(".title-media").innerHTML = medias[index].title;

        if (medias[index].video) {
          displayVideo(medias[index]);
        } else {
          displayImage(medias[index]);
        }
      }
    });
  });
}
//timer pour attendre le chargement des médias
function myTimeout(){
  setTimeout(initLightbox, 1000);
} 
myTimeout();
//fermeture de la lightbox
function closeMedia() {
  //enleve la classe active et cache la lightbox
  console.log("close media click");
  const lightbox = document.querySelector("#lightbox");
  lightbox.classList.remove("active");
  lightbox.innerHTML = ""; //reset l'affichage
}
