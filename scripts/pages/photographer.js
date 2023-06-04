// fetching information from json file and transforming json objects into JSobjects using json()
async function photographerPage() {
  const photographerResponse = await fetch("./data/photographers.json");
  const photographerResults = await photographerResponse.json();
  console.log(photographerResults);
  return photographerResults;
}

// displaying the information in photographer page
async function displayPhotographer(photographers) {
  // creating elements in the main section for each photographer
  const photographerHeaderZone = document.querySelector(".photograph-header");
  // getting the search params
  let params = new URL(document.location).searchParams;
  // getting the id from the search params
  let id = params.get("id");
  console.log(id);
  console.log(photographers);
  // getting the corosponding object (photographer) related to the id from the search params
  let photographer = photographers.find(myId => myId.id == id);
  console.log(id);
  console.log(photographer);

  // displaying the photographer information
  const photographerSection = photographerFactory(photographer);
  const infoPhotographer = photographerSection.getUserCardDOM();
  photographerHeaderZone.appendChild(infoPhotographer);

  // creating a contact me  button
  const btnNewPosition = document.querySelector(".mainArticle");
  const btn = document.createElement("button");
  btn.setAttribute("tabindex", "0 ");
  btn.setAttribute("role", "button");
  btn.setAttribute("class", "contact_button");
  btn.textContent = "Contactez-moi";
  btnNewPosition.appendChild(btn);
  // display modal onclick
  btn.addEventListener("click", displayModal);
  // close modal onclick
  const closingModal = document.getElementById("closeX");
  closingModal.addEventListener("click", closeModal);

  // adjusting the elements as required in the maquette
  const flexOrdering = document.querySelector(".frame");
  flexOrdering.style.order = 1;
  flexOrdering.setAttribute("tabIndex", "0");
}

async function initPhotographerPage() {
  // get the photographer data in the photographer page
  const { photographers } = await photographerPage();
  displayPhotographer(photographers);
}
// calling the function to create the elements in photographer page
initPhotographerPage();

async function displayMedia(photographerMedia) {
  const mediaDiv = document.querySelector(".media-div");

  mediaDiv.innerHTML = "";
  photographerMedia.forEach(media => {
    const mediaSection = mediaFactory(media);
    const mediaArts = mediaSection.getUserArtDOM(media);
    mediaDiv.appendChild(mediaArts);
  });
}

async function photographersMedia() {
  const { media } = await photographerPage();
  // creating the artwork for each photographer
  let params = new URL(document.location).searchParams;
  // getting the id from the search params
  let id = params.get("id");
  console.log(id);
  // getting the corosponding object (photographer) related to the id from the search params
  let photographerMedia = media.filter(m => m.photographerId == id);
  // maping and adding the sum of likes for each photographer
  const photographerLikes = photographerMedia.map(k => k.likes);
  let likesCounter = 0;
  for (i = 0; i < photographerLikes.length; i++) {
    totalCount += photographerLikes[i] + addingALike;
  }

  // creating a general span for the photographer
  const likesCounterSpan = document.getElementById("generalCounter");
  const totalLikes = document.createElement("p");
  totalLikes.setAttribute("id", "totalLikes");
  totalLikes.innerHTML = totalCount;
  const likeCounterSpanIcon = document.createElement("i");
  likeCounterSpanIcon.classList.add("fa-heart", "fas");
  likeCounterSpanIcon.style.color = "black";
  const likesDiv = document.createElement("div");
  likesDiv.classList.add("likesDiv");
  const dayPrice = document.getElementById("price");
  // append children to the span
  likesDiv.appendChild(totalLikes);
  likesDiv.appendChild(likeCounterSpanIcon);
  likesCounterSpan.appendChild(likesDiv);
  likesCounterSpan.appendChild(dayPrice);

  displayMedia(photographerMedia);
  // addEventListener of selector
  let selector = document.getElementById("selecting-div");
  selector.addEventListener("change", function() {
    if (selector.value == "0") {
      photographerMedia.sort(
        (a, b) => parseFloat(b.likes) - parseFloat(a.likes)
      );
    } else if (selector.value == "1") {
      photographerMedia.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (selector.value == "2") {
      photographerMedia.sort((a, b) => a.title < b.title);
      // photographerMedia.sort();
    }

    displayMedia(photographerMedia);
  });
}
photographersMedia();
