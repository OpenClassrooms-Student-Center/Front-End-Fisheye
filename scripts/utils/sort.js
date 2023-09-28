// Array
const sortValues = ["Popularité", "Date", "Titre"];

// Get Element
const dropContainer = document.querySelector(".dropdown-container");
const mediaContainer = document.querySelector(".photographer-media");

// Create Element
const button = document.createElement("button");
button.classList.add("btn");
const arrow = document.createElement("i");
arrow.classList.add("arrow", "down");
const dropContent = document.createElement("div");
dropContent.classList.add("dropdown-content");

// Add to DOM
dropContainer.appendChild(button);
dropContainer.appendChild(dropContent);

//
button.innerHTML = "Choisir";
button.appendChild(arrow);

button.addEventListener("click", () => {
  dropContent.classList.toggle("show");

  if (arrow.className === "arrow down") {
    arrow.classList.remove("down");
    arrow.classList.add("up");
  } else {
    arrow.classList.remove("up");
    arrow.classList.add("down");
  }
});

sortValues.forEach((value) => {
  const dropValue = document.createElement("div");
  const separator = document.createElement("hr");

  dropValue.classList.add("dropdown-value");
  dropValue.innerHTML = value;
  dropContent.appendChild(dropValue);
  dropContent.insertBefore(separator, dropValue);

  dropValue.addEventListener("click", (event) => {
    const target = event.target.innerHTML;

    // Sélectionnez tous les éléments de média à trier
    const medias = Array.from(mediaContainer.querySelectorAll(".media"));

    switch (target) {
      case "Popularité":
        dropContent.classList.toggle("show");
        button.innerHTML = target;
        button.appendChild(arrow);
        arrow.classList.remove("up");
        arrow.classList.add("down");
        // Triez par popularité (en utilisant le nombre de likes)
        medias.sort(function (a, b) {
          const likesA = parseInt(a.querySelector(".like").textContent);
          const likesB = parseInt(b.querySelector(".like").textContent);
          return likesB - likesA;
        });
        break;
      case "Date":
        dropContent.classList.toggle("show");
        button.innerHTML = target;
        button.appendChild(arrow);
        arrow.classList.remove("up");
        arrow.classList.add("down");
        // Triez les médias par date en utilisant l'attribut 'data-date'
        medias.sort(function (a, b) {
          const dateA = new Date(a.getAttribute("data-date"));
          const dateB = new Date(b.getAttribute("data-date"));
          return dateA - dateB;
        });
        break;
      case "Titre":
        dropContent.classList.toggle("show");
        button.innerHTML = target;
        button.appendChild(arrow);
        arrow.classList.remove("up");
        arrow.classList.add("down");
        // Triez par nom en utilisant le texte du titre (h3)
        medias.sort(function (a, b) {
          const nomA = a.querySelector("h3").textContent;
          const nomB = b.querySelector("h3").textContent;
          return nomA.localeCompare(nomB);
        });
        break;
    }

    // Videz le conteneur des médias actuel
    mediaContainer.removeChild(mediaContainer.firstChild);

    // Ajoutez les médias triés au conteneur
    medias.forEach(function (media) {
      mediaContainer.appendChild(media);
    });
  });
});
