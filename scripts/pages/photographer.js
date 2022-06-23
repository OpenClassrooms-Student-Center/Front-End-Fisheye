async function getPhotographers() {
  const url = "/data/photographers.json";
  const response = await fetch(url);
  const data = await response.json();
  return { photographers: data.photographers, medias: data.media };
}

async function getSelectedPhotographer(id) {
  const { photographers, medias } = await getPhotographers();
  const selectedPhotographer = photographers.find(
    (photographer) => photographer.id === id
  );
  const photographerMedias = medias.filter(
    (media) => media.photographerId === id
  );

  const likesArray = photographerMedias.map((media) => media.likes);
  const sumOfLikes = likesArray.reduce((a, b) => a + b, 0);

  return [selectedPhotographer, photographerMedias, sumOfLikes];
}

// display Photographer Header
function displayPhotographer(photographer, likes) {
  const photographerModel = photographerFactory(photographer);
  const photographerHeader = document.querySelector(".photograph-header");
  const main = document.getElementById("main");
  const contactButton = document.getElementById("contact");
  const headerDiv = document.createElement("div");
  const portrait = document.createElement("img");
  const insert = document.createElement("div");

  headerDiv.innerHTML = `<h1>${photographerModel.name}</h1>
    <h2>${photographerModel.city}, ${photographerModel.country}</h2>
    <p>${photographerModel.tagline}</p>`;
  photographerHeader.appendChild(headerDiv);
  photographerHeader.insertBefore(headerDiv, contactButton);

  portrait.setAttribute(
    "src",
    `assets/photographers/${photographerModel.portrait}`
  );
  portrait.classList.add("portrait");

  insert.innerHTML = `<p id="total-likes">${likes} 🖤</p>
                      <p>${photographerModel.price}€ / jour</p>`;
  insert.classList.add("photograph-insert");

  photographerHeader.appendChild(portrait);
  main.appendChild(insert);
}

//display Photographer Medias
function displayMedia(medias) {
  const mediaSection = document.querySelector(".photograph-media");
  medias.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    mediaSection.appendChild(mediaCardDOM);
  });
}

function addLike() {
  let totalOfLikes = parseInt(document.getElementById("total-likes").innerText);

  const heartsArray = Array.from(document.querySelectorAll(".image-likes"));
  heartsArray.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();

      totalOfLikes += 1;
      document.getElementById("total-likes").innerText = `${totalOfLikes} 🖤`;
    });
  });
}

async function selectedInit() {
  const params = new URL(document.location).searchParams;
  const photographerId = parseInt(params.get("id"));
  const [selectedPhotographer, photographerMedias, sumOfLikes] =
    await getSelectedPhotographer(photographerId);
  displayPhotographer(selectedPhotographer, sumOfLikes);
  displayMedia(photographerMedias);
  addLike();
}

selectedInit();
