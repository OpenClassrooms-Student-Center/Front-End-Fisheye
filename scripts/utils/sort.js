const options = document.querySelectorAll("option");
const select = document.getElementById("sort");
const mediaContainer = document.querySelector(".photographer-media");

select.setAttribute("aria-label", "Trier les photos");

select.addEventListener("change", () => {
  var selected = select.value;

  // Cacher l'option par défaut après avoir choisi une option
  options[0].style.display = "none";

  // Sélectionnez tous les éléments de média à trier
  const medias = Array.from(mediaContainer.querySelectorAll(".media"));

  switch (selected) {
    case "popularity":
      // Triez par popularité (par exemple, en utilisant le nombre de likes)
      medias.sort(function (a, b) {
        const likesA = parseInt(a.querySelector(".like").textContent);
        const likesB = parseInt(b.querySelector(".like").textContent);
        return likesB - likesA;
      });
      break;
    case "date":
      // Triez les médias par date en utilisant l'attribut 'data-date'
      medias.sort(function (a, b) {
        const dateA = new Date(a.getAttribute("data-date"));
        const dateB = new Date(b.getAttribute("data-date"));
        return dateA - dateB;
      });
      break;
    case "title":
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
